const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database("plexus.db");

db.run(`
CREATE TABLE IF NOT EXISTS complaints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT,
  created_at TEXT
)
`);


app.post("/submit", (req, res) => {
  const { message } = req.body;

  const timestamp = new Date().toLocaleString(); // date + time

  db.run(
    "INSERT INTO complaints (message, created_at) VALUES (?, ?)",
    [message, timestamp]
  );

  res.json({ success: true });
});



app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "faculty" && password === "faculty123") {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.get("/complaints", (req, res) => {
  db.all("SELECT * FROM complaints", [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log("PLEXUS backend running on http://localhost:3000");
});
