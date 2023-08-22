import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId?: string;
  recruiterId?: string;
  adminId?: string;
  companyId?: string;
}

const jwtMiddlewareFactory = (
  tokenHeader: string,
  tokenProperty: keyof DecodedToken
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers[tokenHeader] as string; // Cast to string
    if (!token) {
      return res
        .status(401)
        .json({ status: 'failed', message: 'You need a token' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded: DecodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ auth: false, status: 'failed', message: 'Failed to authenticate' });
      }

      req[tokenProperty] = decoded[tokenProperty];
      next();
    });
  } catch (error) {
    next(error);
  }
};

const jwtSeeker = jwtMiddlewareFactory('user-access-token', 'userId');
const jwtRecruiter = jwtMiddlewareFactory('recruiter-access-token', 'recruiterId');
const jwtAdmin = jwtMiddlewareFactory('admin-access-token', 'adminId');
const jwtCompany = jwtMiddlewareFactory('company-access-token', 'companyId');

export default {
  jwtSeeker,
  jwtRecruiter,
  jwtAdmin,
  jwtCompany,
};
