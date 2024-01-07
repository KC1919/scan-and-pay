import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name must be provided'],
    },
    phone: {
        type: Number,
        minLength: 10,
        maxLength: 10,
        required: [true, 'User Mobile number must be provided'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
