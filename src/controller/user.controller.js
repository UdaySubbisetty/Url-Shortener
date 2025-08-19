import express from 'express';
import User from '../models/user.model.js';

const userRouter  = express.Router();


userRouter.get('/', async(req, res) => {
    try {
        // Get all users
        const users = await User.find().select("-password -__v"); // exclude password
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



export default userRouter;

