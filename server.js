const fs = require("fs");
const http = require("http");
const path = require("path");

const rootPath = __dirname;
const port = process.env.PORT || 8080;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
  ".svg": "image/svg+xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8"
};

function getContentType(filePath) {
  return mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function isInsideRoot(filePath) {
  const relativePath = path.relative(rootPath, filePath);
  return relativePath && !relativePath.startsWith("..") && !path.isAbsolute(relativePath);
}

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl, "http://localhost");
  let pathname = decodeURIComponent(url.pathname);

  if (pathname === "/genaiops-csa-starter") {
    pathname = "/genaiops-csa-starter/";
  }

  if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }

  return path.join(rootPath, pathname);
}

function sendFile(response, filePath, statusCode = 200) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile() || !isInsideRoot(filePath)) {
      sendNotFound(response);
      return;
    }

    response.writeHead(statusCode, {
      "Content-Type": getContentType(filePath)
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

function sendNotFound(response) {
  const notFoundPath = path.join(rootPath, "404.html");
  response.writeHead(404, {
    "Content-Type": getContentType(notFoundPath)
  });
  fs.createReadStream(notFoundPath).pipe(response);
}

const server = http.createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Method not allowed");
    return;
  }

  const filePath = resolveRequestPath(request.url);
  sendFile(response, filePath);
});

server.listen(port, () => {
  console.log(`AzureCraft listening on port ${port}`);
});
