import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    reviewID: {
        type: Number,
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    comment: String,
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
