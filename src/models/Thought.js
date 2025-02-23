import { Schema, model } from 'mongoose';
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
    reactions: [reactionSchema]
});

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

ThoughtSchema.virtual('formattedDate').get(function() {
    return format(this.createdAt, 'MMMM do, yyyy [at] hh:mma');
});

const Thought = model('Thought', ThoughtSchema);

export default Thought;