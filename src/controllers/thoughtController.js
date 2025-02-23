import { Thought } from '../models/index.js';

export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};