import express from 'express';
import Movie from '../models/movie.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.duration,
        director: req.body.director,
        writer: req.body.writer,
        releaseDateWorld: req.body.releaseDateWorld,
        releaseDatePoland: req.body.releaseDatePoland,
        genres: req.body.genres,
        language: req.body.language,
        trailerLink: req.body.trailerLink,
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
