import { Schema, model } from 'mongoose';

const validateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
    },
    thoughts: [{
        type: ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: ObjectId,
        ref: 'User'
    }]
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends?.length;
});

const User = model('User', UserSchema);

export default User;