import express from 'express';
import Voucher from '../models/voucher.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { code, discountValue, expirationDate, usageLimit, discountType, minPurchaseAmount } = req.body;

        if (!code || !discountValue || !discountType) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        if (!['amount', 'percentage'].includes(discountType)) {
            return res.status(400).json({ error: 'Invalid discountType value.' });
        }

        const lastVoucher = await Voucher.findOne().sort({ voucherId: -1 });

        const newVoucher = new Voucher({
            voucherId: lastVoucher ? lastVoucher.voucherId + 1 : 1,
            code,
            discountValue,
            expirationDate,
            usageLimit,
            discountType,
            minPurchaseAmount,
        });

        await newVoucher.save();

        res.status(201).json({ message: 'Voucher added successfully!' });
    } catch (error) {
        console.error('Error adding voucher:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const vouchers = await Voucher.find();
        res.status(200).json(vouchers);
    } catch (error) {
        console.error('Error fetching vouchers:', error);
        res.status(500).json({
            error: 'Internal server error. Please try again later.',
        });
    }
});

export default router;
