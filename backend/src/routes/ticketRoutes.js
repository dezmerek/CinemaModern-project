import express from 'express';
import Reservation from '../models/reservation.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tickets = await Reservation.find();
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

export default router;
