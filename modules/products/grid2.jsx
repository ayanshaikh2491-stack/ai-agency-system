import React from 'react';

const Grid2 = ({ products, title, subtitle, showPrices }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center">{title}</h2>
          <p className="text-lg text-gray-600 text-center mt-4">{subtitle}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                {showPrices && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                )}
                <button
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid2;
