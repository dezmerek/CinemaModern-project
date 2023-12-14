import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
    },
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hall',
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    isPremiere: {
        type: Boolean,
        default: false,
    },
    numberOfSeats: {
        type: Number,
        required: true,
    },
    clonedHallLayout: [
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
            isReserved: {
                type: Boolean,
                default: false,
            },
            price: {
                type: Number,
            },
            ticketType: {
                type: String,
            },
        },
    ],
});


const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
