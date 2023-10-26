import { Recruiter, RecruiterModel } from "../models/recruiterSchema";
import bcrypt from 'bcryptjs'
import { generateRecruiterToken } from "../Utils/utils";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { JobModel } from "../models/jobModel";
import mongoose from "mongoose";
import { UserModel } from "../models/userModel";

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
export const postJob = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

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

    const recruiter = req.recruiter;
    const _id = recruiter._id;

    // Create a new job instance
    const newJob = new JobModel({
      title,
      qualification,
      companyName: company,
      location,
      salary,
      description,
      shifts,
      benefits,
      workPlace,
      vaccancy: count,
      jobType,
      requirements,
      recruiterId: recruiter._id,
    });

    // Save the job to the database
    await newJob.save();

    // Update the recruiter's jobposts field
    const updatedRecruiter = await RecruiterModel.findByIdAndUpdate(
      recruiter._id,
      { $addToSet: { jobposts: newJob._id } },
      { new: true }
    );

    res.json({ message: 'Job posted successfully' });
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}


export const fetchJob = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recruiterId = req.recruiter._id;
    const recruiter = RecruiterModel.findById(recruiterId)
    const jobs = await JobModel.find({ recruiterId: (await recruiter).id });
    console.log(jobs);

    res.json(jobs);

  } catch (error) {
    next(error); // Pass the error to Express error handling middleware
  }
});

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;
    const { jobId } = req.params;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !desc ||
      !requirements
    ) {
      next("Please Provide All Required Fields");
      return;
    }
    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      _id: jobId,
    };

    await JobModel.findByIdAndUpdate(jobId, jobPost, { new: true });

    res.status(200).json({
      success: true,
      message: "Job Post Updated SUccessfully",
      jobPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


export const deleteJobPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    await JobModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      messsage: "Job Post Delted Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const job = await JobModel.findById({ _id: id }).populate({
      path: "company",
      select: "-password",
    });

    if (!job) {
      return res.status(200).send({
        message: "Job Post Not Found",
        success: false,
      });
    }

    //GET SIMILAR JOB POST
    const searchQuery = {
      $or: [
        { jobTitle: { $regex: job?.title, $options: "i" } },
        { jobType: { $regex: job?.jobType, $options: "i" } },
      ],
    };

    let queryResult = JobModel.find(searchQuery)
      .populate({
        path: "company",
        select: "-password",
      })
      .sort({ _id: -1 });

    queryResult = queryResult.limit(6);
    const similarJobs = await queryResult;

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCandidates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recruiterId = req.recruiter._id;
    const recruiter = await RecruiterModel.findById(recruiterId);
    
    const job = await JobModel.find({ recruiterId: recruiter.id });
    
    if (job.length === 0) {
      return res.status(200).send({
        message: "Job Post Not Found",
        success: false,
      });
    }

    const users = await Promise.all(
      job.map(async (jobPost) => {
        if (jobPost.applicants) {
          const user = await UserModel.findById(jobPost.applicants).exec();
          let userids = []
          if(user?.id){
            userids.push(user)
          }
          return userids;
        }
        return null; // or handle the case where applicants is not defined
      })
    );
    

    if (users.length === 0) {
      return res.status(200).json({ message: "No applicants" });
    } else {
      return res.status(200).json(users);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


// export const getJobPosts = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { search, sort, location, jtype, exp } = req.query;
//     const types = jtype?.split(","); //full-time,part-time
//     const experience = exp?.split("-"); //2-6

//     let queryObject = {};

//     if (location) {
//       queryObject.location = { $regex: location, $options: "i" };
//     }

//     if (jtype) {
//       queryObject.jobType = { $in: types };
//     }

//     //    [2. 6]

//     if (exp) {
//       queryObject.experience = {
//         $gte: Number(experience[0]) - 1,
//         $lte: Number(experience[1]) + 1,
//       };
//     }

//     if (search) {
//       const searchQuery = {
//         $or: [
//           { jobTitle: { $regex: search, $options: "i" } },
//           { jobType: { $regex: search, $options: "i" } },
//         ],
//       };
//       queryObject = { ...queryObject, ...searchQuery };
//     }

//     let queryResult = JobModel.find(queryObject).populate({
//       path: "company",
//       select: "-password",
//     });

//     // SORTING
//     if (sort === "Newest") {
//       queryResult = queryResult.sort("-createdAt");
//     }
//     if (sort === "Oldest") {
//       queryResult = queryResult.sort("createdAt");
//     }
//     if (sort === "A-Z") {
//       queryResult = queryResult.sort("jobTitle");
//     }
//     if (sort === "Z-A") {
//       queryResult = queryResult.sort("-jobTitle");
//     }

//     // pagination
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 20;
//     const skip = (page - 1) * limit;

//     //records count
//     const totalJobs = await JobModel.countDocuments(queryResult);
//     const numOfPage = Math.ceil(totalJobs / limit);

//     queryResult = queryResult.limit(limit * page);

//     const jobs = await queryResult;

//     res.status(200).json({
//       success: true,
//       totalJobs,
//       data: jobs,
//       page,
//       numOfPage,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

// export const updateCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
//   const { name, contact, location, profileUrl, about } = req.body;
// const id =req.body.id
//   try {
//     // validation
//     if (!name || !location || !about || !contact || !profileUrl) {
//       next("Please Provide All Required Fields");
//       return;
//     }

//     const recruiter = req.recruiter;



//     const updateCompany = {
//       name,
//       contact,
//       location,
//       profileUrl,
//       about,
//       _id: id,
//     };

//     const company = await RecruiterModel.findByIdAndUpdate(id, updateCompany, {
//       new: true,
//     });

//     // const token = company.createJWT();

//     company.password = undefined;

//     res.status(200).json({
//       success: true,
//       message: "Company Profile Updated SUccessfully",
//       company,
//       // token,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getCompanyProfile = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const id = req.body.user.userId;

//     const recruiter = await RecruiterModel.findById({ _id: id });

//     if (!recruiter) {
//       return res.status(200).send({
//         message: "Company Not Found",
//         success: false,
//       });
//     }

//     recruiter.password = undefined;
//     res.status(200).json({
//       success: true,
//       data: recruiter,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { search, sort, location } = req.query;

//     //conditons for searching filters
//     const queryObject = {name:String};

//     if (search) {
//       queryObject.name = { $regex: search, $options: "i" };
//     }

//     if (location) {
//       queryObject.location = { $regex: location, $options: "i" };
//     }

//     let queryResult = Companies.find(queryObject).select("-password");

//     // SORTING
//     if (sort === "Newest") {
//       queryResult = queryResult.sort("-createdAt");
//     }
//     if (sort === "Oldest") {
//       queryResult = queryResult.sort("createdAt");
//     }
//     if (sort === "A-Z") {
//       queryResult = queryResult.sort("name");
//     }
//     if (sort === "Z-A") {
//       queryResult = queryResult.sort("-name");
//     }

//     // PADINATIONS
//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 20;

//     const skip = (page - 1) * limit;

//     // records count
//     const total = await Companies.countDocuments(queryResult);
//     const numOfPage = Math.ceil(total / limit);
//     // move next page
//     // queryResult = queryResult.skip(skip).limit(limit);

//     // show mopre instead of moving to next page
//     queryResult = queryResult.limit(limit * page);

//     const companies = await queryResult;

//     res.status(200).json({
//       success: true,
//       total,
//       data: companies,
//       page,
//       numOfPage,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };



// export const getCompanyJobListing = async (req: Request, res: Response, next: NextFunction) => {
//   const { search, sort } = req.query;
//   const id = req.body.user.userId;

//   try {
//     //conditons for searching filters
//     const queryObject = {};

//     if (search) {
//       queryObject.location = { $regex: search, $options: "i" };
//     }

//     let sorting;
//     //sorting || another way
//     if (sort === "Newest") {
//       sorting = "-createdAt";
//     }
//     if (sort === "Oldest") {
//       sorting = "createdAt";
//     }
//     if (sort === "A-Z") {
//       sorting = "name";
//     }
//     if (sort === "Z-A") {
//       sorting = "-name";
//     }

//     let queryResult = await Companies.findById({ _id: id }).populate({
//       path: "jobPosts",
//       options: { sort: sorting },
//     });
//     const companies = await queryResult;

//     res.status(200).json({
//       success: true,
//       companies,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getCompanyById = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { id } = req.params;

//     const company = await Companies.findById({ _id: id }).populate({
//       path: "jobPosts",
//       options: {
//         sort: "-_id",
//       },
//     });

//     if (!company) {
//       return res.status(200).send({
//         message: "Company Not Found",
//         success: false,
//       });
//     }

//     company.password = undefined;

//     res.status(200).json({
//       success: true,
//       data: company,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(404).json({ message: error.message });
//   }
// };