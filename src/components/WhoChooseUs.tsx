import React from "react";
import { FaTruck, FaSeedling, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h2 className="text-5xl font-extrabold text-[#2463EB] text-center mb-8">
          Why Choose <span className="text-blue-600">Pet Haven?</span>
        </h2>
        <p className="text-lg text-[#1A1A1A] text-center mb-12 max-w-5xl mx-auto">
          Discover why pet owners love Pet Haven! Our commitment to quality,
          care, and convenience makes us the top choice for all your pet's
          needs.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Free Shipping */}
          <div className="group bg-blue-100 p-8 rounded-lg shadow-lg text-center hover:bg-blue-200 transition duration-300">
            <div className="flex justify-center items-center mb-4">
              <FaTruck className="text-5xl text-blue-600 group-hover:text-blue-800 transition duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
              Free Shipping
            </h3>
            <p className="text-gray-700">
              Enjoy fast, free shipping on all orders over $50. Get your pet
              supplies delivered right to your door with ease.
            </p>
          </div>

          {/* Feature 2: Eco-Friendly Products */}
          <div className="group bg-green-100 p-8 rounded-lg shadow-lg text-center hover:bg-green-200 transition duration-300">
            <div className="flex justify-center items-center mb-4">
              <FaSeedling className="text-5xl text-green-600 group-hover:text-green-800 transition duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-green-600">
              Eco-Friendly Products
            </h3>
            <p className="text-gray-700">
              We prioritize eco-friendly products, ensuring that your pet's care
              contributes to a sustainable future for the planet.
            </p>
          </div>

          {/* Feature 3: 24/7 Customer Support */}
          <div className="group bg-yellow-100 p-8 rounded-lg shadow-lg text-center hover:bg-yellow-200 transition duration-300">
            <div className="flex justify-center items-center mb-4">
              <FaHeadset className="text-5xl text-yellow-600 group-hover:text-yellow-800 transition duration-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-yellow-600">
              24/7 Customer Support
            </h3>
            <p className="text-gray-700">
              Our support team is always available to assist you. Have
              questions? We're here 24/7 to help you and your furry friends!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
