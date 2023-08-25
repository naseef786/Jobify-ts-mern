import { Recruiter, RecruiterModel } from "../models/recruiterSchema";
import bcrypt from 'bcryptjs'
import { generateRecruiterToken } from "../Utils/utils";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const recruiterSignUpPost = expressAsyncHandler( async (req:Request, res:Response, next:NextFunction) => {
    try {
      const {
        name,
        phone,
        company,
        email,
        tagline,
        discription,
        website,
        location,
        password,
        image,
      } = req.body;
      const isActive = true
      const existingRecruiter = await RecruiterModel.findOne({ email });
      const number = await RecruiterModel.findOne({ phone });
      if (existingRecruiter) {
        res.json({ status: 'failed', message: 'Email already exist login now' });
      } else if (number) {
        res.json({
          status: 'failed',
          message: 'Phone Number already exist login now',
        });
      } else {
     
       const recruiter =  await RecruiterModel.create({
           name,
           company,
           phone,
           email,
           tagline,
           discription,
           website,
           image,
           location,
           password: bcrypt.hashSync(password),
       } as  Recruiter) 

        res.json({ status: 'success', message: 'signup success' ,token:generateRecruiterToken(recruiter) });
      }
    } catch (error) {
      next(error);
    }
  })