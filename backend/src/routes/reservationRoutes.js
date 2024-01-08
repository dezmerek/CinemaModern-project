import express from 'express';
import Reservation from '../models/reservation.js';
import Schedule from '../models/schedule.js';
import Movie from '../models/movie.js';
import Hall from '../models/hall.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const {
            scheduleId,
            selectedSeats,
            voucherCode,
            voucherDiscount,
            totalPrice,
            userId,
        } = req.body;

        // Add a check to ensure that selectedSeats is an array and not undefined
        if (!Array.isArray(selectedSeats)) {
            return res.status(400).json({ error: 'Invalid selectedSeats data' });
        }

        const schedule = await Schedule.findById(scheduleId);
        const hall = await Hall.findById(schedule.hall);

        selectedSeats.forEach(selectedSeat => {
            // Check if selectedSeat is a valid object before accessing its properties
            if (selectedSeat && selectedSeat._id) {
                const seatIndex = schedule.clonedHallLayout.findIndex(seat => seat._id.equals(selectedSeat._id));

                if (seatIndex !== -1) {
                    schedule.clonedHallLayout[seatIndex].price = selectedSeat.price;
                    schedule.clonedHallLayout[seatIndex].ticketType = selectedSeat.ticketType;
                }
            }
        });

        const reservation = new Reservation({
            scheduleId,
            selectedSeats: selectedSeats.map((seat) => seat._id),
            voucherCode,
            voucherDiscount,
            totalPrice,
            hallName: hall.name,
            userId,
            createdAt: new Date(),
        });
        console.log('userId:', userId);
        const savedReservation = await reservation.save();

        await schedule.save();

        res.status(201).json({ message: 'Reservation saved successfully!', _id: savedReservation._id });
    } catch (error) {
        console.error('Error saving reservation:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const schedule = await Schedule.findById(reservation.scheduleId);
        const movie = await Movie.findById(schedule.movie);
        const hall = await Hall.findById(schedule.hall);

        const seatDetails = reservation.selectedSeats.map(seatId => {
            const seat = schedule.clonedHallLayout.id(seatId);
            return {
                row: seat.row,
                seat: seat.seat,
                ticketType: seat.ticketType,
                ticketPrice: seat.price,
            };
        });

        const extendedReservation = {
            ...reservation.toObject(),
            scheduleDate: schedule.date,
            hall: schedule.hall,
            hallName: hall.name,
            movieTitle: movie.title,
            seatDetails: seatDetails,
            rows: seatDetails.map(seat => seat.row),
            seats: seatDetails.map(seat => seat.seat),
            ticketTypes: seatDetails.map(seat => seat.ticketType),
            ticketPrices: seatDetails.map(seat => seat.ticketPrice),
        };

        res.status(200).json(extendedReservation);
    } catch (error) {
        console.error('Error fetching reservation data:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.find();

        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error fetching all reservations:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const schedule = await Schedule.findById(reservation.scheduleId);

        schedule.selectedSeats = schedule.selectedSeats.filter(seatId => !seatId.equals(reservation._id));

        await schedule.save();

        await reservation.remove();

        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

router.get('/:userId/selectedSeats/count', async (req, res) => {
    try {
        const userId = req.params.userId;
        const reservations = await Reservation.find({ userId });

        let selectedSeatsCount = 0;
        reservations.forEach(reservation => {
            selectedSeatsCount += reservation.selectedSeats.length;
        });

        res.status(200).json({ count: selectedSeatsCount });
    } catch (error) {
        console.error('Error fetching selected seats count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:userId/transactions/count', async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactionsCount = await Reservation.countDocuments({ userId });
        res.status(200).json({ count: transactionsCount });
    } catch (error) {
        console.error('Error fetching transactions count:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:userId/selectedSeats', async (req, res) => {
    try {
        const userId = req.params.userId;
        const reservations = await Reservation.find({ userId }).populate('scheduleId');

        let selectedSeatsData = [];

        for (const reservation of reservations) {
            const schedule = reservation.scheduleId;
            const clonedHallLayout = schedule.clonedHallLayout;

            for (const seatId of reservation.selectedSeats) {
                const seat = clonedHallLayout.id(seatId);

                if (seat && seat.price !== undefined) {
                    const movie = await Movie.findById(schedule.movie);

                    selectedSeatsData.push({
                        reservationId: reservation._id,
                        seatId,
                        movieTitle: movie.title,
                        ticketPrice: seat.price,
                        createdAt: reservation.createdAt,
                    });
                }
            }
        }

        res.status(200).json(selectedSeatsData);
    } catch (error) {
        console.error('Error fetching selected seats data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/:userId/transactions', async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await Reservation.find({ userId });

        let transactionsData = [];

        for (const transaction of transactions) {
            const schedule = await Schedule.findById(transaction.scheduleId);
            const movie = await Movie.findById(schedule.movie);

            transactionsData.push({
                reservationId: transaction._id,
                scheduleId: transaction.scheduleId,
                movieTitle: movie.title,
                totalPrice: transaction.totalPrice,
                createdAt: transaction.createdAt,
            });
        }

        res.status(200).json(transactionsData);
    } catch (error) {
        console.error('Error fetching transactions data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;