import React from 'react';

const Hero2 = ({ title, subtitle, features, buttonText, buttonLink }) => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="mx-auto mb-4 h-12 w-12 flex items-center justify-center bg-indigo-100 rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <a
            href={buttonLink}
            className="inline-block mt-10 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero2;
