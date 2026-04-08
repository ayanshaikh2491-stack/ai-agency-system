import React from 'react';

const Navbar1 = ({ brand, links, onLinkClick }) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-800">{brand}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onLinkClick) onLinkClick(link);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    link.isActive ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-md hover:bg-gray-100 hover:text-gray-600">
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
