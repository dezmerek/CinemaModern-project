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
