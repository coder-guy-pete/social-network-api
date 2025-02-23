import { Router } from 'express';
const router = Router();

import { getUsers } from '../../controllers/userController.js';

router.route('/').get(getUsers);

export default router;