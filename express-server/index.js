const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express(); 

const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./database/data.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create Grades Table
db.run(`CREATE TABLE IF NOT EXISTS grades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  studentName TEXT,
  subject TEXT,
  grade TEXT
)`);

// Add a new grade
app.post('/api/grades', (req, res) => {
  const { studentName, subject, grade } = req.body;
  db.run(`INSERT INTO grades (studentName, subject, grade) VALUES (?, ?, ?)`, [studentName, subject, grade], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Get all grades
app.get('/api/grades', (req, res) => {
  db.all(`SELECT * FROM grades`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a single grade by ID
app.get('/api/grades/:id', (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM grades WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row);
  });
});

// Update a grade by ID
app.put('/api/grades/:id', (req, res) => {
  const { id } = req.params;
  const { studentName, subject, grade } = req.body;
  db.run(`UPDATE grades SET studentName = ?, subject = ?, grade = ? WHERE id = ?`, [studentName, subject, grade, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

// Delete a grade by ID
app.delete('/api/grades/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM grades WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});