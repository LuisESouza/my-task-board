import express from 'express';
import taskRouter from './taskRoutes';
import userRouter from './userRoutes';

const router = express.Router();

// TASKS ROUTES
router.use('/tasks', taskRouter);

// USERS ROUTES
router.use('/user', userRouter);

export default router;
