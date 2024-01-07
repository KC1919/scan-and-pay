import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name must be provided'],
        },
        quantity: {
            type: String,
            required: [true, 'Product quantity must be provided'],
            default: 0,
        },
        category: {
            type: String,
            required: [true, 'Product category must be provided'],
            default: 'continental',
        },
        cost_price: {
            type: Number,
            required: [true, 'Product cost price must be provided'],
            default: 0,
        },
        sell_price: {
            type: Number,
            required: [true, 'Product sell price must be provided'],
            default: 0,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
