import React from "react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title:
      "Great News! Reparv.in, Your Reliable Property Platform in Nagpur, Is On the Way",
    date: "May 18, 2025",
    description:
      "We are excited to report that Reparv.in, your new go-to resource for all things real estate...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 2,
    title: "5 Things to Consider When Buying Property in Nagpur",
    date: "May 18, 2025",
    description:
      "Buying property is a significant investment, especially in a rapidly growing city like...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 3,
    title: "The Growing Real Estate Market in Nagpur",
    date: "May 18, 2025",
    description:
      "Nagpur's real estate market is witnessing significant growth with new developments...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 4,
    title: "How to Sell Your Property Fast in Nagpur's Competitive Market",
    date: "May 18, 2025",
    description:
      "Looking to sell your property in Nagpur? Here’s how to stand out in the competitive market...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 5,
    title: "Rental Property Management: A Guide for Nagpur Owners",
    date: "May 18, 2025",
    description:
      "Managing rental properties can be complex. Learn how to streamline and protect your investments...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
];

function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center pb-5 py-4 sm:py-10">
        <h2 className="text-black text-lg sm:text-3xl leading-[100%] font-semibold">
          Latest From Our Blog
        </h2>
        <span className="max-w-[650px] text-xs sm:text-base text-center text-[#999999] font-medium mx-auto">
          Stay updated with the latest real estate news, trends, and insights
          from Nagpur.
        </span>
        <div className="mx-auto w-30 h-[2px] sm:h-1 bg-[#0BB501] "></div>
        <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-lg overflow-hidden transition hover:shadow-md"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-60 w-full object-cover"
                />
              )}
              <div className="flex flex-col gap-2 p-4 ">
                <p className="text-sm text-[#00000099] mb-2">{post.date}</p>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-[#000000] font-normal text-base mb-4">{post.description}</p>
                <Link
                  to="/blog-details"
                  className="text-[#0078DB] text-base font-medium flex items-center gap-1"
                >
                  Read More <span>&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
