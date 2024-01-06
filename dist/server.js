"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
// only create the server not start it
// useful for tests
// const Server = async (): Promise<{ app: Express; }> => {
//     const app = express();
//     return { app };
// };
(0, db_1.default)();
const Server = http_1.default.createServer(app);
exports.default = Server;
