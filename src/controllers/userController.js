import mongoose from 'mongoose';
import { User, Thought } from '../models/index.js';

export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('thoughts')
            .populate('friends');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
};

export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const user = await User.create({ username, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userToDelete = await User.findById(req.params.id);

        if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' });
        }

        await Thought.deleteMany({ username: userToDelete.username });
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: 'User and associated thoughts deleted successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
};

export const addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        const friend = await User.findById(req.params.friendId);

        if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
        }

        if (user.friends.includes(req.params.friendId)) {
            return res.status(400).json({ message: 'Friend is already in friend list' });
        }

        user.friends.push(req.params.friendId);
        await user.save();
        res.status(200).json({ message: 'Friend added successfully' });
    } catch (err) {
        res.status(400).json(err);
    }
};