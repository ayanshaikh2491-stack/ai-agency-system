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
  const { error } = await supabase
    .from('orders')
    .insert([data])
  
  if (error) throw error
  return { success: true }
}