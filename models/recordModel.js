// models/recordModel.js
const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "myreactadmindb", // Replace with your database name
};

const connection = await mysql.createConnection(dbConfig);

function createRecord(name, email, callback) {
  const insertQuery = 'INSERT INTO users (name, email) VALUES (?, ?)';

  connection.query(insertQuery, [name, email], (err, results) => {
    if (err) {
      console.error('Error creating record: ' + err);
      callback(err, null);
    } else {
      console.log('Record created successfully');
      callback(null, results);
    }
  });
}

module.exports = {
  createRecord
};
