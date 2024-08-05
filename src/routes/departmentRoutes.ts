// routes/departmentRoutes.ts
import { Router } from 'express';
import {
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from '../controllers/departmentController';

const router = Router();

router.get('/get-all-departments', getAllDepartments);
router.post('/create-department', createDepartment);
router.post('/get-department-by-id', getDepartmentById);
router.post('/update-department', updateDepartment);
router.post('/delete-department', deleteDepartment);

export default router;
