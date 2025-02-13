import { FaSpinner } from 'react-icons/fa';

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Stats Cards Loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Items Loading */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div>
                  <div className="h-4 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="h-6 w-32 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div>
                  <div className="h-4 w-40 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <FaSpinner className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    </div>
  );
}
