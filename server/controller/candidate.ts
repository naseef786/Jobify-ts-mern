import express,{Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import { generateToken } from '../Utils/utils'
import bcrypt from 'bcryptjs'
import { JobModel } from '../models/jobModel'

export const candidateSignin = asyncHandler(async(req:Request,res:Response)=>{
    const user = await UserModel.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)
            })
            return
        }
    }
    res.status(401).json({message:'Invalid email or password'})
    
    })

    export const candidateSignup =    asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password),
        } as User)
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
      })


      export const getJobs = asyncHandler(async (req: Request, res: Response) => {
        try {
          console.log(req.query);
          console.log(req.body);
      
          const searchTerm = req.query.search as string || '';
          console.log('Search Term:', searchTerm);
      
          let jobs;
          if (searchTerm === '') {
            jobs = await JobModel.find();
          } else {
            jobs = await JobModel.find({ $text: { $search: searchTerm } });
          }
      
          res.status(200).json(jobs);
        } catch (error) {
          console.error('Error:', error);
          res.status(500).json({ message: 'Server error' });
        }
      });
      


    