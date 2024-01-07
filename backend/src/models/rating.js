import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 10 },
    date: { type: Date, default: Date.now }
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
