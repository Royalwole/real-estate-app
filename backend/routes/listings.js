const express = require('express');
const router = express.Router();
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');
const {
  authenticate,
  checkApprovalStatus,
} = require('../middlewares/authenticate');

// Public routes
router.get('/', getListings);
router.get('/:id', getListing);

// Protected routes
router.post('/', authenticate, checkApprovalStatus, createListing);
router.put('/:id', authenticate, checkApprovalStatus, updateListing);
router.delete('/:id', authenticate, checkApprovalStatus, deleteListing);

module.exports = router;
