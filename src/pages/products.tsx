import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import pawPrintAnimation from "../../public/animations/paw-print-loader.json";
import { FaChevronDown } from "react-icons/fa";

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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        // Simulate a longer loading time for testing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch("/api/products", {
          signal: controller.signal, // Linking the abort signal
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);

        // Set filtered products only if no filter is applied
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(
            data.map((product: Product) => String(product.category))
          ) as Set<string>
        );
        setCategories(["All", ...uniqueCategories]);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Fetch request was cancelled");
        } else {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred"
          );
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    // Cleanup function to abort fetch if the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
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
            {error ? (
              <div className="text-red-500 text-center text-xl">{error}</div>
            ) : (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl font-extrabold text-center mb-16 mt-8"
                >
                  Our Products
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 flex justify-end"
                >
                  <div>
                    <label
                      htmlFor="category-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Filter by Category
                    </label>
                    <div className="relative">
                      <select
                        id="category-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="block appearance-none w-64 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category === "All"
                              ? "All Categories"
                              : capitalizeFirstLetter(category)}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 pb-16"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      variants={productVariants}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                    >
                      <div className="relative h-80">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "contain" }}
                          className="p-4"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h2 className="text-2xl font-semibold mb-3">
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
