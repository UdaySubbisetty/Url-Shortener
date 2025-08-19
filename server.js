import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { sign } from 'crypto';
import { register } from 'module';
import { registerSchema } from './src/validations/auth.validation.js';
import { validateMiddleware } from './src/middlewares/validate.middleware.js';
import authRouter from './src/routes/auth.routes.js';
import { verifyToken } from './src/middlewares/auth.middleware.js';
import connectDB from './src/config/db.js';
import User from './src/models/user.model.js';
import userRouter from './src/controller/user.controller.js';
import urlSchema from './src/validations/url.valdiation.js';
import Url from './src/models/url.model.js';
import { nanoid } from 'nanoid';
import urlRouter from './src/routes/url.routes.js';

dotenv.config();

const app = express();

//Connect database
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files
app.use('/auth',authRouter)
app.use('/users',verifyToken, userRouter)
app.use('/short', urlRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});



