import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getall } from './src/manager.js';
import puppeteer from 'puppeteer';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the src/www directory
app.use(express.static(path.join(__dirname, 'src/www')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/www/index.html'));
});

app.get('/api/sell', (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});

app.get('/api/add', (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});

app.get('/api/getall', (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});

app.get('/api/getgameinfo', (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});
app.get('/api/getigdbidfromurl', async (req, res) => {
  const query = req.query;
  if (!query.url.startsWith('https://igdb.com')) {
    console.log('whatdaflip');
    res.send({ error: 'what the hell is that link bruh 😭' });
    return;
  }
  var gameid = query.url.split('/')[4];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto('https://igdb.com/game/' + gameid);

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  const textSelector = await page.locator('text/IGDB ID: ').waitHandle();
  const fullTitle = await textSelector?.evaluate(el => el.textContent);
  res.send({ id: fullTitle });
});
app.listen(port, '192.168.100.112', () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});