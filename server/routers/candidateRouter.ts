import express, { Request, Response } from 'express'
import { candidateSignin, candidateSignup, getJobs } from '../controller/candidate'

const userRouter = express.Router()


userRouter.post('/signin', candidateSignin)
userRouter.post('/signup', candidateSignup)
userRouter.get('/jobs', getJobs)
export default userRouter