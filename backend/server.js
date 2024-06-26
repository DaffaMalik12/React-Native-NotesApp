const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Create a new task
app.post("/api/tasks", (req, res) => {
  const task = req.body;
  const sql = "INSERT INTO tasks SET ?";
  db.query(sql, task, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Read all tasks
app.get("/api/tasks", (req, res) => {
  const sql = "SELECT * FROM tasks";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Update a task
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const sql = `UPDATE tasks SET title = '${title}', description = '${description}' WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM tasks WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
