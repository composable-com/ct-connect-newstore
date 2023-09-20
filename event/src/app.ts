import express, { Express } from 'express';
import bodyParser from 'body-parser';
import EventRoutes from './routes/event.route';
import { errorMiddleware } from './middleware/error.middleware';

// Create the express app
const app: Express = express();

// Define configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/event', EventRoutes);

// Global error handler
app.use(errorMiddleware);

export default app;
