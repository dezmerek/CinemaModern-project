// hallRoutes.js
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
    const { name, description, seatLayout } = req.body;

    // Odwróć wartość isActive dla każdego miejsca w seatLayout przed zapisaniem
    const updatedSeatLayout = seatLayout.map((seat) => ({
        ...seat,
        isActive: !seat.isActive,
    }));

    const hall = new Hall({
        name,
        description,
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
