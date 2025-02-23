import { Router } from 'express';
const router = Router();
import { getThoughts } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts);

export default router;