import express from 'express'
import asyncHandler from 'express-async-handler'
import { JobModel } from '../models/jobModel'
import { jobs } from '../data'


export const jobRouter = express.Router()

// jobRouter.get('/', async (req, res) => {
//   try {
//     const searchTerm = req.query.search || '';
//     const jobs = await JobModel.find({ $text: { $search: searchTerm } });
//     res.json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

jobRouter.get('/', async (req, res) => {
  try {
    console.log(req.query);
    console.log(req.body);
    
    const searchTerm = req.query.search as string || ''; // Ensure searchTerm is a string
    console.log('Search Term:', searchTerm); // Log the search term
    if(searchTerm===""){
      const jobs = await JobModel.find()
      return res.json(jobs);
    }

    const jobs = await JobModel.find({ $text: { $search: searchTerm } });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

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