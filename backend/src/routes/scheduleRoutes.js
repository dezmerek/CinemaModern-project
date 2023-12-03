import express from 'express';
import Schedule from '../models/schedule.js';
import Movie from '../models/movie.js';
import Hall from '../models/hall.js';

const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { movie, date, startTime, endTime, hall } = req.body;

        // Check if the referenced movie exists
        const existingMovie = await Movie.findById(movie);
        if (!existingMovie) {
            return res.status(400).json({ error: 'Invalid movie reference.' });
        }

        // Check if the referenced hall exists
        const existingHall = await Hall.findById(hall);
        if (!existingHall) {
            return res.status(400).json({ error: 'Invalid hall reference.' });
        }

        const newSchedule = new Schedule({ movie, date, startTime, endTime, hall });
        await newSchedule.save();

        res.status(201).json({ message: 'Schedule added successfully!' });
    } catch (error) {
        console.error('Error adding schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

export default router;
