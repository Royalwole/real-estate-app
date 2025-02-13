import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Privacy Policy', href: '/privacy' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Buy Property', href: '/buy' },
        { label: 'Sell Property', href: '/sell' },
        { label: 'Rent Property', href: '/rent' },
      ],
    },
  ];

  const socialLinks = [
    { Icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { Icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { Icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { Icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Real Estate</h3>
            <p className="text-gray-400 mb-4">
              Your trusted partner in finding the perfect property. We make real estate simple and accessible.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Real Estate. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
