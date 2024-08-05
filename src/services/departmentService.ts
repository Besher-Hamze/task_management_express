// services/departmentService.ts
import departmentRepository from '../repositories/departmentRepository';
import { Department } from '../types/departmentType';

class DepartmentService {
  async getAllDepartments(): Promise<Department[]> {
    return departmentRepository.getAllDepartments();
  }

  async getDepartmentById(id: string): Promise<Department | null> {
    return departmentRepository.getDepartmentById(id);
  }

  async createDepartment(department: Department): Promise<Department> {
    return departmentRepository.createDepartment(department);
  }

  async updateDepartment(id: string, department: Partial<Department>): Promise<Department | null> {
    return await departmentRepository.updateDepartment(id, department);
  }


  async deleteDepartment(id: string): Promise<Department | null> {
    return departmentRepository.deleteDepartment(id);
  }
}

export default new DepartmentService();
