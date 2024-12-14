const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,  // Your DB host, typically 'localhost'
    user: process.env.DB_USER,  // Your DB username
    password: process.env.DB_PASSWORD,  // Your DB password
    database: process.env.DB_NAME,  // The name of the database
});

// Test the connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);  
    } else {
        console.log('Connected to the MySQL database.');  
    }
});

module.exports = db;