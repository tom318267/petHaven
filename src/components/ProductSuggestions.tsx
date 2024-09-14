import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

const ProductSuggestions = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const products: Product[] = [
    {
      id: "1",
      name: "KONG® Teddy Bear Dog Toy",
      description:
        "Soft plush teddy bear with squeaker for gentle play and comfort. Ideal for dogs who enjoy light chewing or need a cozy companion.",
      image: "/images/teddydogtoy.png",
      price: 8.0,
    },
    {
      id: "2",
      name: "Blue Buffalo® Life Protection Formula™",
      description:
        "Natural dry dog food with real deboned chicken. Enhanced with vitamins and minerals for immune health and overall well-being.",
      image: "/images/bluebuffalo.png",
      price: 10.0,
    },
    {
      id: "3",
      name: "Top Paw® Orthopedic Mattress Dog Bed",
      description:
        "Supportive foam core bed for senior dogs and those with joint issues. Provides comfort and easy access with a low-profile design.",
      image: "/images/bed.png",
      price: 15.0,
    },
  ];

  const truncateDescription = (description: string, wordCount: number) => {
    const words = description.split(" ");
    if (words.length <= wordCount) return description;
    return words.slice(0, wordCount).join(" ") + "...";
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-[#2463EB] text-center mb-8">
          Our Featured Products
        </h2>
        <p className="text-lg text-[#1A1A1A] text-center mb-12">
          Find the perfect products for your furry friend! Whether you're
          looking for toys, grooming essentials, or nutritional food, we've got
          you covered. Here are some of our top picks tailored to meet the
          unique needs of your dog.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-blue-100 p-6 rounded-xl max-w-sm mx-auto flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image */}
              <div className="flex justify-center flex-shrink-0">
                <img
                  src={product.image}
                  alt="product image"
                  className="h-48 w-48 object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="mt-4 text-center flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2">
                  {truncateDescription(product.description, 20)}
                </p>
              </div>

              {/* Price and Button */}
              <div className="mt-4 flex items-center justify-between flex-shrink-0">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
                >
                  Add To Cart
                </motion.button>
              </div>
            </div>
          ))}
        </div>

        {/* Add View All link aligned to the right */}
        <div className="mt-8 text-right">
          <motion.a
            href="/products" // Replace with the actual link to all products
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition"
          >
            View All
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProductSuggestions;
