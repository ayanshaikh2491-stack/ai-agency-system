import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 text-center text-3xl md:text-4xl">
      <h1 className="text-gray-900">Welcome to Our Services</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-3 rounded mt-4">
        Get Started
      </button>
    </div>
  );
};

export default Hero;