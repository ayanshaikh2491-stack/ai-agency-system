import React from 'react';

const CTA2 = ({ title, subtitle, buttonText, buttonLink, imageUrl, className = '' }) => {
  return (
    <section className={`relative bg-white overflow-hidden ${className}`}>
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\%22http://www.w3.org/2000/svg\%22 viewBox=\%220 0 100 100\%22><path d=\%22M0,50 Q50,0 100,50 T200,50\' fill=\%22none\%22 stroke=\%22%23eff6ff\%22 stroke-width=\%222\%22/%3E</svg>')] bg-[length:200px_100px] opacity-50" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 sm:grid-cols-2 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              {subtitle}
            </p>
            
            <div className="flex space-x-4">
              <a
                href={buttonLink}
                className="flex-1 px-8 py-3 bg-indigo-600 text-white font-medium rounded-md
                  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                  transition-transform transform hover:-scale-[102%]"
              >
                {buttonText}
              </a>
            </div>
          </div>
          
          {/* Image Content */}
          <div className="relative">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="CTA Illustration" 
                className="h-96 w-full object-cover rounded-xl shadow-2xl"
                loading="lazy"
              />
            ) : (
              <div className="h-96 w-full bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-center text-gray-500 rounded-xl">
                Illustration
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA2;