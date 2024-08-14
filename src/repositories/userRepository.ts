import User from '../models/userModel';
import { User as UserType } from '../types/userTypes';
import mongoose from 'mongoose';
import userService from '../services/userService';
import bcrypt from 'bcryptjs';
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
  async updateUser(id: string, userData: Partial<UserType>): Promise<UserType | null> {
    try {
      const objectId = new mongoose.Types.ObjectId(id);
      const hashedPassword = await bcrypt.hash(userData.password!, 10);
      const updateduserData = await User.findByIdAndUpdate(objectId, {...userData,password:hashedPassword}, { new: true }).exec();
      return updateduserData;
    } catch (error) {
      console.error(`Error updating department by ID: ${error}`);
      return null;
    }
  }
}

export default new UserRepository();
