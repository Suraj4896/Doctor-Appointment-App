import express from 'express';
import {registerUser} from '../controllers/userController.js';

const userRouter = express.Router();

//endpoints
userRouter.post('/register', registerUser);


export default userRouter;
