import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Reservation from '../models/reservation.js';
import Schedule from '../models/schedule.js';

dotenv.config();

const router = express.Router();

router.post('/create-session-transaction-tpay', async (req, res) => {
    const { amount, description, email, name, phone, hiddenDescription } = req.body;

    try {
        const tpayRequest = {
            amount,
            hiddenDescription,
            description,
            payer: {
                email,
                name,
                phone,
            },
            callbacks: {
                payerUrls: {
                    success: 'http://localhost:3000/podsumowanie',
                    error: 'http://localhost:3000/',
                },
                notification: {
                    url: 'https://d8ee-2a02-a31a-a241-1300-20a4-2d0a-901-a64e.ngrok-free.app/api/payments/tpay-notifications'
                }
            },
        };

        const credentials = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');

        const tpayResponse = await fetch(
            'https://openapi.sandbox.tpay.com/transactions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                },
                body: JSON.stringify(tpayRequest),
            }
        );

        if (tpayResponse.headers.get('content-type').startsWith('text/html')) {
            return res.status(500).json({ error: 'Error creating tpay transaction' });
        }

        const tpayData = await tpayResponse.json();
        console.log('tpay response data:', tpayData);

        const paymentUrl = tpayData.transactionPaymentUrl;
        res.json({ transactionPaymentUrl: paymentUrl });
    } catch (error) {
        res.status(500).json({ error: 'Error creating tpay transaction' });
    }
});

router.post('/tpay-notifications', async (req, res) => {
    try {
        const { tr_id, tr_email, tr_crc, tr_amount, tr_hiddenDescription } = req.body;

        const reservation = await Reservation.findById(tr_crc);

        if (!reservation) {
            console.error('Reservation not found for ID:', tr_crc);
            return res.status(404).json({ error: 'Reservation not found' });
        }

        reservation.transactionId = tr_id;
        reservation.customerEmail = tr_email;
        reservation.amountPaid = tr_amount;

        const updatedReservation = await reservation.save();

        console.log('Reservation updated successfully:', updatedReservation);

        const schedule = await Schedule.findById(updatedReservation.scheduleId);

        if (!schedule) {
            console.error('Schedule not found for Reservation ID:', updatedReservation._id);
            return res.status(404).json({ error: 'Schedule not found' });
        }

        updatedReservation.selectedSeats.forEach(async (selectedSeatId) => {
            const selectedSeat = schedule.clonedHallLayout.id(selectedSeatId);

            if (selectedSeat) {
                selectedSeat.isReserved = true;
            } else {
                console.error('Seat not found for ID:', selectedSeatId);
                return res.status(404).json({ error: 'Seat not found' });
            }
        });

        const updatedSchedule = await schedule.save();

        console.log('Schedule updated successfully:', updatedSchedule);

        res.json({ result: true });
    } catch (error) {
        console.error('Error updating reservation:', error);
        res.status(500).json({ error: 'Error updating reservation' });
    }
});

export default router;
