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

export async function getOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function createBooking(data) {
  const { error } = await supabase
    .from('bookings')
    .insert([data])

  if (error) throw error
  return { success: true }
}

export async function getBookings() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}