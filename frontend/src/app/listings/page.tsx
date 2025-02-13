import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import { FaFilter } from 'react-icons/fa';

async function getListings(searchParams: { [key: string]: string | string[] | undefined }) {
  const params = new URLSearchParams();
  
  // Add search params to query
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) params.append(key, value.toString());
  });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/listings?${params.toString()}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch listings');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching listings:', error);
    return { data: [], totalPages: 0 };
  }
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data: listings = [], totalPages = 0 } = await getListings(searchParams);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            Find Your Perfect Property
          </h1>
          <SearchBar />
        </div>
      </div>

      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {listings.length} properties found
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50">
            <FaFilter className="text-blue-600" />
            <span>Filter</span>
          </button>
        </div>

        {/* Listings Grid */}
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria to find more properties
            </p>
          </div>
        )}

        {/* Pagination placeholder - To be implemented */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-2">
              {/* Pagination controls will be added here */}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
