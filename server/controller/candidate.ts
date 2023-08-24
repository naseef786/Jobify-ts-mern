import express,{NextFunction, Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import { generateUserToken } from '../Utils/utils'
import bcrypt from 'bcryptjs'
import { JobModel } from '../models/jobModel'
import zxcvbn from 'zxcvbn';

export const candidateSignin = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  const{email,password} = req.body;
  if(!email){
    next("provide an email")
  }
  if(!password){
    next("please enter your password")
  }

    const user = await UserModel.findOne({email:email})
    
    if(user){
        if(bcrypt.compareSync(password,user.password)){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateUserToken(user)
            })
            return
        }
    }
    res.status(401).json({message:'Invalid email or password'})
    
    })

    export const candidateSignup =    asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
        const {name,email,password} = req.body
      const existingEmail =   await UserModel.findOne({email:email})
      if(existingEmail){
        next("email have been already registered")
      }
      // const passwordStrength = zxcvbn(password);
      // if (passwordStrength.score < 3) {
      //   next('Password is not strong enough. Please choose a stronger password.');
      // }
        const user = await UserModel.create({
          name: name,
          email: email,
          password: bcrypt.hashSync(password),
        } as User)
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateUserToken(user),
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
      


    