const postCatalog = {
  "post-1-welcome": {
    title: "Welcome to AzureCraft",
    description: "Why AzureCraft exists and how to use it as a practical Azure architecture field-notes library."
  },
  "post-2-landing-zone": {
    title: "Azure Landing Zones: A Practical Architect's View",
    description: "A pragmatic view of management groups, platform subscriptions, workload separation, and governance."
  },
  "post-3-ai-landing-zone": {
    title: "AI Workloads Inside an Azure Landing Zone",
    description: "How private access, identity, monitoring, safety, and shared services shape production AI workloads."
  },
  "post-4-evaluation-sets": {
    title: "Evaluation Sets: The Missing Layer in GenAI Pilots",
    description: "Turn demo confidence into release confidence with practical eval sets and quality gates."
  },
  "post-5-apim-ai-gateway": {
    title: "APIM as an AI Gateway",
    description: "When Azure API Management helps with AI traffic control, observability, quotas, and routing."
  }
};

const params = new URLSearchParams(window.location.search);
const post = params.get("post");
const postContent = document.getElementById("post-content");

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
        <a class="button primary" href="index.html#articles">View articles</a>
        <a class="button" href="patterns/">View patterns</a>
      </div>
    </article>
  `;
}

async function loadPost() {
  if (!postContent) {
    return;
  }

  if (!post) {
    renderMissingPost("Choose an article to read");
    return;
  }

  if (!Object.hasOwn(postCatalog, post)) {
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

    const metadata = postCatalog[post];
    document.title = `${metadata.title} | AzureCraft`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", metadata.description);
    }
  } catch (error) {
    renderMissingPost("This article could not be loaded");
  }
}

loadPost();
