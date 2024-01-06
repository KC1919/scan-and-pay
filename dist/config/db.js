"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        console.log(process.env.DB_URL);
        if (process.env.DB_URL && process.env.DB_PASS) {
            const conn = await mongoose_1.default.connect(process.env.DB_URL.replace('<password>', process.env.DB_PASS));
            if (conn !== null) {
                console.log('Database connected!');
            }
        }
    }
    catch (error) {
        console.log('Failed to connect database', error);
    }
};
exports.default = connectDB;
