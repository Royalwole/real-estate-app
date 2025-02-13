const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  propertyType: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'townhouse'],
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  squareFootage: Number,
  features: [String],
  images: [{
    url: String,
    caption: String,
  }],
  status: {
    type: String,
    enum: ['active', 'pending', 'sold'],
    default: 'active',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Listing', listingSchema);
