import express from 'express';
import fs from 'fs';
import multer from 'multer';
import Movie from '../models/movie.js';
import Rating from '../models/rating.js';
import Review from '../models/review.js';

const router = express.Router();
const uploadFolder = 'public/images/movieBanners';
const trailerUploadFolder = 'public/images/trailerBanners';
const adBannerUploadFolder = 'public/images/adBanners';

const createUploadFolders = () => {
    [uploadFolder, trailerUploadFolder, adBannerUploadFolder].forEach(folder => {
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

router.post('/ad-banners', upload.single('adBannerImage'), async (req, res) => {
    try {
        const { movieId, adDescription, isAdBanner } = req.body;

        if (!movieId || !adDescription) {
            return res.status(400).json({ error: 'Invalid input parameters' });
        }

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        movie.adDescription = adDescription;
        movie.isAdBanner = isAdBanner;

        if (req.file) {
            const adBannerImageFileName = await moveFile(req.file, adBannerUploadFolder);
            movie.adBannerImage = adBannerImageFileName;
        }

        const updatedMovie = await movie.save();

        res.status(201).json(updatedMovie);
    } catch (err) {
        console.error('Error adding ad banner:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching all reviews:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/ad-banners', async (req, res) => {
    try {
        const adBanners = await Movie.find({ isAdBanner: true });

        const adBannersWithRatings = await Promise.all(
            adBanners.map(async (adBanner) => {
                const averageRatingInfo = await Rating.aggregate([
                    {
                        $match: {
                            movie: adBanner._id,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            averageRating: { $avg: '$rating' },
                        },
                    },
                ]);

                const averageRating = averageRatingInfo.length > 0 ? averageRatingInfo[0].averageRating : 0;

                return {
                    ...adBanner.toObject(),
                    averageRating,
                };
            })
        );

        res.status(200).json(adBannersWithRatings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/:id/rate', async (req, res) => {
    try {
        const movieId = req.params.id;
        const { rating, userId } = req.body;

        const existingRating = await Rating.findOneAndUpdate(
            { movie: movieId, user: userId },
            { rating },
            { new: true }
        );

        if (existingRating) {
            return res.status(200).json({ message: 'Rating updated successfully' });
        }

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        if (rating < 1 || rating > 10) {
            return res.status(400).json({ error: 'Invalid rating value' });
        }

        const newRating = new Rating({
            movie: movieId,
            rating,
            user: userId,
        });

        await newRating.save();

        res.status(200).json({ message: 'Rating added successfully' });
    } catch (error) {
        console.error('Error adding or updating rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id/average-rating', async (req, res) => {
    try {
        const movieId = req.params.id;

        const ratings = await Rating.find({ movie: movieId });

        if (ratings.length > 0) {
            const totalRating = ratings.reduce((sum, r) => sum + r.rating, 0);
            const averageRating = totalRating / ratings.length;
            res.status(200).json({ averageRating });
        } else {
            res.status(200).json({ averageRating: 0 });
        }
    } catch (error) {
        console.error('Error calculating average rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/:id/user-rating/:userId', async (req, res) => {
    try {
        const movieId = req.params.id;
        const userId = req.params.userId;

        const userRating = await Rating.findOne({ movie: movieId, user: userId });

        if (!userRating) {
            res.status(200).json({ rating: null });
        } else {
            res.status(200).json({ rating: userRating.rating });
        }
    } catch (error) {
        console.error('Error fetching user rating:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/:id/reviews', async (req, res) => {
    try {
        const movieId = req.params.id;
        const reviews = await Review.find({ movie: movieId });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.post('/:id/reviews', async (req, res) => {
    try {
        const movieId = req.params.id;
        const { comment, userId } = req.body;

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const reviewCount = await Review.countDocuments()
        const newReview = new Review({
            reviewID: reviewCount + 1,
            movie: movieId,
            user: userId,
            comment,
        });

        await newReview.save();

        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/ratings/all', async (req, res) => {
    try {
        const allRatings = await Rating.find();

        res.status(200).json(allRatings);
    } catch (error) {
        console.error('Error fetching all ratings:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

router.get('/:userId/ratings/count', async (req, res) => {
    try {
        const userId = req.params.userId;
        const ratingsCount = await Rating.countDocuments({ user: userId });
        res.status(200).json({ count: ratingsCount });
    } catch (error) {
        console.error('Error fetching ratings count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:userId/reviews/count', async (req, res) => {
    try {
        const userId = req.params.userId;
        const reviewsCount = await Review.countDocuments({ user: userId });
        res.status(200).json({ count: reviewsCount });
    } catch (error) {
        console.error('Error fetching reviews count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
