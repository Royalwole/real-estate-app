import { FaHome, FaUsers, FaEnvelope, FaDollarSign } from 'react-icons/fa';
import Link from 'next/link';

async function getDashboardStats() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch stats');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalListings: 0,
      totalUsers: 0,
      totalInquiries: 0,
      recentListings: [],
      recentUsers: [],
      recentInquiries: []
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: 'Total Listings',
      value: stats.totalListings || 0,
      icon: FaHome,
      color: 'bg-blue-500',
      link: '/admin/listings'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers || 0,
      icon: FaUsers,
      color: 'bg-green-500',
      link: '/admin/users'
    },
    {
      title: 'New Inquiries',
      value: stats.totalInquiries || 0,
      icon: FaEnvelope,
      color: 'bg-yellow-500',
      link: '/admin/inquiries'
    },
    {
      title: 'Total Revenue',
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: FaDollarSign,
      color: 'bg-purple-500',
      link: '/admin/finance'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link 
              key={card.title} 
              href={card.link}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{card.title}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                  </div>
                  <div className={`${card.color} p-3 rounded-full`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Listings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Listings</h2>
          <div className="space-y-4">
            {stats.recentListings?.slice(0, 5).map((listing: any) => (
              <Link 
                key={listing._id} 
                href={`/admin/listings/${listing._id}`}
                className="block"
              >
                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded">
                  <div>
                    <p className="font-medium">{listing.title}</p>
                    <p className="text-sm text-gray-500">{listing.location.city}, {listing.location.state}</p>
                  </div>
                  <p className="font-semibold text-blue-600">${listing.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link 
            href="/admin/listings"
            className="block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all listings →
          </Link>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="space-y-4">
            {stats.recentUsers?.slice(0, 5).map((user: any) => (
              <Link 
                key={user._id} 
                href={`/admin/users/${user._id}`}
                className="block"
              >
                <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded">
                  <div>
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    user.status === 'approved' ? 'bg-green-100 text-green-800' :
                    user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <Link 
            href="/admin/users"
            className="block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all users →
          </Link>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recent Inquiries</h2>
          <div className="space-y-4">
            {stats.recentInquiries?.slice(0, 5).map((inquiry: any) => (
              <div key={inquiry._id} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded">
                <div>
                  <p className="font-medium">{inquiry.name}</p>
                  <p className="text-sm text-gray-500">{inquiry.email}</p>
                  <p className="text-sm text-gray-500 mt-1">{inquiry.message.substring(0, 100)}...</p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
          <Link 
            href="/admin/inquiries"
            className="block mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all inquiries →
          </Link>
        </div>
      </div>
    </div>
  );
}
