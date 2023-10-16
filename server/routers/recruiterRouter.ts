import express from 'express'
import { fetchJob, postJob, recruiterSignUpPost, recruiterSignin } from '../controller/recruiter'
import { post } from '@typegoose/typegoose'
import { recruiterMiddleware } from '../middlewares/authMiddleware'

const recruiterRouter = express.Router()



recruiterRouter.post('/signup',recruiterSignUpPost)
recruiterRouter.post('/signin',recruiterSignin)
recruiterRouter.get('/generateOTP')
recruiterRouter.get('verifyOTP')
recruiterRouter.get('createResetSession')
recruiterRouter.post('/post-job',recruiterMiddleware,postJob)
recruiterRouter.get('/jobs',recruiterMiddleware,fetchJob)

recruiterRouter.put('updateProfile')
recruiterRouter.put('updatepassword')






export default recruiterRouter