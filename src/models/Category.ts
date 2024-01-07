import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name must be provided'],
        },
    },
    { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
