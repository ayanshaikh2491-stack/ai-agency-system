import React from 'react';

const CTA1 = ({ title, subtitle, buttonText, buttonLink, secondaryButtonText, secondaryButtonLink, inverse }) => {
  const bgClass = inverse ? 'bg-white' : 'bg-indigo-600';
  const textClass = inverse ? 'text-gray-900' : 'text-white';
  const secondaryTextClass = inverse ? 'text-indigo-600' : 'text-white';
  const secondaryBgClass = inverse ? 'bg-indigo-600' : 'bg-white';
  const secondaryHoverBgClass = inverse ? 'bg-indigo-700' : 'bg-indigo-500';
  const borderClass = inverse ? 'border border-indigo-600' : '';

  return (
    <section className={`${bgClass} py-16 text-center ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`${textClass} text-3xl font-bold mb-6`}>
          {title}
        </h2>
        <p className={`${textClass} text-lg mb-8 max-w-2xl mx-auto`}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
          <a
            href={buttonLink}
            className={`inline-block bg-indigo-600 ${textClass} px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors sm:w-auto w-full`}
          >
            {buttonText}
          </a>
          {secondaryButtonText && secondaryButtonLink && (
            <a
              href={secondaryButtonLink}
              className={`mt-4 sm:mt-0 inline-block ${secondaryBgClass} ${secondaryTextClass} px-6 py-3 rounded-md font-medium hover:${secondaryHoverBgClass} transition-colors sm:w-auto w-full`}
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTA1;
