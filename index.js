const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
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
  console.log(`Example app listening on port ${port}`);
});
