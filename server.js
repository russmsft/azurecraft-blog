const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

// Serve everything in the repo root as static content
app.use(express.static(path.join(__dirname)));

// SPA-style fallback is NOT required for your site,
// but we do want /post.html?post=... to work, which it will.

// Default to index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`AzureCraft listening on port ${port}`);
});