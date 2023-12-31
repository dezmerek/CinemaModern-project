import express from 'express';
import mongoose from 'mongoose';
import Schedule from '../models/schedule.js';
import Movie from '../models/movie.js';
import Hall from '../models/hall.js';

function deepCloneWithSeats(obj, numberOfSeats) {
    try {
        const clonedObj = JSON.parse(JSON.stringify(obj));
        console.log('Deep clone success:', clonedObj);

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

        const numberOfSeats = existingHall.numberOfSeats;

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
            .select('startTime endTime isPremiere movie');

        res.json(schedules);
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const allSchedules = await Schedule.find()
            .populate({
                path: 'movie',
                select: 'title',
            })
            .populate({
                path: 'hall',
                select: 'name',
            })
            .select('date startTime endTime isPremiere movie hall');

        res.json(allSchedules);
    } catch (error) {
        console.error('Error fetching all schedules:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

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

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid schedule ID.' });
        }

        const schedule = await Schedule.findById(id);

        if (!schedule) {
            return res.status(404).json({ error: 'Schedule not found.' });
        }

        await schedule.deleteOne();

        res.json({ message: 'Schedule deleted successfully!' });
    } catch (error) {
        console.error('Error deleting schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { date, startTime, endTime } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid schedule ID.' });
        }

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            id,
            { date, startTime, endTime },
            { new: true, runValidators: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ error: 'Schedule not found.' });
        }

        res.json(updatedSchedule);
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});


export default router;
