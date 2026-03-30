# AzureCraft Blog

AzureCraft is a static HTML/CSS project for publishing Azure-focused blog content.
It currently includes a homepage and two article pages focused on Azure Landing Zones and AI workloads.

## What Is Included

- `index.html`: Home page with links to blog posts.
- `ai-workloads-alz.html`: Post about AI workloads in Azure Landing Zones.
- `azure-landing-zones.html`: Post about enterprise Azure Landing Zone foundations.
- `styles.css`: Shared site styling.

## Run Locally

Because this is a static site, you can open `index.html` directly in a browser.

If you prefer running a local server, from this folder run:

```powershell
python -m http.server 8080
```

Then browse to `http://localhost:8080`.

## Project Notes

- No build step is required.
- No external dependencies are required.
- Styling and content are intentionally lightweight for easy editing.

## Next Improvements

- Complete and expand article content.
- Add navigation links between article pages and the home page.
- Add metadata and social preview tags for sharing.