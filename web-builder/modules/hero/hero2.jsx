import React from 'react';

const Hero2 = ({ title, subtitle, backgroundImage, ctaText, ctaLink, className = '' }) => {
  return (
    <section className={`relative min-h-[600px] bg-center bg-cover ${className}`} 
             style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-[600px] items-center">
        <div className="w-full md:w-1/2">
          <h1 className={`
            text-4xl font-bold text-white sm:text-5xl md:text-6xl
            mb-6 leading-tight tracking-tight shadow-xl
          `}>{title}</h1>
          
          <p className={`
            text-xl text-white/90 mb-8
          `}>{subtitle}</p>
          
          <a
            href={ctaLink}
            className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-medium rounded-md
              hover:bg-indigo-50 focus:outline-none focus:ring-2 focus-ring-offset-2 focus-ring-indigo-500
              transition-transform transform hover:-scale-[102%] flex items-center space-x-2"
          >
            {ctaText}
            {/* Heroicon name: outline/arrow-right */}
            <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero2;