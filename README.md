# AzureCraft Blog

AzureCraft is a lightweight Azure architecture publishing site. It is built with static HTML, CSS, and JavaScript, with a small dependency-free Node.js wrapper for Azure App Service hosting.

The site is focused on practical, diagram-first Azure architecture content: landing zones, AI workloads, GenAIOps, governance, FinOps, and reusable patterns for Cloud Solution Architects.

## What Is Included

- `index.html`: Main AzureCraft homepage and content hub.
- `post.html`: Article shell that loads posts from `posts/`.
- `posts/catalog.json`: Article metadata (titles, descriptions, categories, OG image paths).
- `articles/`: Article index with text search and category filter.
- `posts/`: Static article snippets.
- `patterns/`: Architecture pattern library and downloadable pattern checklists.
- `genaiops-csa-starter/`: Public GenAIOps starter guide and downloadable assets.
- `assets/diagrams/`: SVG architecture diagrams.
- `assets/social/`: 1200x630 Open Graph PNG images for sharing.
- `css/styles.css`: Shared site styling including print styles.
- `js/main.js`: Post loader - fetches catalog.json then loads the requested post.
- `server.js`: Dependency-free Node.js static server for Azure App Service.
- `scripts/check-site.js`: Local internal link, asset, and catalog validator.
- `scripts/generate-og-images.ps1`: Generates shared and per-article Open Graph PNG assets.

## Run Locally

Start the local server:

```powershell
npm start
```

Then browse to `http://localhost:8080`. No external runtime dependencies are required.

## Check the Site

Run the static link, asset, and catalog checker:

```powershell
npm run check
```

The checker validates internal `href` and `src` references across all HTML pages, verifies that post slugs resolve to files in `posts/`, and validates that every entry in `posts/catalog.json` has a matching post file.

## Generate Social Images

Regenerate the Open Graph images used for LinkedIn and social previews:

```powershell
npm run generate:og
```

This generates the shared site images plus a per-article image for every post. After running, commit the new files in `assets/social/`. To use per-article images, update the `image` field for each entry in `posts/catalog.json` to point to `https://www.rbcloud.co.uk/assets/social/<slug>-og.png`.

## Print Articles

Any article page can be printed or saved as a PDF using the browser print dialog (Ctrl+P / Cmd+P). The print stylesheet removes navigation, hides non-content elements, and formats tables and callout blocks for clean output.

## Content Model

The current article model:

1. Add an HTML snippet under `posts/`.
2. Add an entry to `posts/catalog.json` with `slug`, `title`, `description`, `category`, and `image`.
3. Link to it with `post.html?post=your-post-slug`.
4. Add the post card to `articles/index.html`.
5. Add any diagrams under `assets/diagrams/`.
6. Run `npm run check` to validate links and catalog integrity.

## Implemented Improvements

- Added Open Graph images for LinkedIn and social sharing.
- Expanded the pattern library with hub-spoke/Virtual WAN, private endpoints/DNS, answer health monitoring, and minimum viable governance patterns.
- Added downloadable Markdown checklists for each pattern.
- Added a full article index.
- Added automated static link and asset validation to the GitHub Actions deployment workflow.
- Moved post metadata into `posts/catalog.json` (separate from application code).
- Added per-article Open Graph image generation to `generate-og-images.ps1`.
- Added print stylesheet for clean browser print and PDF export of articles.
- Added text search and category filter to the article index.
- Added catalog integrity validation to `scripts/check-site.js`.
