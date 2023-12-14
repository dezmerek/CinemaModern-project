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
    voucherCode: String,
    voucherDiscount: Number,
    totalPrice: Number,
    transactionId: String,
    customerEmail: String,
    amountPaid: Number,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
