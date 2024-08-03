import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import 'dotenv/config' ;
// Middleware function to validate JWT
const jwtValidation = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
  credentialsRequired: true,
}).unless({
    path: ['/api/auth/login', '/api/auth/register'], // Exclude these routes from JWT validation 
});

// Error handler for unauthorized access
const jwtErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Token expired or invalid' });
  }
  next(err);
};


// Generate JWT tokens
const accessTokenSecret = process.env.JWT_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

const generateTokens = (user: any) => {
  const accessToken = jwt.sign({ id: user._id, username: user.username }, accessTokenSecret, { expiresIn: process.env.ExpiredAccessTokenTimeout});
  const refreshToken = jwt.sign({ id: user._id }, refreshTokenSecret, { expiresIn: process.env.ExpiredRefreshTokenTimeout });
  return { accessToken, refreshToken };
};

export { jwtValidation, jwtErrorHandler,generateTokens};
