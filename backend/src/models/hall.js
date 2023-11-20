import mongoose from 'mongoose';

const hallSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    bannerName: {
        type: String,
        required: true,
    },
    seatLayout: [
        {
            row: {
                type: Number,
                required: true,
            },
            seat: {
                type: Number,
                required: true,
            },
            isActive: {
                type: Boolean,
                required: true,
            },
        },
    ],
    numberOfSeats: {
        type: Number,
        required: true,
    },
    rows: {
        type: Number,
        required: true,
    },
    seatsPerRow: {
        type: Number,
        required: true,
    },
    addedDate: {
        type: Date,
        default: Date.now,
    },
    hallID: {
        type: Number,
        required: true,
    },
});

const Hall = mongoose.model('Hall', hallSchema);

export default Hall;
