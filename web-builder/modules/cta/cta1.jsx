import React from 'react';

const CTA1 = ({ title, subtitle, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink, className = '' }) => {
  return (
    <section className={`relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden ${className}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            {title}
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row sm:space-x-6 justify-center">
            <a
              href={buttonLink}
              className="flex-1 px-8 py-3 rounded-md bg-white text-indigo-600 font-medium hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 transition-transform transform hover:-scale-[102%]"
            >
              {buttonText}
            </a>
            
            {secondaryButtonText && secondaryButtonLink && (
              <a
                href={secondaryButtonLink}
                className="flex-1 px-8 py-3 rounded-md border border-white text-white font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-transform transform hover:-scale-[102%]"
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA1;