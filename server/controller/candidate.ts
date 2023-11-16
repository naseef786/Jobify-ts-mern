import express, { NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import { generateUserToken } from '../Utils/utils'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { JobModel } from '../models/jobModel'
import otpGenerator from 'otp-generator'
import zxcvbn from 'zxcvbn';
import { sendEmail } from '../Utils/nodeMailer'
import mongoose from 'mongoose'
import { RecruiterModel } from '../models/recruiterSchema'
import { updateJob } from './recruiter'






export const candidateSignin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email) {
    next("provide an email")
  }
  if (!password) {
    next("please enter your password")
  }

  const user = await UserModel.findOne({ email: email })

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profileUrl:user.profileUrl,
        cvUrl:user.cvUrl,
        about:user.about,
        contact:user.contact,
        location:user.location,
        firstName:user.firstName,
        lastName:user.lastName,
        token: generateUserToken(user)
      })
      return
    }
  }
  res.status(401).json({ message: 'Invalid email or password' })

})
export const candidateSignup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body
  const existingEmail = await UserModel.findOne({ email: email })
  if (existingEmail) {
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
    token: generateUserToken(user),
  })
})
export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {


    console.log('inside get jobs');


    const jobs = await JobModel.find();



    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
export const searchJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.query);


    const searchTerm = req.query.search as string || '';

    let jobs;
    if (searchTerm === '') {
      jobs = await JobModel.find();
    } else {
      jobs = await JobModel.find({ title: { $regex: new RegExp(searchTerm, 'i') } });
    }
    console.log(jobs);

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
// export const getUser = asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
//  const {user} = req.params
//  try{
//   if(!user)  next("user not find")

//   UserModel.findOne({ user }, function(err, user){
//       if(err) return res.status(500).send({ err });
//       if(!user) next("user not find")

//       /** remove password from user */
//       // mongoose return unnecessary data with object so convert it into json
//       const { password, ...rest } = Object.assign({}, user.toJSON());

//       return res.status(201).send(rest);
//   })

//  }
//  catch (error) {
//   console.error('Error:', error);
//   res.status(500).json({ message: 'Server error' });
// }
// })
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;

    if (_id) {
      console.log(req.body);
      
      const { name,firstName,lastName,contact,jobTitle,cvUrl, location, profileUrl, about, } = req.body.newData;
      const updatedCandidate = {
        name,
        phone: contact,
        location,
        profileUrl,
        cvUrl,
        firstName:firstName,
        lastName:lastName,
        jobTitle,
        about,
        _id: _id,
      };
      // update the data
      const updatedData = await UserModel.findByIdAndUpdate(_id , updatedCandidate,{new:true});

      if (updatedData) {

        return res.status(201).json({ message: "Record Updated...!", success:true, data:updatedData });
      } else {
        return res.status(500).json({ error: "Failed to update record...!" });
      }
    } else {
      return res.status(401).json({ error: "User Not Found...!" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { email } = req.method == "GET" ? req.query : req.body;
    console.log(email);

    // check the user existance
    let exist = await UserModel.findOne({ email: email });
    console.log(exist);
    if (exist) {
      req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
      const OTP = req.app.locals.OTP

      const transporter = nodemailer.createTransport({
        service: process.env.NODEMAILER_SERVICE,
        auth: {
          user: process.env.NODEMAILER_AUTHER,
          pass: process.env.NODEMAILER_AUTHER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.NODEMAILER_AUTHER,
        to: email,
        subject: 'Email with QR code attachment',
        text: `OTP:- ${OTP}`
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error");
          res.status(400).json({ error: "email not send" })

        } else {
          console.log("Email sent");
          res.status(200).send({ message: "Email sent Successfully", info })

        }
      });




    }
    else {
      return res.status(400).send({ message: "Can't find User!" })
    }

  } catch (error) {
    return res.status(404).send({ message: "Authentication Error" });
  }
}
export const generateOTP = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
  res.status(201).send({ code: req.app.locals.OTP })
})
export const verifyOTP = (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body
  console.log("hello");
  console.log(code);

  if (parseInt(req.app.locals.OTP as string, 10) === parseInt(code as string, 10)) {
    req.app.locals.OTP = null; // reset the OTP value
    req.app.locals.resetSession = true; // start session for reset password
    return res.status(201).send({ message: 'Verify Successfully!' });
  }
  return res.status(400).send({ message: "Invalid OTP" });
};
export const resetPassword = (req: Request, res: Response) => {
  try {
    console.log("inside reset password");
    const email = req.body.email.email;
    const password = req.body.password
    console.log("email", email, "password", password);
    if (!req.app.locals.resetSession) return res.status(440).send({ message: "Session expired!" });
    try {
      UserModel.findOne({ email: email })
      .then(user => {
        if (user) {
          const hashedPassword = bcrypt.hashSync(password);
          UserModel.updateOne({ _id: user.id }, { password: hashedPassword })
            .then(() => {
              req.app.locals.resetSession = false; // Reset session
              return res.status(201).send({ message: "Record Updated...!" });
            })
            .catch(e => {
              return res.status(500).send({ message: "Unable to update password" });
            });
        } else {
          return res.status(404).send({ message: "User not found" });
        }
      })
      .catch(e => {
        return res.status(500).send({ message: "Error finding user" });
      });
    
}catch(error){
  console.log(error);

}}
catch(error){
  console.log(error);
  
}

}
  
export const applyJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("inside apply job");
    console.log(req.body);

    const { jobId } = req.body;
    const userId =req.user._id;
    const applicantObjectId = new mongoose.Types.ObjectId(userId);
    enum ApplicationStatus {
      APPLIED = 'applied',
      SHORTLISTED = 'shortlisted',
      REJECTED = 'rejected',
      // Add more statuses as needed
    }

    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      { $push: { applicants:  [applicantObjectId],status: ApplicationStatus.APPLIED } },
      { new: true }
    );
     

    await UserModel.findByIdAndUpdate(userId, { $addToSet: { appliedJobs: jobId } }, { new: true });

    if (updatedJob) {
      console.log(`User ${userId} added as an applicant to job ${jobId}`);
      res.status(201).json({ message: 'Application submitted successfully' });
    } else {
      console.log(`Job with ID ${jobId} not found`);
      res.status(400).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error(error);
    next(error); // Pass the error to Express error handling middleware
  }
};


// Assume you have a route like '/updateApplicationStatus'
export const updateApplicationStatus = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { applicationId, newStatus } = req.body; // Assuming you receive applicationId and newStatus from the request body

    // Assuming you have a JobModel and the applications are stored in an array named 'applicants'
    const updatedJob = await JobModel.findOneAndUpdate(
      { 'applicants._id': applicationId }, // Assuming applicationId is a unique identifier for each application within the job
      { $set: { 'applicants.$.status': newStatus } }, // Updating the status of the specific application
      { new: true }
    );

    if (updatedJob) {
      res.status(200).json({ message: 'Application status updated successfully' });
    } else {
      res.status(404).json({ message: 'Application not found or update failed' });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAppliedJobsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user as { _id: string }; // Assuming req.user has a property _id
    const { _id } = userId;

    const user = await UserModel.findById(_id).exec();

    if (user) {
      const appliedJobs = user.appliedJobs;

      if (appliedJobs && appliedJobs.length > 0) {
        // Fetch job details for each applied job
        const jobsPromises = appliedJobs.map(async (jobId) => {
          return await JobModel.findById(jobId).exec();
        });

        const jobs = await Promise.all(jobsPromises);

        res.status(200).json(jobs);
      } else {
        res.status(200).json([]);
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, sort, location } = req.query;

    //conditons for searching filters
    const queryObject: any = {};

    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    let queryResult = RecruiterModel.find(queryObject).select("-password");

    // SORTING
    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("name");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-name");
    }

    // PADINATIONS
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // records count
    const total = await RecruiterModel.countDocuments(queryResult);
    const numOfPage = Math.ceil(total / limit);
    // move next page
    // queryResult = queryResult.skip(skip).limit(limit);

    // show mopre instead of moving to next page
    queryResult = queryResult.limit(limit * page);

    const companies = await queryResult;

    res.status(200).json({
      success: true,
      total,
      data: companies,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const update = async (req:Request, res:Response, next:NextFunction) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    location,
    profileUrl,
    jobTitle,
    about,
    token
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !contact || !jobTitle || !about) {
      next("Please provide all required fields");
    }

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send(`No User with id: ${id}`);
    }

    const updateUser = {
      firstName,
      lastName,
      email,
      contact,
      location,
      profileUrl,
      jobTitle,
      about,
      _id: id,
    };

    const user = await UserModel.findByIdAndUpdate(id, updateUser, { new: true });

    // const token = user.createJWT();

    user.password = undefined;

    res.status(200).json({
      sucess: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

