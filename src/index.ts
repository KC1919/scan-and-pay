import dotenv from 'dotenv';
dotenv.config({ path: './src/config/.env' });
import Server from './server';

const PORT = process.env.PORT || 3000;


(async () => {
    const { app } = await Server();
    try {
        app.listen(PORT, async () => {
            console.log(`Server listening on port:${PORT}`);
        });
    } catch (error) {
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
