import express,{Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { User, UserModel } from '../models/userModel'
import { generateToken } from '../Utils/utils'
import bcrypt from 'bcryptjs'

export const candidateSignin = asyncHandler(async(req:Request,res:Response)=>{
    const user = await UserModel.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)
            })
            return
        }
    }
    res.status(401).json({message:'Invalid email or password'})
    
    })

    export const candidateSignup =    asyncHandler(async (req: Request, res: Response) => {
        const user = await UserModel.create({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password),
        } as User)
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
      })

      module.exports = {
        candidateSignin,
        candidateSignup
      }