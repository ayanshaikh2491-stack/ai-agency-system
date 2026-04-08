import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { getProducts } from '../lib/supabase';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const testSupabaseConnection = async () => {
      try {
        const data = await getProducts('client_123');
        if (data && data.length > 0) {
          console.log('SUCCESS: Products fetched');
          // Log product details as requested
          data.forEach(product => {
            console.log(`Product: ${product.name}, Price: ${product.price}, Image: ${product.image_url}`);
          });
        } else {
          console.log('EMPTY: No products found');
        }
      } catch (error) {
        console.log(`ERROR: ${error.message}`);
      }
    };

    testSupabaseConnection();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;