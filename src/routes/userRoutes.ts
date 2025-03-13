import express from 'express';
import * as UserController from '../controllers/userController'
import { auth } from '../middleware/auth';


const router = express.Router();

// Create user
router.post('/create', UserController.createUser);
// Login user
router.post('/login');
// Get user by id
router.get('/get/:user_id', auth, UserController.getUserById);

export default router;