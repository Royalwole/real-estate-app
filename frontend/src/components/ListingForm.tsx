'use client';

import { useState } from 'react';
import { FaUpload, FaSpinner } from 'react-icons/fa';

interface ListingFormProps {
  initialData?: {
    title: string;
    description: string;
    price: number;
    location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    };
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    features: string[];
    images: { url: string; caption: string; }[];
  };
  onSubmit: (data: FormData) => Promise<void>;
  isLoading: boolean;
}

export default function ListingForm({ initialData, onSubmit, isLoading }: ListingFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    address: initialData?.location.address || '',
    city: initialData?.location.city || '',
    state: initialData?.location.state || '',
    zipCode: initialData?.location.zipCode || '',
    propertyType: initialData?.propertyType || 'house',
    bedrooms: initialData?.bedrooms || 1,
    bathrooms: initialData?.bathrooms || 1,
    squareFootage: initialData?.squareFootage || 0,
    features: initialData?.features || [],
    images: initialData?.images || [],
  });

  const [newFeature, setNewFeature] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'features' || key === 'images') {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value.toString());
      }
    });

    if (selectedFiles) {
      Array.from(selectedFiles).forEach((file) => {
        data.append('imageFiles', file);
      });
    }

    await onSubmit(data);
  };

  const handleFeatureAdd = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleFeatureRemove = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  const handleImageRemove = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Property Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
            <input
              type="number"
              required
              min="0"
              step="0.5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Square Footage</label>
            <input
              type="number"
              required
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.squareFootage}
              onChange={(e) => setFormData({ ...formData, squareFootage: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Features</h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a feature"
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleFeatureAdd())}
            />
            <button
              type="button"
              onClick={handleFeatureAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => handleFeatureRemove(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Images</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-blue-500">
              <FaUpload className="h-8 w-8 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">Upload images</span>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={(e) => setSelectedFiles(e.target.files)}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={image.caption || `Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <FaSpinner className="animate-spin mr-2" />
              Saving...
            </span>
          ) : (
            'Save Listing'
          )}
        </button>
      </div>
    </form>
  );
}
