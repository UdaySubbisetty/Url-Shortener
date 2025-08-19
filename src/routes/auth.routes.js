import express from 'express';
import { validateMiddleware } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../validations/auth.validation.js';
import authController from '../controller/auth.controller.js';
const authRouter = express.Router();


authRouter.post('/login',validateMiddleware(loginSchema), authController.login);

authRouter.post('/register', validateMiddleware(registerSchema),authController.register); 

export default authRouter;
