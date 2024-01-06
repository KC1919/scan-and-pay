import Server from './server';
import express from 'express';

const PORT = 3000;

const app = Server;

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
