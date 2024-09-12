import React, { useEffect, useState } from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  tags?: string[];
  createdAt: string;
}

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        console.log("Fetched blog data with dates:", data); // Debug log for fetched data
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
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
      // Log the date string to debug its format
      console.log("Attempting to format date:", dateString);

      const date = parseISO(dateString);
      return format(date, "MMM d, yyyy");
    } catch (error) {
      console.error("Error parsing date:", dateString, error);
      return "Date unavailable";
    }
  };

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-12 pt-8 text-center">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog._id} className="flex">
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col w-full">
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
                      e.currentTarget.src = "/path/to/fallback-image.jpg"; // Add a fallback image
                    }}
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  {blog.content.substring(0, 150)}...
                </p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {blog.author}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>
                  {blog.tags && (
                    <div className="mt-2">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
