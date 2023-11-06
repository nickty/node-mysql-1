// controllers/recordController.js

const recordModel = require('../models/recordModel');

function createRecord(req, res) {
  const { name, email } = req.body; // Get values from the request body

  recordModel.createRecord(name, email, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error creating record' });
    } else {
      res.json({ message: 'Record created successfully' });
    }
  });
}

module.exports = {
  createRecord
};
