import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import hallRoutes from './routes/hallRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reservationRouter from './routes/reservationRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import voucherRoutes from './routes/voucherRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('public/images'));

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT;

mongoose.connect(dbURI, {
})
    .then(() => {
        console.log('Connected to MongoDB');

        app.use('/api/movies', movieRoutes);
        app.use('/api/users', userRoutes);
        app.use('/api/halls', hallRoutes);
        app.use('/api/schedules', scheduleRoutes);
        app.use('/api/payments', paymentRoutes);
        app.use('/api/reservations', reservationRouter);
        app.use('/api/tickets', ticketRoutes);
        app.use('/api/vouchers', voucherRoutes);

        app.listen(port, () => {
            console.log('Server is running on port: ' + port);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
