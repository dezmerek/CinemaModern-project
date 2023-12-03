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
});


const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
