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
      const body = req.body;

      // update the data
      const updatedData = await UserModel.updateOne({ _id: _id }, body);

      if (updatedData) {
        return res.status(201).send({ msg: "Record Updated...!" });
      } else {
        return res.status(500).send({ error: "Failed to update record...!" });
      }
    } else {
      return res.status(401).send({ error: "User Not Found...!" });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
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
          bcrypt.hash(password, 10)
            .then(hashedPassword => {
              UserModel.updateOne({ username: user.id },
                { password: hashedPassword }).then(() => {
                  req.app.locals.resetSession = false; // Reset session
                  return res.status(201).send({ message: "Record Updated...!" });
                });
            })
            .catch(e => {
              return res.status(500).send({
                message: "Enable to hashed password"
              })
            })
        })
        .catch(error => {
          return res.status(404).send({ message: "email not Found" });
        })

    } catch (error) {
      return res.status(500).send({ message: "server errror" })
    }
  } catch (error) {
    return res.status(401).send({ error })
  }
}

export const applyJob = async(req: Request, res: Response, next: NextFunction)=>{
  try {
    console.log("inside apply job");
    console.log(req.body);
    
    const { jobId } = req.body;
    const  userId  = req.user;
    const {_id}= userId;
   await JobModel.findByIdAndUpdate(jobId, { $addToSet: { applicants: _id } })
    .then(updatedJob => {
      if (updatedJob) {
        console.log(`User ${userId.name} added as an applicant to job ${jobId}`);
      } else {
        console.log(`Job with ID ${jobId} not found`);
      }
    })
    .catch(error => {
      console.error(error);
    });
    

    return res.json({ message: 'Application submitted successfully' });
  } catch (error) {
    next(error); // Pass the error to Express error handling middleware
  }
}


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
      // token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};