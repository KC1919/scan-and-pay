import dotenv from 'dotenv';
import http from 'http';
import express, { Express } from 'express';
import connectDB from './config/db';

const Server = async (): Promise<{ app: Express; server: http.Server }> => {
    const app = express();
  
    const server = http.createServer(app);
    // Loaders
    await connectDB();

  
    // API Routes
  
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