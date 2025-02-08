const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL (Book Service)");
});

app.get('/', (req, res) => {
  res.json({status : true, message: 'ngetest ajah'});
});

// CRUD Buku
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, title, author });
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Book Service running on port ${PORT}`));
