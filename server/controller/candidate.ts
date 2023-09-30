import express,{NextFunction, Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import { generateUserToken } from '../Utils/utils'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import { JobModel } from '../models/jobModel'
import otpGenerator from 'otp-generator'
import zxcvbn from 'zxcvbn';
import { sendEmail } from '../Utils/nodeMailer'






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


      export const getJobs = async (req: Request, res: Response ,next:NextFunction) => {
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
      
export const verifyUser = async (req: Request, res: Response,next:NextFunction) => {
  try {
      
      const { email } = req.method == "GET" ? req.query : req.body;
        console.log(email);
  
      // check the user existance
      let exist = await UserModel.findOne({ email:email });
      console.log(exist);
      if(exist){
       req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
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
            res.status(200).json({ message: "Email sent Successfully" ,info})
         
        }
      });
    
  
      
    
  }
      else{
        return res.status(200).json({ error : "Can't find User!"})
      }

  } catch (error) {
      return res.status(404).send({ error: "Authentication Error"});
  }
}



      export const  generateOTP =  asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
        req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false})
        res.status(201).send({ code: req.app.locals.OTP })
    })

    export const verifyOTP =  (req: Request, res: Response, next: NextFunction) => {
      const { code } = req.query;
      if (parseInt(req.app.locals.OTP as string, 10) === parseInt(code as string, 10)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(201).send({ msg: 'Verify Successfully!'});
      }
      return res.status(400).send({ error: "Invalid OTP" });
    };

    export async function resetPassword(req,res){
      try {
          
          if(!req.app.locals.resetSession) return res.status(440).send({error : "Session expired!"});
  
          const { username, password } = req.body;
  
          try {
              
              UserModel.findOne({ username})
                  .then(user => {
                      bcrypt.hash(password, 10)
                          .then(hashedPassword => {
                              UserModel.updateOne({ username : user.id },
                              { password: hashedPassword}, function(err, data){
                                  if(err) throw err;
                                  req.app.locals.resetSession = false; // reset session
                                  return res.status(201).send({ msg : "Record Updated...!"})
                              });
                          })
                          .catch( e => {
                              return res.status(500).send({
                                  error : "Enable to hashed password"
                              })
                          })
                  })
                  .catch(error => {
                      return res.status(404).send({ error : "Username not Found"});
                  })
  
          } catch (error) {
              return res.status(500).send({ error })
          }
  
      } catch (error) {
          return res.status(401).send({ error })
      }
  }
  



      


    