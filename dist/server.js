"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const Server = async () => {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    // Loaders
    await (0, db_1.default)();
    // API Routes
    // app.use(RefreshTokenMiddleware);
    // app.use('/v1/other', OtherRouter);
    app.get('/', (request, response) => response.json({
        status: true,
        content: {
            data: 'Welcome to API',
        }
    }));
    app.all('*', async () => {
        //   throw new NotFoundError();
    });
    // Middlewares
    // app.use(ErrorHandler);
    return { app, server };
};
exports.default = Server;
// const Server = http.createServer(app);
// export default Server;
