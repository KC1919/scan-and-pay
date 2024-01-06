import http from 'http';
import express from 'express';
import connectDB from './config/db';

const app = express();

// only create the server not start it
// useful for tests
// const Server = async (): Promise<{ app: Express; }> => {
//     const app = express();
//     return { app };
// };

connectDB();
const Server = http.createServer(app);

export default Server;