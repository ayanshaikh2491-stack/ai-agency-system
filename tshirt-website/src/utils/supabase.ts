import { createClient } from '@supabase/supabase-js';

// Supabase configuration - in a real app, these would be in environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url-here';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key-here';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get products for a specific client
 * @param {string} clientId - The client ID to filter products by
 * @returns {Promise<Array>} Array of product objects
 */
export const getProducts = async (clientId: string) => {
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
export const createOrder = async (orderData: {
  productId: string;
  customerName: string;
  address: string;
  clientId: string;
}) => {
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

/**
 * Upload an image to Supabase storage
 * @param {File} file - The file to upload
 * @param {string} clientId - Client ID for organizing storage
 * @param {string} fileName - Optional custom filename
 * @returns {Promise<string>} Public URL of uploaded file
 */
export const uploadImage = async (file: File, clientId: string, fileName: string = null) => {
  try {
    // Generate filename if not provided
    const fileNameToUse = fileName || `${Date.now()}-${file.name}`;
    const filePath = `client_${clientId}/products/${fileNameToUse}`;
    
    // Upload file
    const { data, error } = await supabase
      .storage
      .from('product-images')
      .upload(filePath, file);
    
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from('product-images')
      .getPublicUrl(filePath);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};