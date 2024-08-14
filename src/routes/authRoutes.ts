import { Router } from 'express';
import { register, login, getUsers, getUserById, updateUser} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUser', getUsers);
router.post('/id', getUserById);
router.post('/update-user', updateUser);

export default router;
