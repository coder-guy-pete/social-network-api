import { Router } from 'express';
const router = Router();
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction } from '../../controllers/thoughtController.js';
import { add } from 'date-fns/fp';

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions').post(addReaction);

export default router;