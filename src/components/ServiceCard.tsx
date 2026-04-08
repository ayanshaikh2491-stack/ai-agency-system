import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="text-right">
        <span className="text-blue-500 font-bold text-xl">${price}/month</span>
      </div>
    </div>
  );
};

export default ServiceCard;