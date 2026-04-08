import { useState } from 'react';

const ProductGrid = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
          >
            <img 
              src={product.image_url || 'https://via.placeholder.com/300x200'} 
              alt={product.name || 'Product'} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-900">{product.name || 'Unnamed Product'}</h3>
              <p className="mt-1 text-lg font-bold text-indigo-600">
                ${product.price ? product.price.toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <img 
                  src={selectedProduct.image_url || 'https://via.placeholder.com/400x300'} 
                  alt={selectedProduct.name || 'Product'} 
                  className="w-full h-64 object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg"
                />
              </div>
              <div className="w-full md:w-1/2 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedProduct.name || 'Unnamed Product'}
                </h2>
                <p className="text-gray-600 mb-4">
                  Premium quality t-shirt made from comfortable materials.
                </p>
                <p className="text-2xl font-bold text-indigo-600 mb-6">
                  ${selectedProduct.price ? selectedProduct.price.toFixed(2) : '0.00'}
                </p>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
                >
                  Select This Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;