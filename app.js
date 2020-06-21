const cors = require('cors');
const express = require('express');
const puppeteer = require('puppeteer');
const scrapper = require('./scrapper');

const app = express();

app.use(cors());

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  await page.goto(req.query.url, { waitUntil: 'domcontentloaded' });

  await page.setCacheEnabled(false);
  const data = await page.evaluate(scrapper);

  await browser.close();
  res.json({ data });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${server.address().port}`);
});
