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

app.get('/posts', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows, fields] = await connection.execute('SELECT * FROM posts'); // Replace with your table name
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

// Create a route to get a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Get the user ID from the URL parameter

    // Establish a connection to the MySQL database
   const connection = await mysql.createConnection(dbConfig);

    // Execute a SQL query to retrieve the user with the specified ID
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
    connection.end();

    if (rows.length === 0) {
      // If no user with the specified ID is found, return a 404 response
      res.status(404).json({ error: 'User not found' });
    } else {
      // If a user is found, return the user data
      // Calculate the total number of records
    const totalCount = rows.length;

    // Set the "X-Total-Count" header in the response
    res.header('X-Total-Count', totalCount);
      res.json({ user: rows[0] });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
