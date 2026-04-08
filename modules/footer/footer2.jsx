import React from 'react';

const Footer2 = ({ brand, description, links, socialLinks, copyright }) => {
  return (
    <footer className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="border-b pb-6 md:border-b-0 md:border-r md:pr-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {brand}
            </h3>
            <p className="text-gray-600">
              {description}
            </p>
          </div>
          
          {/* Links Column */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Column */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Newsletter Column */}
          <div>
            <h4 className="text-gray-900 font-bold mb-4">Newsletter</h4>
            <p className="text-gray-600 mb-4">
              Subscribe to get updates and special offers
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
