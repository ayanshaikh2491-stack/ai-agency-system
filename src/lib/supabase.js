import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getProducts(client_id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('client_id', client_id)
   
  if (error) throw error
  return data
}

export async function createOrder(data) {
  try {
    const { error } = await supabase
      .from('orders')
      .insert([data])
     
    if (error) {
      console.error('Error creating order:', error);
      throw error;
    }
    console.log('Order created successfully:', data);
    return { success: true };
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
}

export async function createBooking(data) {
  try {
    const { error } = await supabase
      .from('bookings')
      .insert([data])
   
    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    console.log('Booking created successfully:', data);
    return { success: true };
  } catch (error) {
    console.error('Failed to create booking:', error);
    throw error;
  }
}