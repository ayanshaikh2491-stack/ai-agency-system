import React from 'react';

const Navbar2 = ({ brandName, links, className = '' }) => {
  return (
    <nav className={`bg-gradient-to-r from-indigo-600 to-purple-600 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-white">{brandName}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button className="inline-flex items-center p-2 ml-3 text-sm text-white rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white" aria-label="Open main menu">
              {/* Heroicon name: outline/menu */}
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;