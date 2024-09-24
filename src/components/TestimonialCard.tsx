import React from "react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  location: string;
  image: string;
  text: string;
  title: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  location,
  image,
  text,
  title,
}) => {
  return (
    <div className="bg-[#E5F5FF] rounded-lg p-6 shadow-lg max-w-3xl mx-auto mb-8">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 mr-4 relative">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">{location}</p>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{text}</p>
      <p className="text-base text-gray-600 italic">
        <span className="inline-block w-4 h-[1px] bg-gray-400 mr-2 align-middle"></span>
        {title}
      </p>
    </div>
  );
};

export default TestimonialCard;
