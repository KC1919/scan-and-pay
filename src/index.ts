import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import Server from './server';

const PORT = process.env.PORT || 3000;


// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
    Server()
      .then(({ app }) => {
        app.listen(PORT, () => {
          console.log(`🚀 Listening http on port ${PORT}`);
        });
      })
      .catch((e) => {
        console.log(e);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
      });
  })();
