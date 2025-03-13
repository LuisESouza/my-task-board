import express from 'express';
import { auth } from '../middleware/auth';
import * as TasksController from '../controllers/taskController';

const router = express.Router();

// Create task
router.post('/create',auth, TasksController.createTask);
// Get Task by ID
router.get('/get/:user_id', TasksController.getTask);
// Put Task by ID
router.put('/put/:task_id',auth, );
// Delete Task by ID
router.delete('/delete/:task_id',auth, );

export default router;