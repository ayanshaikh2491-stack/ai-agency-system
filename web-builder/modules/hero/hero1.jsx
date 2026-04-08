import React from 'react';

const Hero1 = ({ title, subtitle, imageUrl, ctaText, ctaLink, className = '' }) => {
  let ctaClasses = 'px-8 py-3 bg-indigo-600 text-white font-medium rounded-md ';
  ctaClasses += 'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ';
  ctaClasses += 'transition-transform transform hover:-scale-[102%] ';
  
  if (ctaText === 'Secondary') {
    ctaClasses += 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50';
  }

  return (
    <section className={`relative bg-gray-50 overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6 leading-tight tracking-tight">
            {title}
          </h1>
          
          <p className="max-w-xl mx-auto text-lg text-gray-600">
            {subtitle}
          </p>
          
          <div className="mt-10 flex justify-center space-x-4 sm:space-x-6">
            <a
              href={ctaLink}
              className={ctaClasses}
            >
              {ctaText}
            </a>
          </div>
        </div>
        
        {/* Optional image */}
        {imageUrl && (
          <div className="mt-16 flex justify-center">
            <img 
              src={imageUrl} 
              alt="Hero" 
              className="max-w-xl h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero1;