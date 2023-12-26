const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res,url) => {
  const browser = await puppeteer.launch({ headless: true },{
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto(url);
   
    title = await page.evaluate(() => {
      result =  document.querySelector("#firstHeading").textContent.trim();
      return `<strong>${result}</strong>`;
    });

  // Print the full title
  console.log('The title of this blog post is: "%s".', title);
    // Print the full title
    const logStatement = `The title of this blog post is: ${title}`;
    console.log(logStatement);
    res.send(logStatement);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };