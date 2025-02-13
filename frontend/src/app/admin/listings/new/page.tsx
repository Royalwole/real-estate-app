'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ListingForm from '@/components/ListingForm';

export default function NewListingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/listings`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      const data = await response.json();
      router.push(`/admin/listings`);
      router.refresh();
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('Failed to create listing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Add New Listing</h1>
      </div>

      <div className="max-w-5xl mx-auto">
        <ListingForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
