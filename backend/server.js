require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

// Connect to MongoDB
require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend HTML/CSS/JS files from the root folder
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/leads',  require('./routes/leads'));
app.use('/api/quotes', require('./routes/quotes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
