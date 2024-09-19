import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import Lottie from "lottie-react";
import pawPrintAnimation from "../../public/animations/paw-print-loader.json";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  tags?: string[];
  createdAt: string;
}

const PawPrintLoader = () => {
  return (
    <div className="w-24 h-24">
      <Lottie animationData={pawPrintAnimation} loop={true} />
    </div>
  );
};

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Simulate a longer loading time for testing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError("Error fetching blogs. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    console.log("Blogs data:", blogs);
  }, [blogs]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      return "Date unavailable";
    }

    try {
      console.log("Attempting to format date:", dateString);

      const date = parseISO(dateString);
      return format(date, "MMM d, yyyy");
    } catch (error) {
      console.error("Error parsing date:", dateString, error);
      return "Date unavailable";
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase()) ||
      blog.content.toLowerCase().includes(filter.toLowerCase()) ||
      (blog.tags &&
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(filter.toLowerCase())
        ))
  );

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
            Fetching blogs...
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
            {error ? (
              <div className="text-red-500 text-center text-xl">{error}</div>
            ) : (
              <>
                <motion.h1
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl font-extrabold text-center mb-6"
                >
                  Our Blog
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg"
                >
                  Stay informed and inspired with our latest articles on pet
                  care, health tips, and heartwarming stories. Our blog is your
                  go-to resource for all things pet-related.
                </motion.p>
                <div className="mb-8">
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map((blog) => (
                    <div key={blog._id} className="flex">
                      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full relative">
                        {blog.image ? (
                          <div className="relative w-full h-64">
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              layout="fill"
                              objectFit="cover"
                              onError={(e) => {
                                console.error(
                                  `Error loading image for ${blog.title}:`,
                                  e
                                );
                                e.currentTarget.src =
                                  "/path/to/fallback-image.jpg"; // Add a fallback image
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">
                              No image available
                            </span>
                          </div>
                        )}
                        <div className="p-4 flex flex-col flex-grow">
                          <h2 className="text-xl font-semibold mb-2">
                            {blog.title}
                          </h2>
                          <p className="text-gray-600 mb-4">
                            {blog.content.substring(0, 150)}...
                          </p>
                          <div className="mt-auto">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-500">
                                By {blog.author}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDate(blog.createdAt)}
                              </span>
                            </div>
                            {blog.tags && (
                              <div className="mb-4">
                                {blog.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 flex items-center">
                          <span className="text-blue-500 mr-1 text-sm font-medium">
                            Read more
                          </span>
                          <button
                            className="p-1 text-blue-500 hover:text-blue-600 transition duration-300"
                            onClick={() => {
                              // TODO: Implement navigation to full blog post
                              console.log(`View full blog post: ${blog._id}`);
                            }}
                            aria-label="Read more"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogsPage;
