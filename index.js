import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getall} from "./src/manager.js";

const app = express();
const port = 3000;
const manager = require("./src/manager");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the src/www directory
app.use(express.static(path.join(__dirname, 'src/www')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'src/www/index.html'));
});

app.get("/api/sell", (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});

app.get("/api/add", (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});

app.get("/api/getall", (req, res) => {
  const query = req.query;
  console.log(query);
  res.send(query);
});

app.listen(port, () => {
  console.log(`localhost:${port}`);
});