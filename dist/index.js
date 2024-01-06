"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './src/config/.env' });
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 3000;
(async () => {
    const { app } = await (0, server_1.default)();
    try {
        app.listen(PORT, async () => {
            console.log(`Server listening on port:${PORT}`);
        });
    }
    catch (error) {
        console.log('Failed to start server', error);
    }
})();
// // IIFE
// (async () => {
//     // starting the server
//     // deconstrcuting app from promise's result
//     Server()
//     .then(({app}) => {
//         const PORT = 3003;
//         app.listen(PORT, () => {
//             console.log(`🚀 Listening http on port ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log('Error in running server', error);
//         process.exit(1);
//     })
// })();
