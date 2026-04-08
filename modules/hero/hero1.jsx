import React from 'react';

const Hero1 = ({ title, subtitle, buttonText, buttonLink, imageUrl }) => {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {subtitle}
            </p>
            <a
              href={buttonLink}
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              {buttonText}
            </a>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Hero"
                className="rounded-lg shadow-md w-full h-auto"
              )
            : (
              <div className="bg-gray-200 rounded-lg shadow-md w-full h-64 flex items-center justify-center">
                <span className="text-gray-500">Image Placeholder</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero1;
