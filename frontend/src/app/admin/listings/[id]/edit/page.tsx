'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ListingForm from '@/components/ListingForm';
import { FaSpinner } from 'react-icons/fa';

interface ListingData {
  _id: string;
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
  images: Array<{ url: string; caption: string; }>;
}

export default function EditListingPage({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<ListingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchListing();
  }, [params.id]);

  const fetchListing = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/listings/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch listing');
      }
      const data = await response.json();
      setListing(data.data);
    } catch (error) {
      console.error('Error fetching listing:', error);
      alert('Failed to fetch listing details. Please try again.');
      router.push('/admin/listings');
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/listings/${params.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update listing');
      }

      router.push('/admin/listings');
      router.refresh();
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900">Listing not found</h2>
        <p className="mt-2 text-gray-600">The listing you're trying to edit doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Listing</h1>
      </div>

      <div className="max-w-5xl mx-auto">
        <ListingForm
          initialData={listing}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
