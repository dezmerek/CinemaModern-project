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

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Reservation.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

export default router;
