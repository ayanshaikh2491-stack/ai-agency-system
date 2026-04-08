import { useEffect, useState } from 'react';
import { getProducts, supabase } from './utils/supabase';
import ProductGrid from './components/ProductGrid';
import OrderForm from './components/OrderForm';
import Navbar from './components/Navbar';
import './styles/tailwind.css';

function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts('client_123');
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full border-4 border-t-2 border-b-2 border-blue-500 w-12 h-12"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Products</h2>
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Premium T-Shirt Collection
            </h1>
            <p className="mt-2 text-center text-gray-600">
              Browse our collection of high-quality t-shirts
            </p>
          </div>

          <ProductGrid products={products} />

          <div className="mt-12">
            <OrderForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;