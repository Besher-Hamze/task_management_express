import { Request, Response } from 'express';
import userService from '../services/userService';
import { User as UserType } from '../types/userTypes';
import { generateTokens } from '../middleware/jwtMiddleware'
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
