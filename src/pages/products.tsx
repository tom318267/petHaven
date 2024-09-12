import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import pawPrintAnimation from "../../public/animations/paw-print-loader.json";

interface Product {
  _id: string;
  name: string;
  description: string;
  petType: string;
  petAge: number;
  price: number;
  category: string;
  image: string;
}

const PawPrintLoader = () => {
  return (
    <div className="w-24 h-24">
      <Lottie animationData={pawPrintAnimation} loop={true} />
    </div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate a longer loading time for testing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const productVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col justify-center items-center h-screen"
        >
          <PawPrintLoader />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xl text-gray-600"
          >
            Fetching products...
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-[#E5F5FF]"
        >
          <div className="container mx-auto px-4 py-16">
            {" "}
            {/* Updated: py-8 to py-16 */}
            {error ? (
              <div className="text-red-500 text-center text-xl">{error}</div>
            ) : (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl font-extrabold text-center mb-16 mt-8"
                >
                  Our Products
                </motion.h1>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 pb-16" // Added pb-16 here
                >
                  {products.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={productVariants}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                      <div className="relative h-64">
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h2 className="text-2xl font-semibold mb-4 mt-2">
                          {product.name}
                        </h2>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {product.description}
                        </p>
                        <div className="mt-auto flex justify-between items-center">
                          <span className="text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductsPage;
