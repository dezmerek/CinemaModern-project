import express from 'express';
import Schedule from '../models/schedule.js';
import Movie from '../models/movie.js';
import Hall from '../models/hall.js';

const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { movie, date, startTime, endTime, hall, isPremiere } = req.body;

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

        // Convert the received date string to a valid Date object
        const selectedDate = new Date(date + 'T00:00:00.000Z');

        console.log('Converted date:', selectedDate);

        // Pobierz harmonogram dla wybranej daty z bazy danych
        const schedules = await Schedule.find({ date: selectedDate })
            .populate('movie', 'title language isPreview')
            .select('startTime endTime isPremiere');

        console.log('Fetched schedules from the database:', schedules);

        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});




export default router;
