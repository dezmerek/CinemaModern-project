import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: Number,
    displayName: String,
    email: String,
    uid: String,
    picture: String,
    registrationDate: Date,
    lastLoginDate: Date,
});

const User = mongoose.model('User', userSchema);

export default User;