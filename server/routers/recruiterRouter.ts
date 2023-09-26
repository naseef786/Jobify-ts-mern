import express from 'express'
import { recruiterSignUpPost, recruiterSignin } from '../controller/recruiter'


const recruiterRouter = express.Router()



recruiterRouter.post('/signup',recruiterSignUpPost)
recruiterRouter.post('/signin',recruiterSignin)
recruiterRouter.get('/generateOTP')
recruiterRouter.get('verifyOTP')
recruiterRouter.get('createResetSession')


recruiterRouter.put('updateProfile')
recruiterRouter.put('updatepassword')






export default recruiterRouter