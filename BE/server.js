const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
console.log(uuid.v4());

const app = express();

app.use(
  cors({
    // origin: "https://counter-blocks-fe-production.up.railway.app",
    origin: "http://localhost:5500",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

let counter = 0;
app.get("/counter", (req, res) => {
  counter++;
  res.json({ counter });
});

const blocks = {};

app.get("/blocks/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.sendStatus(400);
  }
  const block = blocks[id];
  if (!block) {
    return res.sendStatus(404);
  }
  res.status(200).json(block);
});

app.post("/blocks", (req, res) => {
  const id = uuid.v4();
  blocks[id] = req.body;
  res.status(200).send(id);
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("server is running");
});
