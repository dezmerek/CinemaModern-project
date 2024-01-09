import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
    voucherId: {
        type: Number,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    discountType: {
        type: String,
        enum: ['amount', 'percentage'],
        default: 'amount',
    },
    minPurchaseAmount: {
        type: Number,
        default: 0,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
    },
    usedCount: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    usageLimit: {
        type: Number,
    }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
