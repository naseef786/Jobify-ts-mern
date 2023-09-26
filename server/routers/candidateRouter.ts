import express, { Request, Response } from 'express'
import { candidateSignin, candidateSignup, getJobs, getUser, updateUser } from '../controller/candidate'

const userRouter = express.Router()


userRouter.post('/signin', candidateSignin)
userRouter.post('/signup', candidateSignup)
userRouter.get('/generateOTP')
userRouter.get('verifyOTP')
userRouter.get('createResetSession')
userRouter.get('/:user',getUser)

userRouter.put('updateProfile',updateUser)
userRouter.put('updatePassword')
userRouter.get('/jobs', getJobs)
export default userRouter