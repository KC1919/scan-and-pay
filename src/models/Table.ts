import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    table_number: {
        type: Number,
        required: [true, 'Table number must be provided'],
        unique: true,
    },
    otp: {
        type: String,
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
