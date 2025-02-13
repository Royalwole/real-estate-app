'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Listings', href: '/listings' },
    ...(user?.publicMetadata?.role === 'admin' ? [{ label: 'Admin', href: '/admin' }] : []),
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Real Estate
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoaded ? null : user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-gray-700 hover:text-blue-600">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!isLoaded ? null : !user && (
                <div className="space-y-2 pt-4">
                  <SignInButton mode="modal">
                    <button className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full text-left px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                      Sign Up
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
