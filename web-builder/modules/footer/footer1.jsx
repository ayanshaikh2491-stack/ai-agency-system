import React from 'react';

const Footer1 = ({ links, socialLinks, copyrightText, className = '' }) => {
  return (
    <footer className={`bg-gray-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:grid md:grid-cols-3 md:gap-8">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <p className="text-gray-400">
              Building innovative solutions for modern businesses.
            </p>
          </div>
          
          {/* Links */}
          <div className="space-y-4 md:space-y-0 md:space-x-8">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          
          {/* Social */}
          <div className="flex items-center">
            <h3 className="text-xl font-bold mb-4 mr-6">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 rounded-full"
                  aria-label={social.label}
                >
                  {/* Simple icon representation */}
                  {social.label.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;