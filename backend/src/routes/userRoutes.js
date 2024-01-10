import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/google-login', async (req, res) => {
    const { displayName, email, uid, picture } = req.body;

    try {
        let user = await User.findOne({ uid });

        if (!user) {
            const lastUser = await User.findOne().sort({ userId: -1 });
            const userId = lastUser ? lastUser.userId + 1 : 1;

            user = new User({
                userId,
                displayName,
                email,
                uid,
                picture,
                registrationDate: new Date(),
                lastLoginDate: new Date()
            });
        } else {
            user.displayName = displayName;
            user.email = email;
            user.picture = picture;
            user.lastLoginDate = new Date();
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Błąd podczas logowania przez Google:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.deleteOne({ _id: userId });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { displayName, email, picture, role, phoneNumber } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.displayName = displayName;
        user.email = email;
        user.picture = picture;
        user.role = role;
        user.phoneNumber = phoneNumber;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});


export default router;