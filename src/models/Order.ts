import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        table: {
            type: Number,
        },
        payment_method: {
            type: String,
            default: 'cash',
        },
        payment_time: {
            type: Date,
        },
        order: [
            {
                product_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 0,
                },
                amount: {
                    type: Number,
                    required: true,
                    default: 0,
                },
            },
        ],
        deletedAt: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
