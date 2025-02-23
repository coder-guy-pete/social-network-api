import { Router } from 'express';
const router = Router();
import { getThoughts, getThoughtById, createThought } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById);

export default router;