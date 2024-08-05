import mongoose, { Model, Types } from "mongoose";
import { Department } from "../types/departmentType";
import departmentModel from "../models/departmentModel";

class DepartmentRepository {
  
  
    async getAllDepartments(): Promise<Department[]> {
      return departmentModel.find().exec();
    }
  
    async getDepartmentById(id: string): Promise<Department | null> {
        const objectId =new mongoose.Types.ObjectId(id);
      return departmentModel.findById({_id:objectId});
    }
  
    async createDepartment(department: Department): Promise<Department> {
      return departmentModel.create(department);
    }
  
    async updateDepartment(id: string, department: Partial<Department>): Promise<Department | null> {
        try {
          const objectId = new Types.ObjectId(id);
          const updatedDepartment = await departmentModel.findByIdAndUpdate(objectId, department, { new: true }).exec();
          return updatedDepartment;
        } catch (error) {
          console.error(`Error updating department by ID: ${error}`);
          return null;
        }
      }
    
    
  
    async deleteDepartment(id: string): Promise<Department | null> {
        const objectId =new Types.ObjectId(id);
        return departmentModel.findByIdAndDelete(objectId).exec();
    }
  }
  
  export default new DepartmentRepository();
