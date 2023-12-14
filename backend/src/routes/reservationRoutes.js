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
        } = req.body;

        const schedule = await Schedule.findById(scheduleId);
        const hall = await Hall.findById(schedule.hall);

        // Aktualizacja cen biletów i typów biletów dla konkretnych miejsc w klonowanym układzie sali
        selectedSeats.forEach(selectedSeat => {
            const seatIndex = schedule.clonedHallLayout.findIndex(seat => seat._id.equals(selectedSeat._id));

            if (seatIndex !== -1) {
                schedule.clonedHallLayout[seatIndex].price = selectedSeat.price;
                schedule.clonedHallLayout[seatIndex].ticketType = selectedSeat.ticketType;
            }
        });

        const reservation = new Reservation({
            scheduleId,
            selectedSeats: selectedSeats.map((seat) => seat._id),
            voucherCode,
            voucherDiscount,
            totalPrice,
            hallName: hall.name,
        });

        const savedReservation = await reservation.save();
        await schedule.save(); // Zapisz aktualizacje cen biletów i typów biletów w klonowanym układzie sali

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

        // Pobierz szczegóły miejsc i rzędów z klonowanego układu sali
        const seatDetails = reservation.selectedSeats.map(seatId => {
            const seat = schedule.clonedHallLayout.id(seatId);
            return { row: seat.row, seat: seat.seat };
        });

        // Dodaj więcej informacji do obiektu reservation
        const extendedReservation = {
            ...reservation.toObject(),
            scheduleDate: schedule.date,
            hall: schedule.hall,
            hallName: hall.name, // Dodaj nazwę sali
            movieTitle: movie.title,
            seatDetails: seatDetails, // Dodaj szczegóły miejsc i rzędów jako osobną tablicę
            rows: seatDetails.map(seat => seat.row), // Dodaj tablicę z numerami rzędów
            seats: seatDetails.map(seat => seat.seat), // Dodaj tablicę z numerami miejsc
            // Dodaj inne informacje, które chcesz wyświetlić
        };

        res.status(200).json(extendedReservation);
    } catch (error) {
        console.error('Error fetching reservation data:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

export default router;