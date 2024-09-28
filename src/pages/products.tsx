import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import pawPrintAnimation from "../../public/animations/paw-print-loader.json";
import { FaChevronDown, FaSort } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Toaster, toast, ToastOptions } from "react-hot-toast";

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
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("default");
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

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

    const minLoadTime = 1000; // 1 second minimum display time
    const loadingTimer = setTimeout(() => setShowLoader(false), minLoadTime);

    fetchProducts();
    return () => {
      controller.abort();
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    // First, filter the products based on the selected category
    const newFilteredProducts =
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    // After filtering, apply sorting
    let sorted = [...newFilteredProducts];
    switch (sortOption) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
  }, [selectedCategory, products, sortOption]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

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
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const user = useSelector((state: RootState) => state.auth.user);

  const toastOptions: ToastOptions = {
    duration: 3000,
    style: {
      background: "#2463EB", // Green background
      color: "#ffffff", // White text
    },
  };

  return (
    <AnimatePresence mode="wait">
      <Toaster position="bottom-right" toastOptions={toastOptions} />
      {isLoading || showLoader ? (
        <section className="loading-section flex flex-col justify-center items-center h-screen">
          <PawPrintLoader />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xl text-gray-600"
          >
            Fetching products...
          </motion.p>
        </section>
      ) : (
        <section className="products-page min-h-screen bg-[#E5F5FF]">
          <div className="container mx-auto px-4 py-12 sm:py-24">
            {error ? (
              <div className="text-red-500 text-center text-xl">{error}</div>
            ) : (
              <>
                <section className="page-header text-center mb-8 sm:mb-12">
                  <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-5xl font-extrabold mb-4 sm:mb-8"
                  >
                    Our Products
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-gray-600 max-w-4xl mx-auto text-base sm:text-lg mt-2 sm:mt-4"
                  >
                    Discover our wide range of high-quality pet products. From
                    nutritious food to comfortable accessories, we offer
                    everything your furry friend needs for a happy, healthy
                    life. Our carefully curated selection ensures that you'll
                    find the perfect items for your beloved pets, no matter
                    their size, breed, or preferences.
                  </motion.p>
                </section>
                <section className="product-filters mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="sort-filter relative w-full sm:w-auto">
                    <label
                      htmlFor="sort-select"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Sort by
                    </label>
                    <div className="relative">
                      <select
                        id="sort-select"
                        value={sortOption}
                        onChange={handleSortChange}
                        className="block appearance-none w-full sm:w-48 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                      >
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <FaSort className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <div className="category-filter relative w-full sm:w-auto">
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
                        className="block appearance-none w-full sm:w-64 bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-10 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500 focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
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
                </section>
                <section className="product-grid">
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                  >
                    {filteredProducts.map((product) => (
                      <motion.article
                        key={product._id}
                        variants={productVariants}
                        whileHover={{ scale: 1.05 }}
                        className="product-card bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
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
                        <div className="p-6 flex flex-col h-full">
                          <h2 className="text-2xl font-semibold mb-3">
                            {product.name}
                          </h2>
                          <p className="text-gray-600 mb-4 flex-grow overflow-y-auto">
                            {product.description}
                          </p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-lg font-bold">
                              ${product.price.toFixed(2)}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                console.log("Adding to cart:", {
                                  id: product._id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.image,
                                });
                                dispatch(
                                  addToCart({
                                    id: product._id,
                                    name: product.name,
                                    price: product.price,
                                    userId: user?.name || "guest",
                                    image: product.image,
                                  })
                                );
                                // Update the toast notification
                                toast.success(
                                  `${product.name} added to cart!`,
                                  toastOptions
                                );
                              }}
                              className="bg-[#E65000] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#CC4700] transition shadow-md"
                            >
                              Add to Cart
                            </motion.button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </motion.div>
                </section>
                {filteredProducts.length === 0 && (
                  <section className="no-results mt-8 text-center">
                    <p>
                      We couldn&apos;t find any products matching your criteria.
                      Please try adjusting your filters.
                    </p>
                  </section>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </AnimatePresence>
  );
};

export default ProductsPage;
