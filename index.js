require('dotenv').config();
const express = require('express');
const cors = require('cors');
const slotRoutes = require('./src/routes/slotRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging Incoming Requests
app.use((req, res, next) => {
    console.log(`🔹 ${req.method} ${req.url}`);
    next();
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
