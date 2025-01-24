const mysql = require('mysql2/promise');
const dbConfig = require('./config/dbConfig');

const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Midlawer dan Cros
app.use(
  bodyParser.json(), // Parsing json
  cors({
    origin: '*', // Izinkan semua domain (ganti dengan domain Flutter Anda untuk keamanan)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
  })
);

// Buat koneksi pooling
const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Endpoint untuk cek koneksi
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// CREATE - Tambah data ke tabel
app.post('/api/v1/:tb_name', async (req, res) => {
  const tb_name = req.params.tb_name;
  const data = req.body;

  try {
    const query = `INSERT INTO ?? SET ?`;
    const [result] = await pool.query(query, [tb_name, data]);

    res.status(201).json({
      success: true,
      message: 'Data inserted successfully',
      insertId: result.insertId,
    });
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
});

// READ - Ambil data dari tabel
app.get('/api/v1/:tb_name', async (req, res) => {
  const tb_name = req.params.tb_name;

  try {
    const query = `SELECT * FROM ??`;
    const [results] = await pool.query(query, [tb_name]);

    res.status(200).json({
      success: true,
      message: 'Data retrieved successfully',
      data: results,
    });
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
});

// UPDATE - Perbarui data di tabel
app.put('/api/v1/:tb_name/:id', async (req, res) => {
  const tb_name = req.params.tb_name;
  const id = req.params.id;
  const data = req.body;

  try {
    const query = `UPDATE ?? SET ? WHERE id = ?`;
    const [result] = await pool.query(query, [tb_name, data, id]);

    res.status(200).json({
      success: true,
      message: 'Data updated successfully',
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
});

// DELETE - Hapus data dari tabel
app.delete('/api/v1/:tb_name/:id', async (req, res) => {
  const tb_name = req.params.tb_name;
  const id = req.params.id;

  try {
    const query = `DELETE FROM ?? WHERE id = ?`;
    const [result] = await pool.query(query, [tb_name, id]);

    res.status(200).json({
      success: true,
      message: 'Data deleted successfully',
      affectedRows: result.affectedRows,
    });
  } catch (err) {
    console.error('Error executing query:', err.message);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
