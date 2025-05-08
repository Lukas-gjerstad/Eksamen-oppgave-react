const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eksamen-database",
    multipleStatements: true
})

app.get("/", (re, res)=> {
    fullQuery = `
    SELECT * FROM workoutentry; 
    SELECT * FROM session;
    SELECT * FROM exercise;
    `
    db.query(fullQuery, (err, results) => {
        if(err) return res.json(err)
        
        return res.json({
            "workoutEntries": results[0],
            "session": results[1],
            "exercise": results[2],
        })
    })
})

app.post("/insertEntry", (req, res) => {
    const { date, exerciseID, reps, weight, fullEntryArr } = req.body;

    db.beginTransaction(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Transaction start error" });
        }

        const insertSessionQuery = `
            INSERT INTO session (date)
            VALUES (?)
        `;

        db.query(insertSessionQuery, [date], (err, sessionResult) => {
            if (err) {
                return db.rollback(() => {
                    console.error(err);
                    res.status(500).json({ error: "Session insert error" });
                }); 
            }

            // insertId is a mysql value that contains the AI value of the primary key of a table
            const sessionID = sessionResult.insertId;

            // mapper over fullEntryArr som inneholder flere exercises med data koblet til den exercisen
            const values = fullEntryArr.map(entry => [sessionID, entry.exercise, entry.weight, entry.reps])

            // driten kresjer hvis jeg ikke skjekker om fullEntryArr har en value
            // den mapper over den før den har en value
            if (!Array.isArray(fullEntryArr) || fullEntryArr.length === 0) {
                return db.rollback(() => {
                    console.error("fullEntryArr is missing or empty");
                    res.status(400).json({ error: "No workout entries provided" });
                    alert("no workout entries provided")
                });
            }

            const insertEntryQuery = `
                INSERT INTO workoutentry (sessionID, exerciseID, reps, weight)
                VALUES ?
            `;

            db.query(insertEntryQuery, [values], (err, entryResult) => {
                if (err) {
                    return db.rollback(() => {
                        console.error(err);
                        res.status(500).json({ error: "Workout entry insert error" });
                    });
                }

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            console.error(err);
                            res.status(500).json({ error: "Commit error" });
                        });
                    }

                    res.json({ message: "Added session and workout entry" });
                });
            });
        });
    });
});


app.post("/addExercise", (req, res) => {
    const { name } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ error: "Exercise name is required" });
    }

    const checkQuery = "SELECT * FROM exercise WHERE LOWER(name) = LOWER(?)";
    db.query(checkQuery, [name], (checkErr, results) => {
        if (checkErr) {
            console.error("Error checking exercise", checkErr);
            return res.status(500).json({ error: "Error checking exercise" });
        }

        if (results.length > 0) {
            return res.status(409).json({ error: "Exercise already exists" });
        }

        const insertQuery = "INSERT INTO exercise (name) VALUES (?)";
        db.query(insertQuery, [name], (insertErr, result) => {
            if (insertErr) {
                console.error("Error inserting exercise", insertErr);
                return res.status(500).json({ error: "Error inserting exercise" });
            }

            res.status(200).json({ message: "Exercise added", id: result.insertId });
        });
    });
});

app.listen(8081, () => {
    console.log("Server running on port 8081")
})

