import express, { Request, Response } from 'express'
import { adminSignin, adminSignup, getCandidates, getProfile, getRecruiters } from '../controller/admin'
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware'
import { getCompanies } from '../controller/recruiter'

const adminRouter = express.Router()

adminRouter.post('/signup',adminSignup)
adminRouter.post('/signin',adminSignin)
adminRouter.get('/recruiters',adminMiddleware,getRecruiters)
adminRouter.get('/candidates' ,adminMiddleware,getCandidates)
adminRouter.get('/companies',getCompanies)
adminRouter.delete('/candidates/:id' ,adminMiddleware,getCandidates)
adminRouter.delete('/recruiters/:id' ,adminMiddleware,getCandidates)
adminRouter.put('/candidates/:id' ,adminMiddleware,getCandidates)
adminRouter.put('/recruiters/:id' ,adminMiddleware,getCandidates)
adminRouter.put('/profile/:id' ,adminMiddleware,getProfile)

export default adminRouter