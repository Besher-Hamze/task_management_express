import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/database';
import taskRoutes from './routes/taskRoutes';
import authRoutes from './routes/authRoutes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { jwtValidation ,jwtErrorHandler} from './middleware/jwtMiddleware'; // Import the JWT validation middleware
import departmentRoutes from './routes/departmentRoutes';

dotenv.config();

const app = express();

// Middleware setup
app.use(helmet());
app.use(bodyParser.json());

// JWT Middleware
app.use(jwtValidation);
app.use(jwtErrorHandler)
// Register Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/departments', departmentRoutes);

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI!;
connectDB(mongoUri);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
