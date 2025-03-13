import express from 'express';
import tasksRouter from './tasksRoutes';
import userRouter from './userRoutes';

const router = express.Router();

// TASKS ROUTES
router.use('/tasks', tasksRouter);

// USERS ROUTES
router.use('/user', userRouter);

export default router;
