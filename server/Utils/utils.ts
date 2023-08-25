import jwt from "jsonwebtoken"
import { User } from "../models/userModel"
import { Admin } from "../models/adminSchema"
import {Recruiter} from '../models/recruiterSchema'



export const generateUserToken = (user:User) =>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        
    },
        process.env.JWT_SECRET_KEY || "SOMETHING SECRET",{
            expiresIn:'30d',
        
    })
}

export const generateAdminToken = (admin:Admin) =>{
    return jwt.sign({
        _id:admin._id,
        name:admin.name,
        email:admin.email,
       
    },
        process.env.JWT_SECRET_KEY || "SOMETHING SECRET",{
            expiresIn:'30d',
        
    })
}

export const generateRecruiterToken = (recruiter:Recruiter) =>{
    return jwt.sign({
        _id:recruiter._id,
        name:recruiter.name,
        email:recruiter.email,
       
    },
        process.env.JWT_SECRET_KEY || "SOMETHING SECRET",{
            expiresIn:'30d',
        
    })
}