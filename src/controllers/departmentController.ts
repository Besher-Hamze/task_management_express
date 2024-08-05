// controllers/departmentController.ts
import { Request, Response } from 'express';
import departmentService from '../services/departmentService';
import { Department } from '../types/departmentType';

export const getAllDepartments = async (request: Request, reply: Response) => {
  try {
    const departments = await departmentService.getAllDepartments();
    reply.send(departments);
  } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};

export const createDepartment = async (request: Request, reply: Response) => {
  const { name, description, departmentRole, parentDepartment } = request.body as Department;
  try {
    const newDepartment = await departmentService.createDepartment({
      name,
      description,
      departmentRole,
      parentDepartment
    });
    reply.status(201).send(newDepartment);
  } catch (err: any) {
    reply.status(400).send({ message: err.message });
  }
};

export const getDepartmentById = async (request: Request, reply: Response) => {
  const { id } = request.body as { id: string };
  try {
    const department = await departmentService.getDepartmentById(id);
    if (!department) {
      reply.status(404).send({ message: 'Department not found' });
      return;
    }
    reply.send(department);
  } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};

export const updateDepartment = async (request: Request, reply: Response) => {
  const { id, ...departmentData } = request.body as { id: string } & Partial<Department>;
  try {
    const updatedDepartment = await departmentService.updateDepartment(id, departmentData);
    if (!updatedDepartment) {
      reply.status(404).send({ message: 'Department not found' });
      return;
    }
    reply.send(updatedDepartment);
  } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};
export const deleteDepartment = async (request: Request, reply: Response) => {
  const { id } = request.body as { id: string };
  try {
    const department = await departmentService.deleteDepartment(id);
    if (!department) {
      reply.status(404).send({ message: 'Department not found' });
      return;
    }
    reply.send({ message: 'Department deleted' });
  } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};
