import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    duration: Number,
    director: String,
    writer: String,
    releaseDateWorld: Date,
    releaseDatePoland: Date,
    genres: [String],
    language: {
        type: String,
        enum: ['polski', 'napisy', 'dubbing']
    },
    trailerLink: String,
    trailerBanner: String,
    bannerImage: String
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
