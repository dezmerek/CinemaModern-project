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
    dateAdded: {
        type: Date,
        default: Date.now
    },
    isPreview: {
        type: Boolean,
        default: false,
    },
    isRecommended: {
        type: Boolean,
        default: false,
    },
    adDescription: {
        type: String,
    },
    adBannerImage: String,
    isAdBanner: {
        type: Boolean,
        default: false,
    },
    schedules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
    }],
});
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
