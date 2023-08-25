import express from 'express'
import { recruiterSignUpPost } from '../controller/recruiter'


const recruiterRouter = express.Router()



recruiterRouter.post('/signup',recruiterSignUpPost)










export default recruiterRouter