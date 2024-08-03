import { Request, Response, NextFunction } from 'express';
import { expressjwt } from 'express-jwt';

// Middleware function to validate JWT
const jwtValidation = expressjwt({
  secret: process.env.JWT_SECRET || 'd3b07384d113edec49eaa6238ad5ff00b204e9800998ecf8427e',
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

export { jwtValidation, jwtErrorHandler };
