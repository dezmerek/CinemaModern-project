import express from 'express';
import Reservation from '../models/reservation.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {
            scheduleId,
            selectedSeats,
            voucherCode,
            voucherDiscount,
            totalPrice,
        } = req.body;

        const reservation = new Reservation({
            scheduleId,
            selectedSeats,
            voucherCode,
            voucherDiscount,
            totalPrice,
        });

        const savedReservation = await reservation.save();

        res.status(201).json({ message: 'Reservation saved successfully!', _id: savedReservation._id });
    } catch (error) {
        console.error('Error saving reservation:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

export default router;