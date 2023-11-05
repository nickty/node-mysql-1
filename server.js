const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = 3000;

const corsOptions = {
  exposedHeaders: 'X-Total-Count',
};

// Enable CORS for all routes
app.use(cors(corsOptions));

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'myreactadmindb', // Replace with your database name
};

app.get('/users', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('SELECT * FROM users'); // Replace with your table name
    connection.end();
    
    // Calculate the total number of records
    const totalCount = rows.length;

    // Set the "X-Total-Count" header in the response
    res.header('X-Total-Count', totalCount);
    
    res.json(rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
