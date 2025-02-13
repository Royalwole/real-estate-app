const express = require('express');
const router = express.Router();
const { 
  getUsers, 
  getUserProfile, 
  updateUserStatus,
  syncUser,
} = require('../controllers/userController');
const { 
  authenticate, 
  authorizeAdmin,
  checkApprovalStatus,
} = require('../middlewares/authenticate');

// Public routes
router.post('/sync', syncUser); // Clerk webhook endpoint

// Protected routes
router.get('/profile', authenticate, checkApprovalStatus, getUserProfile);

// Admin routes
router.get('/', authenticate, authorizeAdmin, getUsers);
router.patch('/:id/status', authenticate, authorizeAdmin, updateUserStatus);

module.exports = router;
