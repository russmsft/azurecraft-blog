# AzureCraft Blog

AzureCraft is a lightweight Azure architecture publishing site. It is built with static HTML, CSS, and JavaScript, with a small dependency-free Node.js wrapper for Azure App Service hosting.

The site is focused on practical, diagram-first Azure architecture content: landing zones, AI workloads, GenAIOps, governance, FinOps, and reusable patterns for Cloud Solution Architects.

## What Is Included

- `index.html`: Main AzureCraft homepage and content hub.
- `post.html`: Article shell that loads posts from `posts/`.
- `articles/`: Article index for browsing all posts.
- `posts/`: Static article snippets.
- `patterns/`: Architecture pattern library and downloadable pattern checklists.
- `genaiops-csa-starter/`: Public GenAIOps starter guide and downloadable assets.
- `assets/diagrams/`: SVG architecture diagrams.
- `assets/social/`: 1200x630 Open Graph PNG images for sharing.
- `css/styles.css`: Shared site styling for the main site.
- `js/main.js`: Post loader and article metadata handling.
- `server.js`: Dependency-free Node.js static server for Azure App Service.
- `scripts/check-site.js`: Local internal link and asset checker.
- `scripts/generate-og-images.ps1`: Regenerates the Open Graph PNG assets.

## Run Locally

Start the local server:

```powershell
npm start
```

Then browse to `http://localhost:8080`. No external runtime dependencies are required.

## Check the Site

Run the static link and asset checker:

```powershell
npm run check
```

The checker validates internal `href` and `src` references across the HTML pages and verifies that post slugs resolve to files in `posts/`.

## Generate Social Images

Regenerate the Open Graph images used for LinkedIn and social previews:

```powershell
npm run generate:og
```

## Content Model

The current article model is intentionally simple:

1. Add an HTML snippet under `posts/`.
2. Add its title and description to `js/main.js`.
3. Link to it with `post.html?post=your-post-slug`.
4. Add any diagrams under `assets/diagrams/`.

This keeps the site easy to edit while it is still small. If the article library grows, the next useful step would be moving post metadata into a JSON file or adopting a small static-site generator.

## Implemented Improvements

- Added Open Graph images for LinkedIn and social sharing.
- Expanded the pattern library with hub-spoke/Virtual WAN, private endpoints/DNS, answer health monitoring, and minimum viable governance patterns.
- Added downloadable Markdown checklists for each pattern.
- Added a full article index.
- Added automated static link and asset validation to the GitHub Actions deployment workflow.

## Suggested Next Improvements

- Move post metadata into a JSON file once the article library grows further.
- Add per-article social images for high-value posts.
- Add printable PDF versions of the pattern checklists.
- Add a lightweight search/filter experience for articles and patterns.
