const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
app.use(express.json());

const uri = "mongodb+srv://lukaswigdel:sNpSD-1LtTRGIpA8AA@cluster0.nlglp5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
        session: session,
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
      const sessionCollection = db.collection("session");

      const insertEntry = {
        date: new Date(date),
        entries: fullEntryArr.map(entry => ({
          exerciseID: entry.exercise,
          sets: entry.sets,
          weight: entry.weight,
          reps: entry.reps,
        }))
      };

      const result = await sessionCollection.insertOne(insertEntry);

      res.status(200).json({ message: "Session and workout entries INSERTED", sessionID: result.insertedId });
    } catch (err) {
      console.error("Failed to insert into MongoDB", err);
      res.status(500).json({ error: "Insert failed" });
    }
  });

  app.listen(8080, () => {
    console.log("Hacking successfull");
  });
}