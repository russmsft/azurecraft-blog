# AzureCraft Blog

AzureCraft is a lightweight Azure architecture publishing site. It is built with static HTML, CSS, and JavaScript, with a small dependency-free Node.js wrapper for Azure App Service hosting.

The site is focused on practical, diagram-first Azure architecture content: landing zones, AI workloads, GenAIOps, governance, FinOps, and reusable patterns for Cloud Solution Architects.

## What Is Included

- `index.html`: Main AzureCraft homepage and content hub.
- `post.html`: Article shell that loads posts from `posts/`.
- `posts/`: Static article snippets.
- `patterns/`: Architecture pattern library.
- `genaiops-csa-starter/`: Public GenAIOps starter guide and downloadable assets.
- `assets/diagrams/`: SVG architecture diagrams.
- `css/styles.css`: Shared site styling for the main site.
- `js/main.js`: Post loader and article metadata handling.
- `server.js`: Dependency-free Node.js static server for Azure App Service.
- `scripts/check-site.js`: Local internal link and asset checker.

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

## Content Model

The current article model is intentionally simple:

1. Add an HTML snippet under `posts/`.
2. Add its title and description to `js/main.js`.
3. Link to it with `post.html?post=your-post-slug`.
4. Add any diagrams under `assets/diagrams/`.

This keeps the site easy to edit while it is still small. If the article library grows, the next useful step would be moving post metadata into a JSON file or adopting a small static-site generator.

## Suggested Next Improvements

- Add Open Graph images for LinkedIn sharing.
- Expand the pattern library with private endpoint, hub-spoke, Virtual WAN, and monitoring patterns.
- Add article transcripts or downloadable checklists for each pattern.
- Add automated link checking to the GitHub Actions workflow.
- Add a proper content index once the article count grows beyond a handful of posts.
