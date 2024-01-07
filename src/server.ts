import http from 'http';
import express, { Express } from 'express';
import Database from './loaders/database';
import { FrameworkLoader } from './loaders/framework';
import TableRouter from './api/admin/table';

const Server = async (): Promise<{ app: Express; server: http.Server }> => {
  const app = express();

  const server = http.createServer(app);

  // Loaders
  await Database.Loader();
  FrameworkLoader({ app });

  // API Routes
  app.use('/v1/api/table', TableRouter);

  // app.use(RefreshTokenMiddleware);
  // app.use('/v1/other', OtherRouter);

  app.get('/', (request: express.Request, response: express.Response) =>
    response.json({
      status: true,
      content: {
        data: 'Welcome to scan & pay API',
      }
    })
  );

  app.all('*', async () => {
    //   throw new NotFoundError();
  });

  // Middlewares
  // app.use(ErrorHandler);

  return { app, server };
};
export default Server;

// const Server = http.createServer(app);

// export default Server;