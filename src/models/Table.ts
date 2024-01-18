import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    table_number: {
        type: Number,
        required: [true, 'Table number must be provided'],
        unique: true,
    },
    otp: {
        type: Number,
    },
    session: {
        type: String,
    }
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;
