/**
 * ⚡ FAST CODE GENERATOR - Template-Based
 * Goals:
 * - No API calls for common patterns
 * - Instant code generation
 * - 95% faster than Groq API
 * - Quality = API generated code
 */

const fs = require('fs');
const path = require('path');

// ============================================
// INSTANT APP.JSX TEMPLATE - No API needed!
// ============================================

module.exports.generateFastApp = (config) => {
    const {
        websiteName = 'My Business',
        businessType = 'gym', // gym, salon, ecommerce, portfolio
        hasContact = true,
        hasBooking = false,
        hasProducts = true,
        hasTestimonials = true,
        primaryColor = '#3B82F6',
        accentColor = '#F59E0B',
    } = config;

    // Build navbar
    const navbar = `
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{color: '${primaryColor}'}}>${websiteName}</h1>
        <ul className="hidden md:flex gap-6">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#services" className="hover:underline">Services</a></li>
          ${hasProducts ? '<li><a href="#products" className="hover:underline">Products</a></li>' : ''}
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
        <button className="md:hidden">☰</button>
      </div>
    </nav>`;

    // Build hero
    const hero = `
    <section id="home" className="min-h-96 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">${websiteName}</h2>
        <p className="text-xl mb-8">Welcome to your online presence</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded font-bold hover:scale-105 transition">
          Get Started
        </button>
      </div>
    </section>`;

    // Build services/products
    const services = hasProducts ? `
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${['Service 1', 'Service 2', 'Service 3'].map((service, i) => `
            <div key="${i}" className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-16 h-16 rounded-full mb-4" style={{backgroundColor: '${accentColor}'}}></div>
              <h3 className="text-xl font-bold mb-4">${service}</h3>
              <p className="text-gray-600">High quality service tailored to your needs</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>` : '';

    // Build contact
    const contact = hasContact ? `
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          <textarea
            placeholder="Message"
            className="w-full mb-4 px-4 py-2 border rounded"
            rows="5"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-2 rounded font-bold text-white transition"
            style={{backgroundColor: '${primaryColor}'}}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>` : '';

    const fullCode = \`import React, { useState } from 'react';

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      \${navbar}
      \${hero}
      \${services}
      \${contact}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2026 ${websiteName}. All rights reserved.</p>
      </footer>
    </div>
  );
}
\`;

  return fullCode;
};

// ============================================
// PACKAGE.JSON TEMPLATE
// ============================================

module.exports.generatePackageJson = (websiteName) => {
  return {
    name: websiteName.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
    },
    dependencies: {
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'framer-motion': '^10.16.4',
      '@supabase/supabase-js': '^2.39.3',
    },
    devDependencies: {
      '@vitejs/plugin-react': '^4.2.1',
      vite: '^4.4.0',
      tailwindcss: '^3.3.2',
      autoprefixer: '^10.4.14',
      postcss: '^8.4.24',
    },
  };
};

// ============================================
// INDEX.CSS TEMPLATE
// ============================================

module.exports.generateIndexCss = () => {
  return \`@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
\`;
};

// ============================================
// VITE CONFIG TEMPLATE
// ============================================

module.exports.generateViteConfig = () => {
  return \`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
\`;
};

// ============================================
// TAILWIND CONFIG TEMPLATE
// ============================================

module.exports.generateTailwindConfig = () => {
  return \`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        accent: '#F59E0B',
      },
    },
  },
  plugins: [],
};
\`;
};

// ============================================
// MAIN.JSX TEMPLATE
// ============================================

module.exports.generateMainJsx = () => {
  return \`import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
\`;
};

// ============================================
// INDEX.HTML TEMPLATE
// ============================================

module.exports.generateIndexHtml = (websiteName) => {
  return \`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>\${websiteName}</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
\`;
};

// ============================================
// BATCH CODE GENERATION - ALL FILES AT ONCE
// ============================================

module.exports.generateAllFiles = (config) => {
  const { websiteName = 'My Business' } = config;

  return {
    'src/App.jsx': module.exports.generateFastApp(config),
    'src/main.jsx': module.exports.generateMainJsx(),
    'src/index.css': module.exports.generateIndexCss(),
    'index.html': module.exports.generateIndexHtml(websiteName),
    'vite.config.js': module.exports.generateViteConfig(),
    'tailwind.config.js': module.exports.generateTailwindConfig(),
    'package.json': JSON.stringify(module.exports.generatePackageJson(websiteName), null, 2),
    'postcss.config.js': \`export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};\`,
  };
};

// ============================================
// CACHE SYSTEM - Store Generated Code
// ============================================

const codeCache = new Map();

module.exports.getCachedCode = (configHash) => {
  return codeCache.get(configHash);
};

module.exports.cacheCodes = (configHash, code) => {
  codeCache.set(configHash, code);
  return code;
};

module.exports.generateCodeHash = (config) => {
  const str = JSON.stringify(config);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

// ============================================
// FAST GENERATION WRAPPER
// ============================================

module.exports.generateFastWebsite = (config) => {
  const start = Date.now();

  // Check cache first
  const configHash = module.exports.generateCodeHash(config);
  const cached = module.exports.getCachedCode(configHash);

  if (cached) {
    console.log('✅ Code from cache (0ms)');
    return cached;
  }

  // Generate all files
  const allFiles = module.exports.generateAllFiles(config);

  // Cache for next time
  module.exports.cacheCodes(configHash, allFiles);

  const elapsed = Date.now() - start;
  console.log(\`✅ Code generated in \${elapsed}ms (from templates)\`);

  return allFiles;
};

// ============================================
// USAGE EXAMPLE
// ============================================

if (require.main === module) {
  const config = {
    websiteName: 'Iron Forge Gym',
    businessType: 'gym',
    hasContact: true,
    hasBooking: true,
    hasProducts: true,
    hasTestimonials: true,
    primaryColor: '#FF6B35',
    accentColor: '#FFA500',
  };

  const startTime = Date.now();
  const files = module.exports.generateFastWebsite(config);
  const elapsed = Date.now() - startTime;

  console.log(\`\n⚡ Generated \${Object.keys(files).length} files in \${elapsed}ms!\`);
  console.log('Files:', Object.keys(files));

  // Test cache - should be instant
  console.log('\nTesting cache...');
  const cachedStart = Date.now();
  const cachedFiles = module.exports.generateFastWebsite(config);
  const cachedElapsed = Date.now() - cachedStart;

  console.log(\`✅ Cached result in \${cachedElapsed}ms!\`);
}
