// supabase.js - Supabase client and helper functions

// Import supabase
import { createClient } from '@supabase/supabase-js';

// Get environment variables with VITE_ prefix for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get products for a specific client
 * @param {string} clientId - The client ID to filter products by
 * @returns {Promise<Array>} Array of product objects
 */
export const getProducts = async (clientId) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('client_id', clientId);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Create a new order
 * @param {Object} orderData - Order data object
 * @param {string} orderData.productId - Product ID
 * @param {string} orderData.customerName - Customer name
 * @param {string} orderData.address - Customer address
 * @param {string} orderData.clientId - Client ID
 * @returns {Promise<Object>} Created order object
 */
export const createOrder = async (orderData) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          product_id: orderData.productId,
          customer_name: orderData.customerName,
          address: orderData.address,
          client_id: orderData.clientId
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Export supabase client as default for other uses
export default supabase;