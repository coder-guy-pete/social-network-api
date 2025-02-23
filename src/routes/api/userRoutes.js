import { Router } from 'express';
const router = Router();
import { getUsers, getUserById } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers);

// /api/users/:id
router.route('/:id').get(getUserById);

export default router;