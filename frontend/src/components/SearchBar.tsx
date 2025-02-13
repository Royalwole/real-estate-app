'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaSearch, FaDollarSign, FaBed, FaHome } from 'react-icons/fa';

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    router.push(`/listings?${queryParams.toString()}`);
  };

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const bedroomOptions = [
    { value: '1', label: '1+' },
    { value: '2', label: '2+' },
    { value: '3', label: '3+' },
    { value: '4', label: '4+' },
    { value: '5', label: '5+' },
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Location */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Location"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>

        {/* Property Type */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaHome className="text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
          >
            <option value="">Property Type</option>
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="text-gray-400" />
          </div>
          <input
            type="number"
            placeholder="Min Price"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="text-gray-400" />
          </div>
          <input
            type="number"
            placeholder="Max Price"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaBed className="text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
          >
            <option value="">Bedrooms</option>
            {bedroomOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="mt-4 flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Search Properties
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
