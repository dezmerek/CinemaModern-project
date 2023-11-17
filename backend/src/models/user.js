import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    lastName: String,
    role: String,
    phoneNumber: String,
    createdAt: Date,
});

const User = mongoose.model('User', userSchema);

export default User;
