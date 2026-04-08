-- Supabase Database Schema for T-shirt Website

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  client_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  address TEXT NOT NULL,
  client_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  client_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policies for products table
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Clients can manage their products" ON products
  FOR ALL USING (client_id = current_setting('app.client_id')::text);

-- Policies for orders table
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Clients can view their orders" ON orders;
CREATE POLICY "Anyone can create orders" ON orders
  FOR INSERT USING (true) WITH CHECK (true);
CREATE POLICY "Clients can view their orders" ON orders
  FOR SELECT USING (client_id = current_setting('app.client_id')::text);

-- Policies for bookings table
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Clients can view their bookings" ON bookings;
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT USING (true) WITH CHECK (true);
CREATE POLICY "Clients can view their bookings" ON bookings
  FOR SELECT USING (client_id = current_setting('app.client_id')::text);

-- Indexes for better performance
CREATE INDEX idx_products_client_id ON products(client_id);
CREATE INDEX idx_orders_client_id ON orders(client_id);
CREATE INDEX idx_orders_product_id ON orders(product_id);
CREATE INDEX idx_bookings_client_id ON bookings(client_id);
CREATE INDEX idx_bookings_date ON bookings(date);