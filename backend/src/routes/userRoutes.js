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
            // Znajdź ostatniego użytkownika i zwiększ jego userId o 1
            const lastUser = await User.findOne().sort({ userId: -1 });
            const userId = lastUser ? lastUser.userId + 1 : 1;

            user = new User({ userId, displayName, email, uid, picture });
        } else {
            user.displayName = displayName;
            user.email = email;
            user.picture = picture;
        }

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Błąd podczas logowania przez Google:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;