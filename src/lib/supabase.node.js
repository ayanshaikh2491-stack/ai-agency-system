const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://fbthkjgjejawjyubqjfp.supabase.co'
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_vFUw_pvlX9PJi7vJj41yqQ_SJA1Ntdt'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

module.exports = { supabase }