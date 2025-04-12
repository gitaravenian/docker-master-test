import express from 'express';
import { loginController, getCurrentUser, logoutController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Login route
router.post('/login', loginController);

// Get current user route
router.get('/check', authenticateToken, getCurrentUser);

// Logout route
router.post('/logout', logoutController);

export default router;