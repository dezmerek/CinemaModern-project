import express from 'express';
import mongoose from 'mongoose';
import Schedule from '../models/schedule.js';
import Movie from '../models/movie.js';
import Hall from '../models/hall.js';

function deepCloneWithSeats(obj, numberOfSeats) {
    try {
        const clonedObj = JSON.parse(JSON.stringify(obj));
        console.log('Deep clone success:', clonedObj);

        // Set numberOfSeats property only once for the entire cloned layout
        clonedObj.forEach(seat => {
            seat.numberOfSeats = numberOfSeats;
        });

        return clonedObj;
    } catch (error) {
        console.error('Deep clone error:', error);
        return null;
    }
}


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

        const hallLayoutCopy = deepCloneWithSeats(existingHall.seatLayout, existingHall.numberOfSeats);

        if (!hallLayoutCopy) {
            return res.status(500).json({ error: 'Error cloning hall layout.' });
        }

        // Set isReserved for the first seat in the cloned layout
        if (hallLayoutCopy.length > 0) {
            hallLayoutCopy[0].isReserved = true;
        }

        const numberOfSeats = existingHall.numberOfSeats; // Set only once

        // Create the newSchedule object without numberOfSeats in clonedHallLayout
        const newSchedule = new Schedule({
            movie,
            date,
            startTime,
            endTime,
            hall,
            isPremiere,
            numberOfSeats,
            clonedHallLayout: hallLayoutCopy.map(seat => ({
                row: seat.row,
                seat: seat.seat,
                isActive: seat.isActive,
                isReserved: seat.isReserved,
            })),
        });

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

        if (!date) {
            return res.status(400).json({ error: 'Missing date parameter.' });
        }

        const selectedDate = new Date(date + 'T00:00:00.000Z');

        const schedules = await Schedule.find({ date: selectedDate })
            .populate('movie', 'title language isPreview isPremiere')
            .select('startTime endTime isPremiere movie');  // Dodaj 'isPremiere' i 'movie' do select

        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

// Dodaj nowy endpoint do pobierania harmonogramu po ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Sprawdź, czy id jest prawidłowym identyfikatorem ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid schedule ID.' });
        }

        const schedule = await Schedule.findById(id)
            .populate('movie', 'title language isPreview isPremiere duration genres mainBannerImage')
            .select('startTime endTime isPremiere movie clonedHallLayout numberOfSeats');

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found.' });
        }

        res.json(schedule);
    } catch (error) {
        console.error('Error fetching schedule by ID:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

export default router;
