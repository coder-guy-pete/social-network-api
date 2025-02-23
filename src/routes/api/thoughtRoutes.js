import { Router } from 'express';
const router = Router();
import { getThoughts, getThoughtById, createThought, updateThought } from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought);

export default router;