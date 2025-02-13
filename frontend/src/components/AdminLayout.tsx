'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaUsers, FaList, FaCog, FaChartBar } from 'react-icons/fa';
import { useEffect } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata.role !== 'admin')) {
      router.push('/');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }

  const navigationItems = [
    { href: '/admin', label: 'Dashboard', icon: FaChartBar },
    { href: '/admin/listings', label: 'Listings', icon: FaHome },
    { href: '/admin/users', label: 'Users', icon: FaUsers },
    { href: '/admin/inquiries', label: 'Inquiries', icon: FaList },
    { href: '/admin/settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.firstName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-5 px-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <Icon className="mr-4 h-6 w-6" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
