import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { jobs, sampleUsers } from '../src/data'
import { JobModel } from '../models/jobModel'
import { UserModel } from '../models/userModel'


export const seedRouter = express.Router()

seedRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    await JobModel.deleteMany({})
 
    
    const createdProducts = await JobModel.insertMany(jobs)
    console.log(createdProducts+"ppppppppppp");
    await UserModel.deleteMany({})
    const createdUsers = await UserModel.insertMany(sampleUsers)
    
res.json({createdProducts,createdUsers})
  })
)