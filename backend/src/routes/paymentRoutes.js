import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
// import Stripe from 'stripe';

dotenv.config();

const router = express.Router();

router.post('/create-session-transaction-tpay', async (req, res) => {
    const { amount, description, email, name, phone } = req.body;

    try {
        const tpayRequest = {
            amount,
            description,
            payer: {
                email,
                name,
                phone,
            },
            callbacks: {
                payerUrls: {
                    success: 'http://localhost:3000/podsumowanie',
                    error: 'http://localhost:3000/error',
                },
                notification:
                {
                    url: 'https://92ef-2a02-a31a-a241-1300-b46d-68e-fa1-2b17.ngrok-free.app/api/payments/tpay-notifications'
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
    const { tr_id, tr_email } = req.body;
    console.log('Transaction ID:', tr_id);
    console.log('Email:', tr_email);
    res.json({ result: true, transactionId: tr_id, email: tr_email });

});

/* const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-session-transaction-stripe', async (req, res) => {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'blik'],
        line_items: [
            {
                price_data: {
                    currency: 'pln',
                    product_data: {
                        name: 'Ticket',
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
    });

    res.json({ id: session.id });
}); */

export default router;
