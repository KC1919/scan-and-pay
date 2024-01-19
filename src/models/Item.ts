import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
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
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
