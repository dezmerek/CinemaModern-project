// hallRoutes.js
import express from 'express';
import Hall from '../models/hall.js';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

const bannerUploadFolder = 'public/images/hallBanners';

const createBannerUploadFolder = () => {
    if (!fs.existsSync(bannerUploadFolder)) {
        fs.mkdirSync(bannerUploadFolder, { recursive: true });
    }
};

createBannerUploadFolder();

const bannerStorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, bannerUploadFolder);
    },
    filename: (req, file, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName);
    },
});

const bannerUpload = multer({ storage: bannerStorageConfig });

router.post('/uploadBanner', bannerUpload.single('bannerImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const bannerFileName = req.file.filename;
        const bannerPath = `${bannerFileName}`;
        res.json({ bannerPath });
    } catch (error) {
        console.error('Error during banner upload:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

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

    const numberOfActiveSeats = updatedSeatLayout.filter(seat => seat.isActive).length;

    const hall = new Hall({
        hallID: await Hall.countDocuments() + 1,
        name,
        description,
        bannerName,
        seatLayout: updatedSeatLayout,
        numberOfSeats: numberOfActiveSeats,
    });

    try {
        const newHall = await hall.save();
        res.status(201).json(newHall);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const hallId = req.params.id;
        const updatedHallData = req.body;

        const updatedHall = await Hall.findByIdAndUpdate(hallId, updatedHallData, { new: true });

        if (!updatedHall) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        res.status(200).json(updatedHall);
    } catch (error) {
        console.error('Error during hall update:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const hallId = req.params.id;
        const deletedHall = await Hall.findByIdAndDelete(hallId);

        if (!deletedHall) {
            return res.status(404).json({ error: 'Hall not found' });
        }

        res.status(200).json({ message: 'Hall deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
