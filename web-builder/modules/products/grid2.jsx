import React from 'react';

const Grid2 = ({ products, title, subtitle, className = '' }) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title || subtitle && (
          <div className="mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-1/2">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="h-48 w-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 rounded-t-lg md:rounded-none md:rounded-l-lg">
                      No Image
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between md:w-1/2">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    {product.badge && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        mb-3
                        ${product.badgeVariant === 'sale' ? 'bg-red-100 text-red-800' : 
                          product.badgeVariant === 'new' ? 'bg-indigo-100 text-indigo-800' : 
                          'bg-gray-100 text-gray-800'}
                      `}>
                        {product.badge}
                      </span>
                    )}
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <span className="text-2xl font-bold text-indigo-600 block mb-2">
                        ${product.price}
                      </span>
                      <div className="flex space-x-3">
                        <button className="flex-1 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md
                          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Buy Now
                        </button>
                        <button className="flex-1 px-4 py-2 bg-white text-indigo-600 border border-indigo-300 font-medium rounded-md
                          hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200">
                          Add to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid2;