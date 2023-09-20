import express, { Express } from 'express';
import JobRoutes from './routes/job.route';
import { errorMiddleware } from './middleware/error.middleware';

// Create the express app
const app: Express = express();

// Define routes
app.use('/job', JobRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
