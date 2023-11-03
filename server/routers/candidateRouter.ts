import express, { Request, Response } from 'express'
import { candidateSignin, candidateSignup, getJobs,  updateUser ,generateOTP,verifyUser} from '../controller/candidate';
import * as controller from "../controller/candidate"
import { localVariables } from '../middlewares/authMiddleware'
import { authMiddleware } from '../middlewares/authMiddleware'
import { registerMail } from '../controller/mailer'
import { getJobPosts } from '../controller/recruiter';
const userRouter = express.Router();


userRouter.post('/signin', candidateSignin)
userRouter.post('/signup', candidateSignup)

userRouter.post('/recovery',localVariables,verifyUser)
userRouter.post('/verify',controller.verifyOTP)
userRouter.post('/resetPass',controller.resetPassword)
userRouter.get('/generateOTP',localVariables,generateOTP)
userRouter.get('/verifyOTP')
userRouter.get('/createResetSession',authMiddleware)
// userRouter.get('/:user',authMiddleware,getUser)
userRouter.get('/jobs' ,authMiddleware, getJobs)
userRouter.get('/jobs/applied' ,authMiddleware, controller.getAppliedJobsByUser)
userRouter.get('/jobz' ,authMiddleware, getJobPosts)
userRouter.post('/jobs/apply-job' ,authMiddleware, controller.applyJob)
userRouter.get('/jobs/search' ,authMiddleware,controller.searchJobs )
userRouter.put('/updateProfile',authMiddleware,updateUser)
userRouter.put('/updatePassword',authMiddleware)


export default userRouter