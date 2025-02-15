'use client';

import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

interface ListingCardProps {
  listing: {
    _id: string;
    title: string;
    price: number;
    location: {
      address: string;
      city: string;
      state: string;
    };
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    images: Array<{
      url: string;
      caption: string;
    }>;
    propertyType: string;
  };
  showFullDetails?: boolean;
}

export default function ListingCard({ listing, showFullDetails = false }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
      <Link href={`/property/${listing._id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={listing.images[0]?.url || '/placeholder-property.jpg'}
            alt={listing.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-md">
            {listing.propertyType}
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              {listing.title}
            </h3>
            <p className="text-xl font-bold text-blue-600">
              {formatPrice(listing.price)}
            </p>
          </div>

          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-1" />
            <p className="truncate">
              {`${listing.location.address}, ${listing.location.city}, ${listing.location.state}`}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex items-center text-gray-600">
              <FaBed className="mr-2" />
              <span>{listing.bedrooms} Beds</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaBath className="mr-2" />
              <span>{listing.bathrooms} Baths</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaRuler className="mr-2" />
              <span>{listing.squareFeet.toLocaleString()} sqft</span>
            </div>
          </div>

          {showFullDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href={`/property/${listing._id}`}
                className="inline-block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </Link>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
