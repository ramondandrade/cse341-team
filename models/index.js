const mongoose = require('mongoose');
require('dotenv').config();

// Set up the database URL from environment variable
const url = process.env.MONGODB_URI;

// Create database connection object
const db = {
  mongoose: mongoose,
  url: url
};

module.exports = db;