"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const PORT = 3000;
const app = server_1.default;
app.listen(PORT, () => {
    console.log(`Server listening on port:${PORT}`);
});
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
