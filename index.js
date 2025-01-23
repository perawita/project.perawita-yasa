const mysql = require('mysql2');
const dbConfig = require('./config/dbConfig');

const express = require('express')
const app = express()
const port = 3000

// Buat koneksi
const connection = mysql.createConnection({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

// Cek koneksi
connection.connect((err) => {
  if (err) {
      console.error('Error connecting to database:', err.message);
      return;
  }
  console.log('Connected to the database:', dbConfig.database);
});
  

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/get/:tb_name/list-doa', (req, res) =>{
    const tb_name = req.params.tb_name
    const query = `SELECT * FROM ${tb_name}`;
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err.message);
        return res.status(500).json({
          success: false,
          message: 'Internal Server Error',
          error: err.message,
        });
      }
      res.json({
        success: true,
        message: 'Data retrieved successfully',
        data: results,
      });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
