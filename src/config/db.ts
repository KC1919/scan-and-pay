import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        if (process.env.DB_URL && process.env.DB_PASS) {
            const conn = await mongoose.connect(
                process.env.DB_URL.replace('<password>', process.env.DB_PASS)
            );
            if (conn !== null) {
                console.log('Database connected!');
            }
        }
    } catch (error) {
        console.log('Failed to connect database', error);
    }
};

export default connectDB;
