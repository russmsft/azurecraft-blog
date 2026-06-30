# AzureCraft Blog

AzureCraft is a lightweight static blog about practical, diagram-first Azure
architecture. It uses plain HTML and CSS with a small, dependency-free script —
no build step and no framework.

## Structure

```
index.html                 Home page: hero, article cards, categories, roadmap
about.html                 About page
categories/
  infrastructure.html      Infrastructure category index
  data-ai.html             Data & AI category index
  modern-apps.html         Modern Apps category index
posts/
  welcome.html             "Welcome to AzureCraft" (start here)
  azure-landing-zones.html "Azure Landing Zones: A Practical Architect's View"
  ai-workloads.html        "AI Workloads in Azure Landing Zones"
  hub-spoke-vs-virtual-wan.html  "Hub-and-Spoke vs Azure Virtual WAN"
  identity-foundations.html      "Identity Foundations for Platform Teams"
  bicep-vs-terraform.html        "Bicep vs Terraform for Landing Zones"
css/styles.css             Design system (dark-first, auto light mode)
js/site.js                 Mobile nav, reading progress, subscribe form, footer year
assets/
  favicon.svg              Site icon
  diagrams/                Architecture diagrams (SVG)
server.js                  Tiny Express static server (used by Azure App Service)
```

Each post is a standalone HTML page (good for SEO and shareable URLs) that shares
an inlined header and footer and links to the common stylesheet.

> Note: `post.html`, `js/main.js`, and the `posts/post-1-*` / `posts/post-2-*`
> files are the original client-side-injection prototype. They are kept for
> reference but are no longer linked from the site.

## Run locally

Because this is a static site, you can open `index.html` directly in a browser.

To run the bundled Express server:

```powershell
npm install
npm start
```

Then browse to `http://localhost:8080`.

Or, with no Node.js, use Python's static server:

```powershell
python -m http.server 8080
```

## Design notes

- Dark theme by default; light theme applied automatically via
  `prefers-color-scheme`.
- Typography is tuned for reading: ~72ch line length, 1.7 line-height, fluid
  type scale.
- Responsive: a collapsible nav appears on small screens.
- Accessibility: skip link, visible focus styles, semantic `<time>`, alt text.
- SEO/social: per-page `<title>`, meta description, Open Graph, and Twitter tags.

## Newsletter form

The subscribe form is provider-ready. To make it live, set the `data-endpoint`
attribute on the `.cta-form` in `index.html` to your email provider's POST URL
(Mailchimp, Buttondown, ConvertKit, an Azure Function, etc.):

```html
<form class="cta-form" data-endpoint="https://your-provider/subscribe">
```

With no endpoint set, the form validates the email and shows a friendly
"not live yet" message instead of failing silently. The handler lives in
`js/site.js`.

## Content roadmap

Planned posts across the three pillars (Infrastructure · Data & AI · Modern Apps):

- Zero-trust networking: Private Endpoints, Private DNS, firewall patterns
- FinOps guardrails with Azure Policy and budgets
- Observability baseline: Log Analytics, workbooks, and alerts that matter
- Data platform reference architecture

## Adding a new post

1. Copy an existing file in `posts/` (e.g. `azure-landing-zones.html`).
2. Update the `<title>`, meta description, Open Graph tags, and article content.
3. Add a matching card to the grid in `index.html`.
4. Drop any diagrams into `assets/diagrams/` and reference them from the post.
