import { Router } from 'express';
const router = Router();
import { getUsers, getUserById, createUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById);

export default router;