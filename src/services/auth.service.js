
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const login = async ({ username, email, password }) => {


    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordValid) {
        throw new Error("Invalid credentials");
    }

    const userResponse = { id: user._id, name: user.name, email: user.email }
    const token = jwt.sign(
        userResponse,
        process.env.JWT_SECRET,
        { expiresIn: "1h" }   // token expiry
    );
    return { ...userResponse, token }
}

const register = async ({name, email,password}) => {
       
       // Check if user already exists
       const existingUser = await User.findOne({ email: email});
       if (existingUser) {
        throw new Error(`User already exists with ${email}`);
       }
   
       // Hash password
       const hash = await bcrypt.hash(password, 10);
   
       // Save user
       const user = new User({ name, email, password: hash });
       await user.save();
};


export default { login ,register};