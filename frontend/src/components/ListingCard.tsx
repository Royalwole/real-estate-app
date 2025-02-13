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
      zipCode: string;
    };
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    images: Array<{ url: string }>;
  };
}

const ListingCard = ({ listing }: ListingCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/property/${listing._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative h-48 w-full">
          <Image
            src={listing.images[0]?.url || '/placeholder-house.jpg'}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-md">
            {formatPrice(listing.price)}
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h3 className="text-white text-lg font-semibold truncate">
              {listing.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Location */}
          <div className="flex items-center text-gray-600 mb-2">
            <FaMapMarkerAlt className="mr-2 text-blue-600" />
            <p className="truncate">
              {listing.location.city}, {listing.location.state} {listing.location.zipCode}
            </p>
          </div>

          {/* Property Type */}
          <p className="text-sm text-gray-500 mb-4 capitalize">
            {listing.propertyType}
          </p>

          {/* Features */}
          <div className="flex justify-between text-gray-600">
            <div className="flex items-center">
              <FaBed className="mr-1 text-blue-600" />
              <span>{listing.bedrooms} {listing.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1 text-blue-600" />
              <span>{listing.bathrooms} {listing.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center">
              <FaRuler className="mr-1 text-blue-600" />
              <span>{listing.squareFootage.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="px-4 pb-4">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
