import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose.connect(dbURI, {
})
    .then(() => {
        console.log('Connected to MongoDB');
        // Dodanie trasy związanej z filmami
        app.use('/api/movies', movieRoutes);

        app.listen(port, () => {
            console.log('Server is running on port: ' + port);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
