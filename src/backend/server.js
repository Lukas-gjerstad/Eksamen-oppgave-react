const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

const app = express()
app.use(cors())

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

// app.get('/users', (req, res) => {
    
// })

app.listen(8081, (
    console.log("Fucking")
))