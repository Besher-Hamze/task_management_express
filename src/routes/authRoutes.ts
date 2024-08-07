import { Router } from 'express';
import { register, login, getUsers, getUserById} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUser', getUsers);
router.post('/id', getUserById);

export default router;
