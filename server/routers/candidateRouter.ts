import express, { Request, Response } from 'express'
import { candidateSignin, candidateSignup, getJobs,  updateUser ,generateOTP} from '../controller/candidate';
import * as controller from "../controller/candidate"
import { localVariables } from '../middlewares/authMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'
import { registerMail } from '../controller/mailer'
const userRouter = express.Router();


userRouter.post('/signin', candidateSignin)
userRouter.post('/signup', candidateSignup)

userRouter.get('/generateOTP',localVariables,generateOTP)
userRouter.get('/verifyOTP')
userRouter.get('/createResetSession',authMiddleware)
// userRouter.get('/:user',authMiddleware,getUser)
userRouter.get('/jobs' ,authMiddleware, getJobs)
userRouter.put('/updateProfile',authMiddleware,updateUser)
userRouter.put('/updatePassword',authMiddleware)


export default userRouter