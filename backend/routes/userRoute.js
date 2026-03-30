import express from 'express';
import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile, changePassword } from '../controllers/userController.js'
import { auth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/profile', auth, getUserProfile)
userRouter.post('/update-profile', auth, updateUserProfile)
userRouter.post('/change-password', auth, changePassword)

export default userRouter;