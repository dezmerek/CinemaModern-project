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
});

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;