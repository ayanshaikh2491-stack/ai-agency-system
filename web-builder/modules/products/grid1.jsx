import React from 'react';

const Grid1 = ({ products, title, subtitle, className = '' }) => {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title || subtitle && (
          <div className="text-center mb-12">
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
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                {/* Badge */}
                {product.badge && (
                  <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium 
                    ${product.badgeVariant === 'sale' ? 'bg-red-500 text-white' : 
                      product.badgeVariant === 'new' ? 'bg-indigo-500 text-white' : 
                      'bg-gray-500 text-white'}
                    `}>
                    {product.badge}
                  </span>
                )}
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-indigo-600">
                    ${product.price}
                  </span>
                  <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800">
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Grid1;