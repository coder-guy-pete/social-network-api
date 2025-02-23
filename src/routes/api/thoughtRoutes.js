import { Router } from 'express';
const router = Router();
import { getThoughts, getThoughtById } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById);

export default router;