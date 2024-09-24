import React from "react";

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  link,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-sm mx-auto">
      <div className="flex justify-center items-center w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={link}
        className="text-teal-600 hover:text-teal-800 font-semibold flex justify-center items-center"
      >
        Shop Now <span className="ml-2">→</span>
      </a>
    </div>
  );
};

// Main component to render the services
const ServicesSection: React.FC = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<i className="fas fa-dog text-3xl text-teal-600"></i>}
            title="Best Quality Pet Foods"
            description="Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus magna justo."
            link="#"
          />
          <ServiceCard
            icon={<i className="fas fa-paw text-3xl text-orange-600"></i>}
            title="Huge Collection of Toys & Supplies"
            description="Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor."
            link="#"
          />
          <ServiceCard
            icon={<i className="fas fa-cut text-3xl text-gray-600"></i>}
            title="Full Service Grooming"
            description="Nulla quis lorem ut libero malesuada feugiat. Vestibulum ante ipsum primis in faucibus."
            link="#"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
