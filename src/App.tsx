import React from 'react';
import Hero from './components/Hero';
import ServiceCard from './components/ServiceCard';
import Testimonials from './components/Testimonials';

const App: React.FC = () => {
  const services = [
    { title: 'Web Design', description: 'Custom website designs tailored to your brand.', price: 99 },
    { title: 'Development', description: 'Full-stack web application development.', price: 199 },
    { title: 'SEO Optimization', description: 'Improve your search engine rankings.', price: 149 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </main>
      <Testimonials />
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;