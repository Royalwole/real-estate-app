export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header Loading */}
      <div className="flex justify-between items-center">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Table Loading */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="animate-pulse">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-3 grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Table Rows */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border-t border-gray-200 px-6 py-4 grid grid-cols-6 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="flex space-x-3">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
