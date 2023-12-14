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

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        console.error('Error fetching reservation data:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

export default router;