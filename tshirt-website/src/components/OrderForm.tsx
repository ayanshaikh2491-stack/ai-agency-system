import { useState } from 'react';
import { createOrder } from '../utils/supabase';

interface OrderFormProps {}

const OrderForm = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProductId || !customerName || !address) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await createOrder({
        productId: selectedProductId,
        customerName,
        address,
        clientId: 'client_123'
      });
      
      setSuccess(true);
      // Reset form
      setSelectedProductId(null);
      setCustomerName('');
      setAddress('');
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {!success ? (
        <>
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Place Your Order
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Product
              </label>
              <div className="relative">
                <select
                  value={selectedProductId || ''}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={loading}
                >
                  <option value="">Select a product...</option>
                  {/* Options would be populated from products context/state */}
                  <option value="prod_1">Classic Cotton T-Shirt</option>
                  <option value="prod_2">Premium Polo Shirt</option>
                  <option value="prod_3">V-Neck Summer Tee</option>
                </select>
                {loading && (
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <div className="animate-spin h-4 w-4"></div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={3}
                placeholder="Enter your shipping address"
                required
                disabled={loading}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading || !selectedProductId || !customerName || !address}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}
          </form>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="flex items-center justify-center mb-6">
            <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We'll notify you when your order ships.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
          >
            Place Another Order
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderForm;