import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Lottie from "lottie-react";
import pawPrintAnimation from "../../../public/animations/paw-print-loader.json";

interface BlogPost {
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

const BlogPostPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlogPost = async () => {
      try {
        // Simulate a longer loading time for testing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Blog post not found");
          }
          throw new Error(`Failed to fetch blog post: ${response.statusText}`);
        }
        const data = await response.json();
        setBlogPost(data);
      } catch (err: unknown) {
        console.error("Error fetching blog post:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Date unavailable";
    try {
      const date = parseISO(dateString);
      return format(date, "MMMM d, yyyy");
    } catch (error) {
      console.error("Error parsing date:", dateString, error);
      return "Date unavailable";
    }
  };

  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
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
            Fetching blog post...
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="min-h-screen bg-[#E5F5FF] py-12"
        >
          <div className="container mx-auto px-4 max-w-4xl">
            {error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : !blogPost ? (
              <div className="text-center py-10">Blog post not found</div>
            ) : (
              <>
                <motion.div variants={itemVariants}>
                  <Link href="/blogs" passHref>
                    <button className="mb-6 text-blue-500 hover:text-blue-600 transition duration-300">
                      ← Back to Blogs
                    </button>
                  </Link>
                </motion.div>
                <motion.div
                  className="bg-white rounded-lg shadow-md p-8"
                  variants={itemVariants}
                >
                  <motion.h1
                    className="text-4xl font-bold mb-4"
                    variants={itemVariants}
                  >
                    {blogPost.title}
                  </motion.h1>
                  <motion.div
                    className="mb-6 text-gray-600"
                    variants={itemVariants}
                  >
                    <span>By {blogPost.author}</span>
                    <span className="mx-2">|</span>
                    <span>{formatDate(blogPost.createdAt)}</span>
                  </motion.div>
                  {blogPost.image && (
                    <motion.div
                      className="mb-8 relative w-full h-96"
                      variants={itemVariants}
                    >
                      <Image
                        src={blogPost.image}
                        alt={blogPost.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </motion.div>
                  )}
                  <motion.div
                    className="prose max-w-none mb-8"
                    dangerouslySetInnerHTML={createMarkup(blogPost.content)}
                    variants={itemVariants}
                  />
                  {blogPost.tags && (
                    <motion.div className="mb-8" variants={itemVariants}>
                      {blogPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >
                          #{tag}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogPostPage;
