import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: Number,
    uid: String,
    displayName: String,
    email: String,
    picture: String,
});

const User = mongoose.model('User', userSchema);

export default User;