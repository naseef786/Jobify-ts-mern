import express,{Request,Response} from 'express'
import asyncHandler from 'express-async-handler'
import { UserModel } from '../../models/userModel'

const userRouter = express.Router()


userRouter.post('signin',asyncHandler(async(req:Request,res:Response)=>{
const user = await UserModel.find({email:req.body.email})
}))