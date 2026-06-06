const defaultShareImage = "https://www.rbcloud.co.uk/assets/social/azurecraft-og.png";

const postCatalog = {
  "post-1-welcome": {
    title: "Welcome to AzureCraft",
    description: "Why AzureCraft exists and how to use it as a practical Azure architecture field-notes library.",
    image: defaultShareImage
  },
  "post-2-landing-zone": {
    title: "Azure Landing Zones: A Practical Architect's View",
    description: "A pragmatic view of management groups, platform subscriptions, workload separation, and governance.",
    image: defaultShareImage
  },
  "post-3-ai-landing-zone": {
    title: "AI Workloads Inside an Azure Landing Zone",
    description: "How private access, identity, monitoring, safety, and shared services shape production AI workloads.",
    image: "https://www.rbcloud.co.uk/assets/social/genaiops-og.png"
  },
  "post-4-evaluation-sets": {
    title: "Evaluation Sets: The Missing Layer in GenAI Pilots",
    description: "Turn demo confidence into release confidence with practical eval sets and quality gates.",
    image: "https://www.rbcloud.co.uk/assets/social/genaiops-og.png"
  },
  "post-5-apim-ai-gateway": {
    title: "APIM as an AI Gateway",
    description: "When Azure API Management helps with AI traffic control, observability, quotas, and routing.",
    image: "https://www.rbcloud.co.uk/assets/social/genaiops-og.png"
  },
  "post-6-hub-spoke-vwan": {
    title: "Hub-Spoke vs Virtual WAN: A Practical Decision",
    description: "Choose between custom hub-spoke control and managed Virtual WAN scale based on operating model, routing, and growth.",
    image: defaultShareImage
  },
  "post-7-private-endpoints-dns": {
    title: "Private Endpoints and DNS Without the Drama",
    description: "Make private access repeatable with clear DNS ownership, forwarding paths, endpoint approval, and troubleshooting.",
    image: defaultShareImage
  },
  "post-8-answer-health-monitoring": {
    title: "Answer Health Monitoring for GenAI Workloads",
    description: "Production GenAI needs monitoring for answer quality, groundedness, feedback, risk signals, and system health.",
    image: "https://www.rbcloud.co.uk/assets/social/genaiops-og.png"
  },
  "post-9-minimum-viable-governance": {
    title: "Minimum Viable Governance for Azure",
    description: "Start with the smallest useful Azure governance baseline for ownership, policy, tagging, budgets, logging, and review.",
    image: defaultShareImage
  }
};

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

function applyArticleMetadata(metadata) {
  const fullTitle = `${metadata.title} | AzureCraft`;

  document.title = fullTitle;
  setMeta('meta[name="description"]', "content", metadata.description);
  setMeta('meta[property="og:title"]', "content", metadata.title);
  setMeta('meta[property="og:description"]', "content", metadata.description);
  setMeta('meta[property="og:image"]', "content", metadata.image);
  setMeta('meta[name="twitter:title"]', "content", metadata.title);
  setMeta('meta[name="twitter:description"]', "content", metadata.description);
  setMeta('meta[name="twitter:image"]', "content", metadata.image);
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
    applyArticleMetadata(postCatalog[post]);
  } catch (error) {
    renderMissingPost("This article could not be loaded");
  }
}

loadPost();
