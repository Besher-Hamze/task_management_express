import { Types } from 'mongoose';
import Task from '../models/taskModel';
import { Task as TaskType } from '../types/taskTypes';
import mongoose from 'mongoose';
class TaskRepository {
  async getAllTasks(): Promise<TaskType[]> {
    return Task.find().select('title description status name');
  }

  async createTask(task: TaskType): Promise<TaskType> {
    return Task.create(task);
  }

  async getTaskById(id: string): Promise<TaskType | null> {
    const objectId=new mongoose.Types.ObjectId(id);
    return Task.findById({_id:objectId});
  }

  async updateTask(id: string, task: Partial<TaskType>): Promise<TaskType | null> {
    return Task.findByIdAndUpdate(id, task, { new: true });
  }

  async deleteTask(id: string): Promise<TaskType | null> {
    return Task.findByIdAndDelete(id);
  }
}

export default new TaskRepository();
