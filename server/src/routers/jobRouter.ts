import express from 'express'
import asyncHandler from 'express-async-handler'
import { JobModel } from '../models/jobModel'
import { jobs } from '../data'


export const jobRouter = express.Router()

jobRouter.get('/',asyncHandler(async(req,res)=>{
const jobs = await JobModel.find()
console.log("hello");
res.json(jobs)
}))
jobRouter.get('/search', async (req, res) => {
    const { query } = req.query;
    
    try {
      const searchResults = await JobModel.find({
        title: { $regex: query, $options: 'i' } // Case-insensitive search
      });
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });