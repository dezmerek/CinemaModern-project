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
});

const User = mongoose.model('User', userSchema);

export default User;