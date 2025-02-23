import { Router } from 'express';
const router = Router();
import { getUsers, getUserById, createUser, updateUser } from '../../controllers/userController.js';

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getUserById).put(updateUser);

export default router;