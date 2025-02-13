'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSpinner, FaEye } from 'react-icons/fa';
import Link from 'next/link';

interface Listing {
  _id: string;
  title: string;
  price: number;
  location: {
    city: string;
    state: string;
  };
  propertyType: string;
  status: 'active' | 'pending' | 'sold';
  createdAt: string;
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<'all' | Listing['status']>('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/listings`);
      if (!res.ok) throw new Error('Failed to fetch listings');
      const data = await res.json();
      setListings(data.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (listingId: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/listings/${listingId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete listing');

      setListings(listings.filter(listing => listing._id !== listingId));
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const updateListingStatus = async (listingId: string, status: Listing['status']) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/listings/${listingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update listing status');

      setListings(listings.map(listing =>
        listing._id === listingId ? { ...listing, status } : listing
      ));
    } catch (error) {
      console.error('Error updating listing status:', error);
    }
  };

  const filteredListings = listings.filter(listing => {
    const matchesStatus = selectedStatus === 'all' || listing.status === selectedStatus;
    const matchesType = selectedType === 'all' || listing.propertyType === selectedType;
    const matchesSearch = 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.state.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Listings Management</h1>
        <Link
          href="/admin/listings/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add New Listing
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          className="border rounded-md px-3 py-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as 'all' | Listing['status'])}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="sold">Sold</option>
        </select>
        <select
          className="border rounded-md px-3 py-2"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
        </select>
        <input
          type="text"
          placeholder="Search listings..."
          className="border rounded-md px-3 py-2 flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Property
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Listed By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.map((listing) => (
              <tr key={listing._id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                  <div className="text-sm text-gray-500 capitalize">{listing.propertyType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPrice(listing.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {listing.location.city}, {listing.location.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={listing.status}
                    onChange={(e) => updateListingStatus(listing._id, e.target.value as Listing['status'])}
                    className={`text-sm rounded-full px-2 py-1 font-semibold ${
                      listing.status === 'active' ? 'bg-green-100 text-green-800' :
                      listing.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="sold">Sold</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {listing.createdBy.firstName} {listing.createdBy.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link
                      href={`/property/${listing._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEye className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/admin/listings/${listing._id}/edit`}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      <FaEdit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => deleteListing(listing._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
