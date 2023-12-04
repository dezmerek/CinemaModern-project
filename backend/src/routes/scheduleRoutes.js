import express from 'express';
import Schedule from '../models/schedule.js';
import Movie from '../models/movie.js';
import Hall from '../models/hall.js';

const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { movie, date, startTime, endTime, hall, isPremiere } = req.body;

        const existingMovie = await Movie.findById(movie);
        if (!existingMovie) {
            return res.status(400).json({ error: 'Invalid movie reference.' });
        }

        const existingHall = await Hall.findById(hall);
        if (!existingHall) {
            return res.status(400).json({ error: 'Invalid hall reference.' });
        }

        const newSchedule = new Schedule({ movie, date, startTime, endTime, hall, isPremiere });
        await newSchedule.save();

        res.status(201).json({ message: 'Schedule added successfully!' });
    } catch (error) {
        console.error('Error adding schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { date } = req.query;

        console.log('Received request for date:', date);

        if (!date) {
            return res.status(400).json({ error: 'Missing date parameter.' });
        }

        const selectedDate = new Date(date + 'T00:00:00.000Z');

        console.log('Converted date:', selectedDate);

        const schedules = await Schedule.find({ date: selectedDate })
            .populate('movie', 'title language isPreview isPremiere')
            .select('startTime endTime ');

        console.log('Fetched schedules from the database:', schedules);

        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});




export default router;
