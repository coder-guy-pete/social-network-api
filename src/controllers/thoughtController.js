import { Thought } from '../models/index.js';

export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
};