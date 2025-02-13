const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

const authenticate = ClerkExpressRequireAuth();

const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.auth.userId });
    
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying admin privileges',
      error: error.message,
    });
  }
};

const checkApprovalStatus = async (req, res, next) => {
  try {
    const user = await User.findOne({ clerkId: req.auth.userId });
    
    if (!user || user.status !== 'approved') {
      return res.status(403).json({
        success: false,
        message: 'Account pending approval. Please wait for admin approval.',
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking approval status',
      error: error.message,
    });
  }
};

module.exports = {
  authenticate,
  authorizeAdmin,
  checkApprovalStatus,
};
