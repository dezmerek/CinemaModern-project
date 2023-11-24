import express from 'express';
import fs from 'fs';
import multer from 'multer';
import Movie from '../models/movie.js';

const router = express.Router();
const uploadFolder = 'public/images/movieBanners';
const trailerUploadFolder = 'public/images/trailerBanners';

const createUploadFolders = () => {
    [uploadFolder, trailerUploadFolder].forEach(folder => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    });
};

createUploadFolders();

const storageConfig = (folder) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueFileName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storageConfig(uploadFolder) });

const moveFile = (file, folderPath) => {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    return new Promise((resolve, reject) => {
        fs.rename(file.path, `${folderPath}/${uniqueFileName}`, (err) => {
            if (err) {
                console.error('Error moving the file:', err);
                reject('Error moving the file');
            }
            resolve(uniqueFileName);
        });
    });
};

router.post('/', upload.fields([
    { name: 'mainBannerImage', maxCount: 1 },
    { name: 'trailerBannerImage', maxCount: 1 }
]), async (req, res) => {
    try {
        const moviesCount = await Movie.countDocuments()
        const movie = new Movie({
            movieID: moviesCount + 1,
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            director: req.body.director,
            writer: req.body.writer,
            releaseDateWorld: req.body.releaseDateWorld,
            releaseDatePoland: req.body.releaseDatePoland,
            genres: JSON.parse(req.body.genres),
            language: req.body.language,
            trailerLink: req.body.trailerLink,
        });

        let uniqueMainBannerFileName = null;
        let uniqueTrailerBannerFileName = null;

        if (req.files['mainBannerImage']) {
            const mainBannerImage = req.files['mainBannerImage'][0];
            uniqueMainBannerFileName = await moveFile(mainBannerImage, uploadFolder);
        }

        if (req.files['trailerBannerImage']) {
            const trailerBannerImage = req.files['trailerBannerImage'][0];
            uniqueTrailerBannerFileName = await moveFile(trailerBannerImage, trailerUploadFolder);
        }

        movie.mainBannerImage = uniqueMainBannerFileName;
        movie.trailerBannerImage = uniqueTrailerBannerFileName;

        const newMovie = await movie.save();

        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedMovieData = req.body;

        const updatedMovie = await Movie.findByIdAndUpdate(movieId, updatedMovieData, { new: true });

        if (!updatedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const deletedMovie = await Movie.findByIdAndDelete(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { title } = req.query;
        const query = title ? { title: { $regex: new RegExp(title, 'i') } } : {};

        const movies = await Movie.find(query);

        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
