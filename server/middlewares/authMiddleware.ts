// middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
  }
  

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey') as UserPayload; // Replace with your actual secret key
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};
