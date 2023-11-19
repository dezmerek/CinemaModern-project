import express from 'express';
import Hall from '../models/hall.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const halls = await Hall.find();
        res.json(halls);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const { name, description, bannerName, seatLayout } = req.body;

    const updatedSeatLayout = seatLayout.map((seat) => ({
        ...seat,
        isActive: !seat.isActive,
    }));

    const hall = new Hall({
        name,
        description,
        bannerName,
        seatLayout: updatedSeatLayout,
    });


    try {
        const newHall = await hall.save();
        res.status(201).json(newHall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
