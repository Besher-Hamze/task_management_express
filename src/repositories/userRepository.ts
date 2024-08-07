import User from '../models/userModel';
import { User as UserType } from '../types/userTypes';
import mongoose from 'mongoose';
class UserRepository {
  async findUserByUsername(username: string): Promise<UserType | null> {
    return User.findOne({ username });
  }

  async createUser(user: UserType): Promise<UserType> {
    return User.create(user);
  }
  async findUserById(id: string): Promise<UserType | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return User.findById({_id:objectId});
  }
  async findAllUser(): Promise<UserType[] > {
    return User.find();
  }
}

export default new UserRepository();
