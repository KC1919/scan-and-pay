import http from 'http';
import express from 'express';

const app = express();

// only create the server not start it
// useful for tests
// const Server = async (): Promise<{ app: Express; }> => {
//     const app = express();
//     return { app };
// };

const Server = http.createServer(app);

export default Server;