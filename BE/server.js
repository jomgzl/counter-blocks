const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://counter-blocks-fe-production.up.railway.app",
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

const blocks = [
  {
    id: 1,
    color: "#000000",
    width: 50,
    height: 50,
    left: 298,
    top: 464,
  },
  {
    id: 2,
    color: "#000000",
    width: 50,
    height: 50,
    left: 171,
    top: 365,
  },
  {
    id: 3,
    color: "#000000",
    width: 50,
    height: 50,
    left: 637,
    top: 136,
  },
  {
    id: 4,
    color: "#000000",
    width: 50,
    height: 50,
    left: 498,
    top: 253,
  },
  {
    id: 5,
    color: "red",
    width: 50,
    height: 50,
    left: 47,
    top: 464,
  },
  {
    id: 6,
    color: "#000000",
    width: 50,
    height: 50,
    left: 361,
    top: 132,
  },
];

app.get("/blocks", (req, res) => {
  res.status(200).json(blocks);
});

app.post("/blocks", (req, res) => {
  blocks.push(req.body);
  res.sendStatus(200);
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("server is running");
});
