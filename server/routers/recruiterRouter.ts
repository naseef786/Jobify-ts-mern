import express from 'express'
import { deleteJobPost, fetchJob, getCandidates, postJob, recruiterSignUpPost, recruiterSignin, updateCompanyProfile, updateStatus } from '../controller/recruiter'
import { post } from '@typegoose/typegoose'
import { authMiddleware, recruiterMiddleware } from '../middlewares/authMiddleware'

const recruiterRouter = express.Router()



recruiterRouter.post('/signup',recruiterSignUpPost)
recruiterRouter.post('/signin',recruiterSignin)
recruiterRouter.get('/generateOTP')
recruiterRouter.get('verifyOTP')
recruiterRouter.get('createResetSession')


recruiterRouter.post('/jobs',recruiterMiddleware,postJob)
recruiterRouter.get('/jobs',recruiterMiddleware,fetchJob)
recruiterRouter.delete('/jobs',recruiterMiddleware,deleteJobPost)
recruiterRouter.put('/jobs',recruiterMiddleware,deleteJobPost)



recruiterRouter.get('/candidates',recruiterMiddleware,getCandidates)
recruiterRouter.put('/candidates/:id',recruiterMiddleware,getCandidates)
recruiterRouter.put('/update-profile',recruiterMiddleware, updateCompanyProfile)

recruiterRouter.put('updatepassword')
recruiterRouter.put('/jobs/:jobId/applications/:candidateId',recruiterMiddleware,updateStatus)






export default recruiterRouter