import express from 'express'
import asyncHandler from 'express-async-handler'
import { JobModel } from '../models/jobModel'


export const jobRouter = express.Router()

jobRouter.get('/',asyncHandler(async(req,res)=>{
const jobs = await JobModel.find()
console.log("hello");
res.json(jobs)
}))