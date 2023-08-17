import express, { Request, Response } from 'express'
import { candidateSignin, candidateSignup } from '../../controller/candidate'

export const userRouter = express.Router()


userRouter.post('/signin', candidateSignin)
userRouter.post('/signup', candidateSignup)
