import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    movieID: Number,
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
    mainBannerImage: String,
    trailerBannerImage: String,
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
