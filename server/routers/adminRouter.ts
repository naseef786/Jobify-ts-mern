import express, { Request, Response } from 'express'
import { adminSignup } from '../controller/admin'

const adminRouter = express.Router()

adminRouter.post('/signup',adminSignup)


export default adminRouter