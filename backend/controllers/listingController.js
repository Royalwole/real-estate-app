const asyncHandler = require('express-async-handler');
const Listing = require('../models/Listing');

// Get all listings
const getListings = asyncHandler(async (req, res) => {
  const { 
    page = 1, 
    limit = 10,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    city,
  } = req.query;

  const query = {};
  
  if (propertyType) query.propertyType = propertyType;
  if (city) query['location.city'] = new RegExp(city, 'i');
  if (bedrooms) query.bedrooms = bedrooms;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const listings = await Listing.find(query)
    .populate('createdBy', 'firstName lastName')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Listing.countDocuments(query);

  res.json({
    success: true,
    data: listings,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  });
});

// Get single listing
const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate('createdBy', 'firstName lastName');
    
  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }
  
  res.json({ success: true, data: listing });
});

// Create listing
const createListing = asyncHandler(async (req, res) => {
  const listing = new Listing({
    ...req.body,
    createdBy: req.user._id,
  });
  
  const createdListing = await listing.save();
  res.status(201).json({ success: true, data: createdListing });
});

// Update listing
const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  
  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }
  
  if (listing.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to update this listing');
  }
  
  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  
  res.json({ success: true, data: updatedListing });
});

// Delete listing
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  
  if (!listing) {
    res.status(404);
    throw new Error('Listing not found');
  }
  
  if (listing.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to delete this listing');
  }
  
  await listing.remove();
  res.json({ success: true, message: 'Listing removed' });
});

module.exports = {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
};
