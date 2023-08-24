import { NextFunction, Request,Response } from "express"
import expressAsyncHandler from "express-async-handler"
import { Admin, AdminModel } from "../models/adminSchema"

import { User, UserModel } from '../models/userModel'
import { generateAdminToken } from '../Utils/utils'
import bcrypt from 'bcryptjs'
import { JobModel } from '../models/jobModel'
import zxcvbn from 'zxcvbn';


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