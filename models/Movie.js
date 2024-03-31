const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    image: {
        type: String // Assuming you're storing image paths
    },
    bookings: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        numberOfSeats: {
            type: Number,
            required: true
        }
    }]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
