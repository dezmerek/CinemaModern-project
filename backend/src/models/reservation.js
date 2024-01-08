import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule',
        required: true,
    },
    selectedSeats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seat',
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    voucherCode: String,
    voucherDiscount: Number,
    totalPrice: Number,
    transactionId: String,
    customerEmail: String,
    amountPaid: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
