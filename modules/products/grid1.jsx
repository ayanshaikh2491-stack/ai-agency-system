import React from 'react';

const Grid1 = ({ products, title, subtitle }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="text-lg text-gray-600 mt-4">{subtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-center h-48 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-indigo-600">${product.price}</span>
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid1;
