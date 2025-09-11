const { MongoClient } = require("mongodb");
const cors = require("cors")
const express = require("express");

const app = express();

require('dotenv').config({ path: './.env' });
app.use(express.json());
app.use(cors())

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

let db

async function startServer() {
  await client.connect()
  db = client.db("trening")
  
  app.get("/", async (re, res)=> {
    try {
      const workoutEntries = await db.collection("workoutentry").find({}).toArray()
      const exercise = await db.collection("exercise").find({}).toArray()

      return res.json({
        workoutEntries,
        exercise: exercise,
      })

    } catch (err) {
      return res.json({ error: err.message })
    }
  })

  // Main endpoint
  app.post("/insertEntry", async (req, res) => {
    console.log("Connecting to DB");

    const { date, fullEntryArr } = req.body;

    if (!Array.isArray(fullEntryArr) || fullEntryArr.length === 0) {
      return res.status(400).json({ error: "No workout entries provided" });
    }

    try {
      console.log("Connected to MongoDB");

      const db = client.db("trening");
      const sessionCollection = db.collection("workoutentry");

      const dateObj = new Date(date)
      const formatDate = `${dateObj.getDate()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getFullYear()).slice(-2)}`

      const insertEntry = {
        _id: formatDate,
        exercise: fullEntryArr
      }

      res.status(200).json({ message: "Session and workout entries INSERTED" });
    } catch (err) {
      console.error("Failed to insert into MongoDB", err);
      res.status(500).json({ error: "Insert failed" });
    }
  });

  app.listen(8080, () => {
    console.log("Hacking successfull");
  });
}
startServer().catch(console.error)