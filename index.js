const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/scrape", (req, res) => {
  // Get the URL from the query parameters
  const url = req.query.url;

  // Check if the URL is provided
  if (!url) {
    return res.status(400).send("URL parameter is missing");
  }

  // Call the scrapeLogic function with the provided URL
  scrapeLogic(res, url);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
