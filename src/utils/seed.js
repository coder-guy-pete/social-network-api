import mongoose from 'mongoose';
import { User, Thought } from '../models/index.js';
import connection from '../config/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});

        const usersData = [
            { username: 'testUser1', email: 'testemail@email.com' },
            { username: 'testUser2', email: 'anotheremail@email.com' },
            { username: 'john_doe', email: 'john.doe@gmail.com' },
            { username: 'jane_smith', email: 'jane.smith@gmail.com' },
            { username: 'alice_wonder', email: 'alice@example.com' },
            { username: 'bob_builder', email: 'bob@example.com' },
        ];

        const createdUsers = await User.insertMany(usersData);

        const thoughtsData = [
            { thoughtText: 'This is a test thought', username: createdUsers[0].username },
            { thoughtText: 'This is another test thought', username: createdUsers[1].username },
            { thoughtText: 'This is a thought by John Doe', username: createdUsers[2].username },
            { thoughtText: 'This is a thought by Jane Smith', username: createdUsers[3].username },
            { thoughtText: 'Alice is thinking', username: createdUsers[4].username },
            { thoughtText: 'Bob is building', username: createdUsers[5].username },
        ];

        const createdThoughts = await Thought.insertMany(thoughtsData);

        // Add friends and thoughts to testUser1
        await User.findByIdAndUpdate(createdUsers[0]._id, {
            $push: {
                thoughts: createdThoughts[0]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[0]._id, {
            $push: {
                friends: createdUsers[1]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[0]._id, {
            $push: {
                friends: createdUsers[2]._id,
            },
        });

        // Add friends and thoughts to testUser2
        await User.findByIdAndUpdate(createdUsers[1]._id, {
            $push: {
                thoughts: createdThoughts[1]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[1]._id, {
            $push: {
                friends: createdUsers[0]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[1]._id, {
            $push: {
                friends: createdUsers[3]._id,
            },
        });

        // Add friends and thoughts to john_doe
        await User.findByIdAndUpdate(createdUsers[2]._id, {
            $push: {
                thoughts: createdThoughts[2]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[2]._id, {
            $push: {
                friends: createdUsers[3]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[2]._id, {
            $push: {
                friends: createdUsers[4]._id,
            },
        });

        // Add friends and thoughts to jane_smith
        await User.findByIdAndUpdate(createdUsers[3]._id, {
            $push: {
                thoughts: createdThoughts[3]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[3]._id, {
            $push: {
                friends: createdUsers[2]._id,
            },
        });
        await User.findByIdAndUpdate(createdUsers[3]._id, {
            $push: {
                friends: createdUsers[5]._id,
            },
        });

        // Add thoughts to alice
        await User.findByIdAndUpdate(createdUsers[4]._id, {
            $push: {
                thoughts: createdThoughts[4]._id,
            },
        });

        // Add thoughts to bob
        await User.findByIdAndUpdate(createdUsers[5]._id, {
            $push: {
                thoughts: createdThoughts[5]._id,
            },
        });

        console.log('Database successfully seeded!');
        mongoose.disconnect();
    } catch (err) {
        console.error(err);
        mongoose.disconnect();
    }
};

mongoose.connection.once('open', async () => {
    await seedUsers();
});

mongoose.connection.on('error', err => {
    console.error(err);
});