const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Set the view engine to EJS
app.set('view engine', 'ejs');



app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Set the public directory for serving static files
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1d' }));

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/projects', require('./routes/projectRoutes'));

// Define a route for the home page
app.get('/', (req, res) => {
  console.log('Root route accessed');
  res.render('index');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
