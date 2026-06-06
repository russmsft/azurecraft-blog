const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const ignoredPrefixes = [
  "http://",
  "https://",
  "mailto:",
  "tel:",
  "javascript:"
];
const siteOrigin = "https://www.rbcloud.co.uk";

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        return [];
      }
      return walk(fullPath);
    }
    return [fullPath];
  });
}

function toSitePath(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function resolveTarget(fromFile, rawTarget) {
  const trimmed = rawTarget.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    return null;
  }

  if (trimmed.startsWith(siteOrigin)) {
    const url = new URL(trimmed);
    return resolveTarget(fromFile, `${url.pathname}${url.search}${url.hash}`);
  }

  if (ignoredPrefixes.some((prefix) => trimmed.startsWith(prefix))) {
    return null;
  }

  const [withoutHash] = trimmed.split("#");
  const [withoutQuery, query = ""] = withoutHash.split("?");

  if (!withoutQuery) {
    return null;
  }

  if (withoutQuery.endsWith("post.html") && query.startsWith("post=")) {
    const slug = new URLSearchParams(query).get("post");
    return {
      display: `posts/${slug}.html`,
      path: path.join(root, "posts", `${slug}.html`)
    };
  }

  const decoded = decodeURIComponent(withoutQuery);
  const fromPostsDirectory = path.basename(path.dirname(fromFile)) === "posts";
  const baseDirectory = decoded.startsWith("/") || fromPostsDirectory
    ? root
    : path.dirname(fromFile);
  const normalized = decoded.startsWith("/") ? decoded.slice(1) : decoded;
  let targetPath = path.resolve(baseDirectory, normalized);

  if (decoded.endsWith("/")) {
    targetPath = path.join(targetPath, "index.html");
  }

  return {
    display: toSitePath(targetPath),
    path: targetPath
  };
}

const htmlFiles = walk(root).filter((file) => file.endsWith(".html"));
const failures = [];
const attributePattern = /\b(?:href|src)=["']([^"']+)["']/g;
const localUrlContentPattern = /\bcontent=["'](https:\/\/www\.rbcloud\.co\.uk\/[^"']+)["']/g;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  let match;

  while ((match = attributePattern.exec(html))) {
    const target = resolveTarget(file, match[1]);
    if (!target) {
      continue;
    }

    if (!target.path.startsWith(root) || !fs.existsSync(target.path)) {
      failures.push(`${toSitePath(file)} -> ${match[1]} (${target.display})`);
    }
  }

  while ((match = localUrlContentPattern.exec(html))) {
    const target = resolveTarget(file, match[1]);
    if (!target) {
      continue;
    }

    if (!target.path.startsWith(root) || !fs.existsSync(target.path)) {
      failures.push(`${toSitePath(file)} -> ${match[1]} (${target.display})`);
    }
  }
}

// Validate posts/catalog.json: every slug must have a matching post file
const catalogPath = path.join(root, "posts", "catalog.json");
if (fs.existsSync(catalogPath)) {
  let catalog;
  try {
    catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  } catch (parseError) {
    failures.push(`posts/catalog.json: invalid JSON - ${parseError.message}`);
    catalog = [];
  }

  for (const entry of catalog) {
    if (!entry.slug) {
      failures.push(`posts/catalog.json: entry missing slug field`);
      continue;
    }
    const postPath = path.join(root, "posts", `${entry.slug}.html`);
    if (!fs.existsSync(postPath)) {
      failures.push(`posts/catalog.json: slug "${entry.slug}" has no matching posts/${entry.slug}.html`);
    }
  }
} else {
  failures.push("posts/catalog.json: file not found");
}

if (failures.length > 0) {
  console.error("Broken internal links, missing assets, or catalog errors:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files and posts/catalog.json. No broken internal links, missing assets, or catalog errors found.`);
