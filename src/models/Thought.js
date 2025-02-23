import { Schema, model } from 'mongoose';
import ReactionSchema from './Reaction.js';
import { format } from 'date-fns';

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

ThoughtSchema.virtual('formattedDate').get(function() {
    return format(this.createdAt, 'MMMM do, yyyy [at] hh:mma');
});

const Thought = model('thought', ThoughtSchema);

export default Thought;