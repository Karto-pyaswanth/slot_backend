require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const slotRoutes = require('./src/routes/slotRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database:', process.env.DB_NAME);
    }
});

// Routes
app.use('/api', slotRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Slot Management API is running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
