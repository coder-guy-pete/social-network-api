import { Schema, ObjectId } from 'mongoose';
import { format } from 'date-fns';

const ReactionSchema = new Schema({
    reactionId: {
        default: new ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ReactionSchema.virtual('formattedDate').get(function() {
    return format(this.createdAt, 'MMMM do, yyyy [at] hh:mma');
});

export default ReactionSchema;