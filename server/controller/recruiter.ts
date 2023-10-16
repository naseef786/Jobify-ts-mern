import { Recruiter, RecruiterModel } from "../models/recruiterSchema";
import bcrypt from 'bcryptjs'
import { generateRecruiterToken } from "../Utils/utils";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { JobModel } from "../models/jobModel";

export const recruiterSignUpPost = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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

      const recruiter = await RecruiterModel.create({
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
      } as Recruiter)

      res.json({ status: 'success', message: 'signup success', token: generateRecruiterToken(recruiter) });
    }
  } catch (error) {
    next(error);
  }
})
export const recruiterSignin = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  const existingRecruiter = await RecruiterModel.findOne({ email: email })
  if (!existingRecruiter) {
    next("please log in with a registered email")
  }
  // const passwordStrength = zxcvbn(password);
  // if (passwordStrength.score < 3) {
  //   next('Password is not strong enough. Please choose a stronger password.');
  // }
  if (existingRecruiter) {

    if (bcrypt.compareSync(password, existingRecruiter.password)) {
      res.json({
        _id: existingRecruiter._id,
        name: existingRecruiter.name,
        email: existingRecruiter.email,
        image: existingRecruiter.image,
        token: generateRecruiterToken(existingRecruiter)
      })
      return
    }
  }
})
export const postJob =  async (req: Request, res: Response) => {
  try {
    console.log();
    
    const {
      title,
      qualification,
      company,
      location,
      salary,
      description,
      shifts,
      benefits,
      count,
      workPlace,
      jobType,
      requirements
    } = req.body;
    const recruiter = req.recruiter
    

    // Create a new job instance
    const newJob = new JobModel({
      title,
      qualification,
      companyName:company,
      location,
      salary,
      description,
      shifts,
      benefits,
      workPlace,
      vaccancy:count,
      jobType,
      requirements,
      recruiterId:recruiter._id,
    });

    // Save the job to the database
    await newJob.save();

    res.json({ message: 'Job posted successfully' });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const fetchJob = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recruiterId = req.recruiter._id;
    const jobs = await JobModel.find({ recruiterId });
    console.log(jobs);
    
    res.json(jobs);

  } catch (error) {
    next(error); // Pass the error to Express error handling middleware
  }
});
