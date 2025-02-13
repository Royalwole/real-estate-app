const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Get all users (admin only)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-__v');
  res.json({ success: true, data: users });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ clerkId: req.auth.userId });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, data: user });
});

// Update user status (admin only)
const updateUserStatus = asyncHandler(async (req, res) => {
  const { userId, status } = req.body;
  
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  user.status = status;
  await user.save();
  
  res.json({ success: true, data: user });
});

// Create or update user from Clerk webhook
const syncUser = asyncHandler(async (req, res) => {
  const { data } = req.body;
  
  const userData = {
    clerkId: data.id,
    email: data.email_addresses[0].email_address,
    firstName: data.first_name,
    lastName: data.last_name,
  };
  
  const user = await User.findOneAndUpdate(
    { clerkId: userData.clerkId },
    userData,
    { upsert: true, new: true }
  );
  
  res.json({ success: true, data: user });
});

module.exports = {
  getUsers,
  getUserProfile,
  updateUserStatus,
  syncUser,
};
