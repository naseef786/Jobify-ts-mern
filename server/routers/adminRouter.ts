import express, { Request, Response } from 'express'
import { adminSignin, adminSignup } from '../controller/admin'

const adminRouter = express.Router()

adminRouter.post('/signup',adminSignup)
adminRouter.post('/signin',adminSignin)

export default adminRouter