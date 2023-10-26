import { NextFunction, Request,Response } from "express"
import expressAsyncHandler from "express-async-handler"
import { Admin, AdminModel } from "../models/adminSchema"
import otpGenerater from 'otp-generator'
import { User, UserModel } from '../models/userModel'
import { generateAdminToken } from '../Utils/utils'
import bcrypt from 'bcryptjs'
import { JobModel } from '../models/jobModel'
import zxcvbn from 'zxcvbn';
import { RecruiterModel } from "../models/recruiterSchema"


export const adminSignup =    expressAsyncHandler(async (req: Request, res: Response,next:NextFunction) => {
    const {email,password,name} = req.body
  const existingEmail =   await AdminModel.findOne({email:email})
  if(existingEmail){
    next("email have been already registered")
  }
  // const passwordStrength = zxcvbn(password);
  // if (passwordStrength.score < 3) {
  //   next('Password is not strong enough. Please choose a stronger password.');
  // }
    const admin = await AdminModel.create({
        name:name,
      email: email,
      password: bcrypt.hashSync(password),
    } as Admin)

    res.json({
      _id: admin.id,
      name:admin.name,
      email: admin.email,
      token: generateAdminToken(admin),
    })
  })

  export const adminSignin =    expressAsyncHandler(async (req: Request, res: Response,next:NextFunction) => {
    const {email,password,name} = req.body
  const existingAdmin =   await AdminModel.findOne({email:email})
  if(!existingAdmin){
    next("please log in with a registered email")
  }
  // const passwordStrength = zxcvbn(password);
  // if (passwordStrength.score < 3) {
  //   next('Password is not strong enough. Please choose a stronger password.');
  // }
    if(existingAdmin){
      
        if(bcrypt.compareSync(password,existingAdmin.password)){
            res.json({
                _id:existingAdmin._id,
                name:existingAdmin.name,
                email:existingAdmin.email,
                token:generateAdminToken(existingAdmin)
            })
            return
        }
    }
    


  })


  
  export const getRecruiters = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const recruiters = await RecruiterModel.find();
  
    if (!recruiters) {
      res.status(400).json({ message: 'Recruiters not available' });
    } else {
      res.status(200).json( recruiters );
    }
  });
  


  export const getCandidates =    expressAsyncHandler(async (req: Request, res: Response,next:NextFunction) => {

    const candidates = await UserModel.find()
   if(!candidates) {
     res.status(400).json({message:'recruiters not available'})
   }
   else {
     res.status(200).json(candidates)
   }
   
     })


     export const getProfile =    expressAsyncHandler(async (req: Request, res: Response,next:NextFunction) => {

      const details = AdminModel.find()
     if(!details) {
       res.status(400).json({message:'recruiters not available'})
     }
     else if (details){
       res.status(200).json({message:'recruiters fetched successfully',details})
     }
     
       })