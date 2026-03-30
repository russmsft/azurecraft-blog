const params = new URLSearchParams(window.location.search);
const post = params.get("post");

if (post) {
  fetch(`posts/${post}.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById("post-content").innerHTML = html;
    });
}