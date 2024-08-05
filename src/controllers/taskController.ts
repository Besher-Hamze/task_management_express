import { Request, Response } from 'express';
import taskService from '../services/taskService';
import { Task as TaskType } from '../types/taskTypes';

export const getAllTasks = async (request: Request, reply: Response) => {
  try {
    const tasks = await taskService.getAllTasks();
    reply.send(tasks);
  } catch (err : any) {
    reply.status(500).send({ message: err.message });
  }
};

export const createTask = async (request: Request, reply: Response) => {
  const { title, description, status, name } = request.body as TaskType;
  try {
    const newTask = await taskService.createTask({ title, description, status,name });
    reply.status(201).send(newTask);
  } catch (err : any) {
    reply.status(400).send({ message: err.message });
  }
};

export const getTaskById = async (request: Request, reply: Response) => {
  const { id } = request.body as { id: string };
  try {
    console.log(id);
    const task = await taskService.getTaskById(id);
    if (!task) {
      reply.status(404).send({ message: 'Task not found' });
      return;
    }
    reply.send(task);
  } catch (err : any) {
    reply.status(500).send({ message: err.message });
  }
};

export const updateTask = async (request: Request, reply: Response) => {
  const { id } = request.params as { id: string };
  const task = request.body as Partial<TaskType>;
  try {
    const updatedTask = await taskService.updateTask(id, task);
    if (!updatedTask) {
      reply.status(404).send({ message: 'Task not found' });
      return;
    }
    reply.send(updatedTask);
  } catch (err : any) {
    reply.status(500).send({ message: err.message });
  }
};

export const deleteTask = async (request: Request, reply: Response) => {
  const { id } = request.params as { id: string };
  try {
    const task = await taskService.deleteTask(id);
    if (!task) {
      reply.status(404).send({ message: 'Task not found' });
      return;
    }
    reply.send({ message: 'Task deleted' });
  } catch (err: any) {
    reply.status(500).send({ message: err.message });
  }
};
