import fs from "fs";
import bcrypt from "bcrypt";
import authService from "../services/auth.service.js";
import User from "../models/user.model.js";
const register = async (req, res) => {

   
    try {
        const isRegistered = await authService.register(req.body);
         res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
   

}


const login = async (req, res) => {

    try {

        const user = await authService.login(req.body);

        res.status(200).json({ message: 'Login successful', data: user });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export default { register, login };