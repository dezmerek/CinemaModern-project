import express from 'express';
import Voucher from '../models/voucher.js';
import Reservation from '../models/reservation.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { code, discountValue, expirationDate, usageLimit } = req.body;

        const lastVoucher = await Voucher.findOne().sort({ voucherId: -1 });

        const newVoucher = new Voucher({
            voucherId: lastVoucher ? lastVoucher.voucherId + 1 : 1,
            code,
            discountValue,
            expirationDate,
            usageLimit,
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

const calculateTotalSpentAmount = async (userId) => {
    try {
        const user = await User.findById(userId);

        // Sumuj kwoty z voucherów
        const vouchersTotal = user.totalSpentAmount;

        return vouchersTotal;
    } catch (error) {
        console.error('Error calculating total spent amount:', error);
        throw new Error('Internal server error');
    }
};

const generateVoucherCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 8;

    let voucherCode = '';
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        voucherCode += characters.charAt(randomIndex);
    }

    return voucherCode;
};

router.post('/generate', async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);
        const totalSpentAmount = await calculateTotalSpentAmount(userId);

        console.log('Total spent amount:', totalSpentAmount);

        if (user && user.generatedVouchersCount) {
            const requiredAmount = (user.generatedVouchersCount + 1) * 100;
            console.log('Required amount for next voucher:', requiredAmount);

            if (totalSpentAmount < requiredAmount) {
                return res.status(403).json({
                    error: 'User has not spent enough to generate a voucher',
                    requiredAmount: requiredAmount, // Dodaj informację o wymaganej kwocie
                    currentSpentAmount: totalSpentAmount // Dodaj informację o aktualnej wydanej kwocie
                });
            }
        }

        // Reszta kodu pozostaje bez zmian
        const lastVoucher = await Voucher.findOne().sort({ voucherId: -1 });
        const voucherId = lastVoucher ? lastVoucher.voucherId + 1 : 1;
        const voucherCode = generateVoucherCode();

        const newVoucher = new Voucher({
            voucherId,
            code: voucherCode,
            discountValue: 5,
            expirationDate: new Date(),
            usageLimit: 1,
        });

        await newVoucher.save();

        user.generatedVouchers.push(newVoucher);
        user.generatedVouchersCount += 1;
        await user.save();

        res.status(201).json({ message: 'Voucher added successfully!' });
    } catch (error) {
        console.error('Error generating voucher:', error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});


export default router;
