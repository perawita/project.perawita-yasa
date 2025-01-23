const mysql = require('mysql2/promise');
const dbConfig = require('./config/dbConfig');

const express = require('express');
const app = express();
const port = 3000;

// Buat koneksi pooling
const pool = mysql.createPool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10, // Jumlah koneksi maksimum dalam pool
  queueLimit: 0,       // Tidak ada batas antrian koneksi
});

// Endpoint untuk cek koneksi
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Endpoint untuk mendapatkan data
app.get('/api/v1/get/:tb_name/list-doa', async (req, res) => {
  const tb_name = req.params.tb_name;

  // Hindari SQL Injection dengan parameter binding
  const query = `SELECT * FROM ??`;
  try {
    const [results] = await pool.query(query, [tb_name]);
    res.json({
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

// Jalankan server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
