import { Router } from 'express';
import { getAllTasks, createTask, getTaskById } from '../controllers/taskController';

const router = Router();
router.get('/',getAllTasks);
router.post('/', createTask);
router.post('/byId', getTaskById);


export default router;
