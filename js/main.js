const params = new URLSearchParams(window.location.search);
const post = params.get("post");
const postContent = document.getElementById("post-content");

function setMeta(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

function renderMissingPost(message) {
  if (!postContent) {
    return;
  }

  postContent.innerHTML = `
    <article class="article not-found">
      <p class="meta">Article not found</p>
      <h1>${message}</h1>
      <p class="intro">The article link may have changed. Return to the article list or open the pattern library.</p>
      <div class="actions">
        <a class="button primary" href="articles/">View articles</a>
        <a class="button" href="patterns/">View patterns</a>
      </div>
    </article>
  `;
}

function applyArticleMetadata(entry) {
  const fullTitle = `${entry.title} | AzureCraft`;

  document.title = fullTitle;
  setMeta('meta[name="description"]', "content", entry.description);
  setMeta('meta[property="og:title"]', "content", entry.title);
  setMeta('meta[property="og:description"]', "content", entry.description);
  setMeta('meta[property="og:image"]', "content", entry.image);
  setMeta('meta[name="twitter:title"]', "content", entry.title);
  setMeta('meta[name="twitter:description"]', "content", entry.description);
  setMeta('meta[name="twitter:image"]', "content", entry.image);
}

async function loadPost() {
  if (!postContent) {
    return;
  }

  if (!post) {
    renderMissingPost("Choose an article to read");
    return;
  }

  let catalog;
  try {
    const catalogResponse = await fetch("posts/catalog.json");
    if (!catalogResponse.ok) {
      throw new Error("catalog unavailable");
    }
    catalog = await catalogResponse.json();
  } catch {
    renderMissingPost("Article catalog could not be loaded");
    return;
  }

  const entry = catalog.find((p) => p.slug === post);
  if (!entry) {
    renderMissingPost("That AzureCraft article does not exist");
    return;
  }

  try {
    const response = await fetch(`posts/${post}.html`);

    if (!response.ok) {
      throw new Error(`Unable to load ${post}`);
    }

    const html = await response.text();
    postContent.innerHTML = html;
    applyArticleMetadata(entry);
  } catch {
    renderMissingPost("This article could not be loaded");
  }
}

loadPost();
