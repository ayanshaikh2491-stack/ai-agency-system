import React from 'react';

const Testimonials1 = ({ testimonials, title, subtitle, className = '' }) => {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title || subtitle && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-8">
          <div className="relative h-48 w-full overflow-hidden rounded-lg bg-gray-100">
            <div className="absolute inset-0 grid items-start grid-cols-12 gap-4 p-6">
              {/* Navigation arrows */}
              <button className="col-start-2 row-start-1 flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Previous slide">
                {/* Heroicon name: outline/chevron-left */}
                <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="col-start-12 row-start-1 flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Next slide">
                {/* Heroicon name: outline/chevron-right */}
                <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Slides */}
              <div className="col-start-2 col-span-10 row-start-1 flex-1 flex flex-col items-start justify-center space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="hidden md:block space-y-4">
                    <blockquote className="text-lg text-gray-700 italic">
                      <p>"{testimonial.content}"</p>
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      {testimonial.imageUrl ? (
                        <img 
                          src={testimonial.imageUrl} 
                          alt={testimonial.name} 
                          className="h-10 w-10 rounded-full object-cover border-2 border-indigo-200"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile testimonials */}
          <div className="hidden md:hidden space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <blockquote className="text-gray-700 italic mb-4">
                  <p>"{testimonial.content}"</p>
                </blockquote>
                <div className="flex items-center space-x-3">
                  {testimonial.imageUrl ? (
                    <img 
                      src={testimonial.imageUrl} 
                      alt={testimonial.name} 
                      className="h-10 w-10 rounded-full object-cover border-2 border-indigo-200"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials1;