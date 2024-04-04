require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Database connection
mongoose.connect('mongodb+srv://sohamdas2702:' + process.env.MONGO_ATLAS_PW + '@moviebookingapp.ytn0v41.mongodb.net/')
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
