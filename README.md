# AzureCraft Blog

AzureCraft is a lightweight Azure architecture publishing site, built with static
HTML, CSS, and JavaScript plus a small dependency-free Node.js server for Azure
App Service hosting. The content is practical and diagram-first: landing zones,
AI workloads, GenAIOps, governance, FinOps, and reusable patterns.

The site has two complementary layers:

- A **redesigned landing experience** (homepage, category indexes, and a set of
  standalone long-form Infrastructure guides) styled with `css/azurecraft.css`.
- A **catalog-driven content library** (article index, pattern library, GenAIOps
  starter, and 23+ posts) styled with `css/styles.css`.

## Structure

```
index.html                 Redesigned homepage: hero, featured guides, categories,
                           "full library" links, roadmap (uses css/azurecraft.css)
about.html                 About page
categories/                Category indexes (Infrastructure / Data & AI / Modern Apps)
posts/
  catalog.json             Article metadata for the catalog system
  welcome.html, azure-landing-zones.html, ai-workloads.html,
  hub-spoke-vs-virtual-wan.html, identity-foundations.html,
  bicep-vs-terraform.html  Standalone redesigned guides (css/azurecraft.css)
  post-1..post-23 *.html   Catalog posts loaded via post.html (css/styles.css)
articles/                  Searchable, filterable article index
patterns/                  Architecture pattern library + downloadable checklists
genaiops-csa-starter/      Public GenAIOps starter guide
post.html                  Article shell that loads catalog posts from posts/
css/
  azurecraft.css           Redesigned design system (dark-first, auto light mode)
  styles.css               Catalog/library styling (incl. print styles)
js/
  site.js                  Redesign behaviour: mobile nav, reading progress, subscribe form
  main.js                  Catalog post loader (reads catalog.json)
  interactions.js          Library interactions (reveal, stats, filters)
assets/
  favicon.svg              Site icon
  diagrams/                SVG architecture diagrams
  social/                  1200x630 Open Graph images
server.js                  Dependency-free Node.js static server (Azure App Service)
scripts/
  check-site.js            Internal link, asset, and catalog validator
  generate-og-images.ps1   Generates shared + per-article Open Graph images
```

> Why two stylesheets? The redesigned landing pages and the catalog library use
> different class systems. Keeping them in separate stylesheets lets both render
> correctly without collisions. Redesigned pages link `css/azurecraft.css`;
> catalog/library pages link `css/styles.css`.

## Run locally

```powershell
npm start
```

Then browse to `http://localhost:8080`. No external runtime dependencies are
required. (Or use `python -m http.server 8080` for a quick static server.)

## Check the site

```powershell
npm run check
```

Validates internal `href`/`src` references across all HTML pages, verifies post
slugs resolve to files in `posts/`, and checks that every `posts/catalog.json`
entry has a matching post file.

## Generate social images

```powershell
npm run generate:og
```

Generates the shared site images plus a per-article Open Graph image for every
post. Commit new files under `assets/social/` afterwards.

## Design notes (redesigned landing layer)

- Dark theme by default; light theme applied automatically via
  `prefers-color-scheme` (css/azurecraft.css).
- Typography tuned for reading: ~72ch line length, 1.7 line-height, fluid scale.
- Responsive collapsible nav; skip link, focus styles, semantic markup.
- Per-page `<title>`, meta description, Open Graph, and Twitter tags.

## Newsletter form

The subscribe form on the homepage is provider-ready. Set the `data-endpoint`
attribute on the `.cta-form` to your email provider's POST URL (Mailchimp,
Buttondown, ConvertKit, an Azure Function, etc.):

```html
<form class="cta-form" data-endpoint="https://your-provider/subscribe">
```

With no endpoint set, it validates the email and shows a friendly "not live yet"
message instead of failing silently. Handler lives in `js/site.js`.

## Content roadmap

Planned posts across the three pillars (Infrastructure · Data & AI · Modern Apps):

- Zero-trust networking: Private Endpoints, Private DNS, firewall patterns
- FinOps guardrails with Azure Policy and budgets
- Observability baseline: Log Analytics, workbooks, and alerts that matter
- Data platform reference architecture

## Adding content

**A redesigned standalone guide:** copy a file in `posts/` (e.g.
`azure-landing-zones.html`), update title/meta/content, point it at
`../css/azurecraft.css`, and add a card to `index.html`.

**A catalog post:** add an HTML snippet under `posts/`, add an entry to
`posts/catalog.json` (`slug`, `title`, `description`, `category`, `image`), link
via `post.html?post=<slug>`, add a card to `articles/index.html`, then run
`npm run check`.
