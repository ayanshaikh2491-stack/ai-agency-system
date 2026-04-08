import React, { useState, useEffect } from 'react';
import { getProducts, createOrder, createBooking } from '../../lib/supabase';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState({});
  const [bookingData, setBookingData] = useState({});
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts('client_123');
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

   const handleOrderSubmit = async (e, product) => {
     e.preventDefault();
     
     // Validation
     if (!orderData.customer_name || !orderData.address) {
       setOrderError('Please fill in all fields');
       return;
     }
     
     setOrderError('');
     
     const order = {
       product_id: product.id,
       customer_name: orderData.customer_name,
       address: orderData.address,
       client_id: 'client_123'
     };

     try {
       await createOrder(order);
       alert(`Order placed for ${product.name}!`);
       setOrderData({});
     } catch (err) {
       setOrderError('Error placing order: ' + err.message);
     }
   };

   const handleBookingSubmit = async (e) => {
     e.preventDefault();
     
     // Validation
     if (!bookingData.customer_name || !bookingData.phone || !bookingData.date) {
       setBookingError('Please fill in all fields');
       return;
     }
     
     setBookingError('');
     
     const booking = {
       service_name: 'general',
       customer_name: bookingData.customer_name,
       phone: bookingData.phone,
       date: bookingData.date,
       client_id: 'client_123'
     };

     try {
       await createBooking(booking);
       alert('Booking confirmed!');
       setBookingData({});
       setShowBookingForm(false);
     } catch (err) {
       setBookingError('Error creating booking: ' + err.message);
     }
   };

  if (loading) return <div className="text-center py-12">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 py-12">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      
       {products.length === 0 ? (
         <div className="text-center py-12">No products found for this client.</div>
       ) : (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {products.map(product => (
             <div key={product.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
               <img 
                 src={product.image_url} 
                 alt={product.name} 
                 className="w-full h-48 object-cover mb-4 rounded"
               />
               <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
               <p className="text-lg font-bold text-green-600 mb-4">${product.price}</p>
               
               <form 
                 onSubmit={(e) => handleOrderSubmit(e, product)} 
                 className="space-y-3"
               >
                 {orderError && (
                   <div className="mb-2 p-2 bg-red-100 text-red-800 rounded text-sm">
                     {orderError}
                   </div>
                 )}
                 <div>
                   <label className="block text-sm font-medium mb-1">Your Name:</label>
                   <input
                     type="text"
                     value={orderData.customer_name || ''}
                     onChange={(e) => 
                       setOrderData(prev => ({ ...prev, customer_name: e.target.value }))
                     }
                     required
                     className="w-full px-3 py-2 border rounded"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium mb-1">Address:</label>
                   <input
                     type="text"
                     value={orderData.address || ''}
                     onChange={(e) => 
                       setOrderData(prev => ({ ...prev, address: e.target.value }))
                     }
                     required
                     className="w-full px-3 py-2 border rounded"
                   />
                 </div>
                 <button
                   type="submit"
                   className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                   disabled={!orderData.customer_name || !orderData.address}
                 >
                   Buy Now
                 </button>
               </form>
             </div>
           ))}
         </div>
       )}
       
       {/* Book Service Section */}
       <div className="mt-12">
         <h2 className="text-2xl font-bold text-center mb-6">Book Our Service</h2>
         <button 
           onClick={() => setShowBookingForm(!showBookingForm)}
           className="w-full max-w-xs mx-auto bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition mb-6"
         >
           {showBookingForm ? 'Close Booking Form' : 'Book Service'}
         </button>
         
         {showBookingForm && (
           <form 
             onSubmit={handleBookingSubmit}
             className="max-w-xs mx-auto bg-white p-6 rounded-lg shadow-md"
           >
             {bookingError && (
               <div className="mb-2 p-2 bg-red-100 text-red-800 rounded text-sm">
                 {bookingError}
               </div>
             )}
             <div className="mb-4">
               <label className="block text-sm font-medium mb-2">Your Name:</label>
               <input
                 type="text"
                 value={bookingData.customer_name || ''}
                 onChange={(e) => 
                   setBookingData(prev => ({ ...prev, customer_name: e.target.value }))
                 }
                 required
                 className="w-full px-3 py-2 border rounded"
               />
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium mb-2">Phone Number:</label>
               <input
                 type="tel"
                 value={bookingData.phone || ''}
                 onChange={(e) => 
                   setBookingData(prev => ({ ...prev, phone: e.target.value }))
                 }
                 required
                 className="w-full px-3 py-2 border rounded"
               />
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium mb-2">Preferred Date:</label>
               <input
                 type="date"
                 value={bookingData.date || ''}
                 onChange={(e) => 
                   setBookingData(prev => ({ ...prev, date: e.target.value }))
                 }
                 required
                 className="w-full px-3 py-2 border rounded"
               />
             </div>
             <button
               type="submit"
               className="w-full bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 transition"
               disabled={!bookingData.customer_name || !bookingData.phone || !bookingData.date}
             >
               Confirm Booking
             </button>
           </form>
         )}
       </div>
    </div>
  );
};

export default Home;