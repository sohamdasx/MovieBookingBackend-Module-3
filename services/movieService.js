const Movie = require('../models/Movie');

exports.checkSeatsAvailability = async (movieId, numberOfSeats) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error('Movie not found');
    }
    return movie.seatsAvailable >= numberOfSeats;
};

exports.bookSeats = async (movieId, userId, numberOfSeats) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error('Movie not found');
    }
    if (movie.seatsAvailable < numberOfSeats) {
        throw new Error('Not enough seats available');
    }
    movie.seatsAvailable -= numberOfSeats;
    movie.bookings.push({ userId, numberOfSeats });
    await movie.save();
};

exports.cancelBooking = async (movieId, userId, numberOfSeats) => {
    const movie = await Movie.findById(movieId);
    if (!movie) {
        throw new Error('Movie not found');
    }
    const bookingIndex = movie.bookings.findIndex(booking => booking.userId.equals(userId));
    if (bookingIndex === -1) {
        throw new Error('Booking not found');
    }
    movie.seatsAvailable += movie.bookings[bookingIndex].numberOfSeats;
    movie.bookings.splice(bookingIndex, 1);
    await movie.save();
};