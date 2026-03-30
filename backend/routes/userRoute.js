import express from 'express';
import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { auth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/profile', auth, getUserProfile)
userRouter.post('/update-profile', auth, updateUserProfile)

export default userRouter;