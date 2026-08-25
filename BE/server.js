const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
require("dotenv").config();

console.log(uuid.v4());

const app = express();

app.use(
  cors({
    // origin: "https://counter-blocks-fe-production.up.railway.app",
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new mongodb.MongoClient(process.env.MONGO_URL, {
  serverApi: {
    version: mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function runStableAPIConnect() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const result = await client.db("blocks").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    return result;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

let counter = 0;
app.get("/counter", (req, res) => {
  counter++;
  res.json({ counter });
});

const blocks = {};

app.get("/blocks/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.sendStatus(400);
    }

    const idMongoDb = new mongoose.Types.ObjectId(id);

    await client.connect();
    const block = await client
      .db("blocks")
      .collection("pictures")
      .findOne({ _id: idMongoDb });
    console.log("ID in get: ", id);
    client.close();

    if (!block) {
      return res.sendStatus(404);
    }

    console.log("In GET: ", block);

    res.status(200).json(block);
  } catch (e) {
    // Send notification to Whatsapp
    res.sendStatus(500);
  }
});

app.post("/blocks", async (req, res) => {
  // const id = uuid.v4();
  const { name, blocks: newBlocks } = req.body;
  if (!name || newBlocks.length === 0) {
    return res.sendStatus(422);
  }
  // blocks[id] = { name, blocks: newBlocks };

  // client.connect((err) => {
  //   const collection = client
  //     .db("blocks")
  //     .collection("<collectionName>");
  //   // perform actions on the collection object
  //
  // });

  // if() {
    
  // }
  await client.connect();

  const result = await client.db("blocks").collection("pictures").insertOne({
    name,
    blocks: newBlocks,
  });
  client.close();

  const id = result.insertedId.toString();
  res.status(200).send(id);
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  console.log("server is running");
  runStableAPIConnect().catch(console.dir);
});
