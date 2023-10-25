// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ENV from '../Utils/config'

interface UserPayload {
    _id: string;
    name: string;
    email: string;
    token: string;
  }
interface RecruiterPayload {
    _id: string;
    name: string;
    email: string;
    token: string;
  }
  

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];
 
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY ) as UserPayload; // Replace with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};



export const recruiterMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];
 
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY ) as RecruiterPayload; // Replace with your actual secret key
    req.recruiter = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};


export function localVariables(req:Request, res:Response, next:NextFunction){
  req.app.locals = {
      OTP : null,
      resetSession : false
  }
  next()}




/** auth middleware */
// export default async function Auth(req:Request, res:Response, next:NextFunction){
//     try {
        
//         // access authorize header to validate request
//         const token = req.headers.authorization.split(" ")[1];

//         // retrive the user details fo the logged in user
//         const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);

//         req.user = decodedToken;

//         next()

//     } catch (error) {
//         res.status(401).json({ error : "Authentication Failed!"})
//     }
// }


export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization?.split(' ')[1];
 
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY ) as RecruiterPayload; // Replace with your actual secret key
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};