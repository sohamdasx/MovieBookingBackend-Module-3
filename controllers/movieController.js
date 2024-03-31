const Movie = require('../models/Movie');
const movieService = require('../services/movieService');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMovie = async (req, res) => {
    try {
        const { name, seatsAvailable, time } = req.body;
        const movie = new Movie({ name, seatsAvailable, time });
        await movie.save();
        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        if (movie.bookings.length > 0) {
            return res.status(400).json({ message: 'Movie cannot be removed as it has bookings' });
        }
        await Movie.findByIdAndRemove(id);
        res.status(200).json({ message: 'Movie removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};