import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt, FaHome, FaCalendar } from 'react-icons/fa';

async function getProperty(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch property');
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw error;
  }
}

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getProperty(params.id);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Property Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-2" />
                <p>
                  {property.location.address}, {property.location.city},{' '}
                  {property.location.state} {property.location.zipCode}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(property.price)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
              <Image
                src={property.images[0]?.url || '/placeholder-house.jpg'}
                alt={property.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw"
              />
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {property.images.slice(1, 5).map((image: { url: string }, index: number) => (
                <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt={`${property.title} - Image ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 16vw"
                  />
                </div>
              ))}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center">
                  <FaBed className="text-blue-600 mr-2" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <FaBath className="text-blue-600 mr-2" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <FaRuler className="text-blue-600 mr-2" />
                  <span>{property.squareFootage.toLocaleString()} sqft</span>
                </div>
                <div className="flex items-center">
                  <FaHome className="text-blue-600 mr-2" />
                  <span className="capitalize">{property.propertyType}</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-600 mb-6">{property.description}</p>

              <h3 className="text-xl font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.features?.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-4">Interested in this property?</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="I'm interested in this property and would like to schedule a viewing."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Contact Agent
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
