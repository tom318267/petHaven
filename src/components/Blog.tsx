import React from "react";
import Link from "next/link";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Pet Care Tips",
      slug: "pet-care-tips",
      excerpt: "Essential tips for keeping your pet healthy and happy.",
    },
    {
      id: 2,
      title: "Choosing the Right Food",
      slug: "choosing-right-food",
      excerpt: "A guide to selecting the best nutrition for your furry friend.",
    },
    {
      id: 3,
      title: "Training Techniques",
      slug: "training-techniques",
      excerpt: "Effective methods to train your pet and strengthen your bond.",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-display text-blue-600 mb-4">
        Pet Care Blog
      </h2>
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
          >
            <Link href={`/blog/${post.slug}`} className="group">
              <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
              <span className="text-sm text-primary font-medium mt-2 inline-block group-hover:underline">
                Read more
              </span>
            </Link>
          </div>
        ))}
      </div>
      <Link
        href="/blog"
        className="mt-4 inline-block text-primary font-medium hover:underline"
      >
        View all blog posts
      </Link>
    </div>
  );
};

export default Blog;
