import React from 'react';

const Footer1 = ({ links, socialLinks, copyright }) => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              {links.products.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              {links.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700">
          <p className="text-center text-sm text-gray-400">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
