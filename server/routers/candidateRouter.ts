import express, { Request, Response } from 'express'
import { candidateSignin, candidateSignup, getJobs, getUser, updateUser ,generateOTP} from '../controller/candidate'
import { localVariables } from '../middlewares/authMiddleware'
import { registerMail } from '../controller/mailer'
const userRouter = express.Router()


userRouter.post('/signin', candidateSignin)
userRouter.post('/signup', candidateSignup)

userRouter.get('/generateOTP',localVariables,generateOTP)
userRouter.get('/verifyOTP')
userRouter.get('/createResetSession')
userRouter.get('/:user',getUser)

userRouter.put('/updateProfile',updateUser)
userRouter.put('/updatePassword')
userRouter.get('/jobs', getJobs)
export default userRouter