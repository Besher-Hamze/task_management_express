import { Request, Response } from 'express';
import userService from '../services/userService';
import { User as UserType } from '../types/userTypes';
import { generateTokens } from '../middleware/jwtMiddleware'
import jwt from 'jsonwebtoken';
export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body as UserType;
  try {
    const newUser = await userService.register({ username, password });
    res.status(201).send({ message: 'User registered', user: newUser });
  } catch (err: any) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

export const login = async (request: Request, reply: Response) => {
  const { username, password } = request.body as UserType;
  try {
    const user = await userService.login(username, password);
    if (!user) {
      reply.status(401).send({ message: 'Invalid credentials' });
      return;
    }
    const { accessToken, refreshToken } = await generateTokens(user);
    reply.json({ accessToken, refreshToken });
  } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};
export const getUsers = async (request: Request, reply: Response) => {
  try {
    const users = await userService.getAllUser();
    reply.status(200).send({users:users});
    } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};
export const getUserById = async (request: Request, reply: Response) => {
  const { id } = request.body ;
  try {
    const users = await userService.findById(id);
    reply.status(200).send({users:users});
    } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};
// export const refreshToken = async (req: Request, res: Response) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) {
//     return res.status(401).json({ message: 'Refresh token required' });
//   }

//   try {
//     // Verify refresh token
//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, async (err: any, user: any) => {
//       if (err) return res.status(403).json({ message: 'Invalid refresh token' });

//       // Find user and check if the token matches
//       const dbUser = await User.findById(user.id);
//       if (!dbUser || dbUser.refreshToken !== refreshToken) {
//         return res.status(403).json({ message: 'Invalid refresh token' });
//       }

//       // Generate new access token
//       const newAccessToken = jwt.sign({ id: dbUser._id, username: dbUser.username }, accessTokenSecret, { expiresIn: '15m' });
//       res.json({ accessToken: newAccessToken });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error refreshing token', error: err.message });
//   }
// };
