import React from 'react';

const Footer2 = ({ links, socialLinks, copyrightText, className = '' }) => {
  return (
    <footer className={`bg-gradient-to-r from-indigo-900 to-purple-900 text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">
              BrandName
            </h3>
            <p className="text-gray-300">
              Innovative solutions for tomorrow's challenges
            </p>
            <div className="mt-4 flex flex-col md:flex-row items-center md:justify-start space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="flex items-center justify-center w-8 h-8 bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded-full"
                  aria-label={social.label}
                >
                  {/* Simple icon representation */}
                  {social.label.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <nav className="space-y-2">
              {links.company?.map((link, index) => (
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
          
          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Products</h3>
            <nav className="space-y-2">
              {links.products?.map((link, index) => (
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
          
          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <nav className="space-y-2">
              {links.support?.map((link, index) => (
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
        </div>
        
        <div className="mt-16 pt-10 border-t border-gray-800/50 text-center text-gray-300">
          <p className="text-sm">{copyrightText}</p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <span className="mx-2 text-gray-400">|</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;