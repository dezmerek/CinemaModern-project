// hall.js
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
});

const Hall = mongoose.model('Hall', hallSchema);

export default Hall;
