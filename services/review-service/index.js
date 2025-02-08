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
  console.log("Connected to MySQL (Review Service)");
});

app.get('/', (req, res) => {
  res.json({status : true, message: 'ngetest ajah'});
});

// CRUD Review
app.get('/reviews', (req, res) => {
  db.query('SELECT * FROM reviews', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.post('/reviews', (req, res) => {
  const { bookId, review } = req.body;
  db.query('INSERT INTO reviews (bookId, review) VALUES (?, ?)', [bookId, review], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, bookId, review });
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Review Service running on port ${PORT}`));
