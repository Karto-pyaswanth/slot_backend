const mysql = require('mysql2/promise'); 

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.getConnection()
    .then(() => console.log('Connected to MySQL'))
    .catch((err) => console.error('Database connection failed:', err));

module.exports = db;
