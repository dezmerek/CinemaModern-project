import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: Number,
    displayName: String,
    email: String,
    uid: String,
    picture: String,
    registrationDate: Date,
    lastLoginDate: Date,
    role: {
        type: String,
        default: 'user'
    },
    phoneNumber: Number,
    totalSpentAmount: {
        type: Number,
        default: 0,
    },
    generatedVouchers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
    }],
    generatedVouchersCount: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model('User', userSchema);

export default User;