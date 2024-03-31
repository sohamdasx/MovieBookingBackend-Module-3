const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const cors = require('cors');

const app = express();

// Middleware
//app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const movieRoutes = require('./src/routes/movieRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Database connection
mongoose.connect('mongodb://your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
