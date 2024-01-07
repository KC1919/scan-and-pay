import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'User name must be provided'],
        },
        email: {
            type: String,
            required: [true, 'User email must be provided'],
            unique: true,
        },
        phone: {
            type: Number,
            minLength: 10,
            maxLength: 10,
            required: [true, 'User Mobile number must be provided'],
        },
        password: {
            type: String,
            minLength: 8,
            required: [true, 'User password must be provided'],
        },
        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
