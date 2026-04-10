/**
 * 🔥 3D WEBSITE GENERATOR WITH ANIMATIONS
 * Multi-page, 3D products, responsive, beautiful
 */

const fastGen = require('./fastCodeGenerator');

// ============================================
// 🎨 PREMIUM COLOR PALETTES FOR 10 WEBSITES
// ============================================

const COLOR_PALETTES = [
    {
        name: 'Gym - Midnight Strength',
        primary: '#1a1a2e',
        accent: '#0f3460',
        highlight: '#e94560',
        light: '#16a085',
    },
    {
        name: 'Salon - Rose Gold Elegance',
        primary: '#faf0e6',
        accent: '#d4a574',
        highlight: '#c41e3a',
        light: '#e8b4c8',
    },
    {
        name: 'Store - Ocean Blue',
        primary: '#001f3f',
        accent: '#0074d9',
        highlight: '#ff4136',
        light: '#7fdbca',
    },
    {
        name: 'Restaurant - Warm Sunset',
        primary: '#2c1810',
        accent: '#d4a574',
        highlight: '#ff6b35',
        light: '#ffa500',
    },
    {
        name: 'Hotel - Luxury Teal',
        primary: '#0d3b66',
        accent: '#ef476f',
        highlight: '#ffd60a',
        light: '#06d6a0',
    },
    {
        name: 'Tech - Neon Purple',
        primary: '#0a0e27',
        accent: '#7c3aed',
        highlight: '#06b6d4',
        light: '#10b981',
    },
    {
        name: 'Fashion - Minimalist Black',
        primary: '#1a1a1a',
        accent: '#e0e0e0',
        highlight: '#ff1493',
        light: '#daa520',
    },
    {
        name: 'Coffee - Rich Brown',
        primary: '#3e2723',
        accent: '#8d6e63',
        highlight: '#ff6f00',
        light: '#d7ccc8',
    },
    {
        name: 'Fitness - Electric Green',
        primary: '#0d1b2a',
        accent: '#00d9ff',
        highlight: '#00ff88',
        light: '#ffbe0b',
    },
    {
        name: 'Beauty - Lavender Pink',
        primary: '#2f1b3c',
        accent: '#a94064',
        highlight: '#e755a7',
        light: '#f0a8d8',
    },
];

// ============================================
// 3D PRODUCT DATA FOR DIFFERENT INDUSTRIES
// ============================================

const PRODUCT_DATA = {
    gym: [
        { name: 'Dumbbell Set', price: '$49.99', image: '🏋️', color: '#ff6b35' },
        { name: 'Yoga Mat', price: '$29.99', image: '🧘', color: '#06d6a0' },
        { name: 'Treadmill', price: '$499', image: '🏃', color: '#0074d9' },
        { name: 'Resistance Bands', price: '$19.99', image: '💪', color: '#e94560' },
    ],
    salon: [
        { name: 'Hair Styling Package', price: '$85', image: '💇', color: '#e8b4c8' },
        { name: 'Facial Treatment', price: '$95', image: '✨', color: '#ffd60a' },
        { name: 'Manicure & Pedicure', price: '$65', image: '💅', color: '#ff1493' },
        { name: 'Massage Therapy', price: '$120', image: '🧖', color: '#d4a574' },
    ],
    ecommerce: [
        { name: 'Premium Headphones', price: '$199', image: '🎧', color: '#7c3aed' },
        { name: 'Wireless Charger', price: '$45', image: '⚡', color: '#10b981' },
        { name: 'Phone Case Pro', price: '$29', image: '📱', color: '#06b6d4' },
        { name: 'Cables Bundle', price: '$35', image: '🔌', color: '#ffbe0b' },
    ],
    restaurant: [
        { name: 'Signature Burger', price: '$16.99', image: '🍔', color: '#ff6f00' },
        { name: 'Grilled Salmon', price: '$24.99', image: '🐟', color: '#06d6a0' },
        { name: 'Pasta Carbonara', price: '$18.99', image: '🍝', color: '#f0a8d8' },
        { name: 'Dessert Platter', price: '$12.99', image: '🍰', color: '#ffd60a' },
    ],
};

// ============================================
// ENHANCED CODE GENERATOR WITH 3D
// ============================================

function generateMultiPageApp(config, palette) {
    const { websiteName, businessType } = config;
    const { primary, accent, highlight, light } = palette;

    const appJsx = `import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[${primary}] to-[${accent}]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-[${primary}]/80 border-b border-[${light}]/20">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[${accent}] to-[${highlight}] bg-clip-text text-transparent">
              ${websiteName}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[${accent}]/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              {['Home', 'Products', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : \`/\${item.toLowerCase()}\`}
                  className="text-white hover:text-[${highlight}] transition-colors duration-300 font-medium"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden bg-[${accent}] border-t border-[${light}]/20"
            >
              <div className="flex flex-col gap-4 p-4">
                {['Home', 'Products', 'About', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Home' ? '/' : \`/\${item.toLowerCase()}\`}
                    className="text-white hover:text-[${highlight}] font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home palette={{ primary, accent, highlight, light }} />} />
          <Route path="/products" element={<Products palette={{ primary, accent, highlight, light }} />} />
          <Route path="/about" element={<About palette={{ primary, accent, highlight, light }} />} />
          <Route path="/contact" element={<Contact palette={{ primary, accent, highlight, light }} />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-[${primary}] border-t border-[${light}]/20 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-white/60">
            <p>© 2024 ${websiteName}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}`;

    const homePage = `import React from 'react';
import { motion } from 'framer-motion';

export default function Home({ palette }) {
  const { primary, accent, highlight, light } = palette;

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to Excellence
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Experience premium quality and exceptional service
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-[${highlight}] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          {/* 3D Animation */}
          <motion.div
            className="mt-16"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-6xl md:text-8xl">✨</div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-[${accent}]/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '1000+', label: 'Happy Customers' },
              { number: '50+', label: 'Expert Team' },
              { number: '100%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-[${highlight}] mb-2">{stat.number}</p>
                <p className="text-white/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}`;

    const productsPage = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PRODUCTS = ${JSON.stringify(PRODUCT_DATA[businessType] || PRODUCT_DATA.ecommerce, null, 2)};

export default function Products({ palette }) {
  const { primary, accent, highlight, light } = palette;
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Products
          </h2>
          <p className="text-white/70">Premium selection of quality items</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(i)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-[${highlight}]/50 transition-all duration-300"
            >
              {/* 3D Product Animation */}
              <motion.div
                className="aspect-square flex items-center justify-center text-6xl md:text-7xl"
                animate={hoveredId === i ? { rotate: [0, 360], scale: 1.1 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {product.image}
              </motion.div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[${primary}] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Product Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-[${highlight}] font-semibold">{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`;

    const aboutPage = `import React from 'react';
import { motion } from 'framer-motion';

export default function About({ palette }) {
  const { primary, accent, highlight, light } = palette;

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h2>
          <p className="text-white/70 text-lg">
            Discover our story, mission, and values
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-[${highlight}] mb-4">Our Mission</h3>
            <p className="text-white/80">
              We are dedicated to providing exceptional quality and service to every customer. Our commitment to excellence drives everything we do.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-[${highlight}] mb-4">Our Values</h3>
            <p className="text-white/80">
              Quality, integrity, and customer satisfaction are at the heart of everything we do. We believe in building lasting relationships with our customers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-[${highlight}] mb-4">Our Team</h3>
            <p className="text-white/80">
              Our talented team of professionals is passionate about delivering outstanding results and exceeding expectations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}`;

    const contactPage = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact({ palette }) {
  const { primary, accent, highlight, light } = palette;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-white/70">We'd love to hear from you</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm space-y-6"
        >
          <div>
            <label className="block text-white font-medium mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[${highlight}] transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[${highlight}] transition-colors"
              placeholder="Your email"
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">Message</label>
            <textarea
              required
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[${highlight}] transition-colors resize-none"
              placeholder="Your message"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full px-6 py-3 bg-[${highlight}] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}`;

    return {
        'src/App.jsx': appJsx,
        'src/pages/Home.jsx': homePage,
        'src/pages/Products.jsx': productsPage,
        'src/pages/About.jsx': aboutPage,
        'src/pages/Contact.jsx': contactPage,
    };
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
    generateMultiPageApp,
    COLOR_PALETTES,
    PRODUCT_DATA,
};
