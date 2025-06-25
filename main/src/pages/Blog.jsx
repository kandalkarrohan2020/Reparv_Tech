import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { useAuth } from "../store/auth";

function Blog() {
  const { URI } = useAuth();
  const [blogs, setBlogs] = useState([]);

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/blog`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch blogs.");
      const data = await response.json();
      console.log(data);
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching Blogs:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SEO
        title={"Real Estate Insights, Tips & News – Reparv Blog"}
        description={
          "Stay updated with the latest real estate trends, buyer guides, investment tips, and local property news."
        }
      />
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
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow rounded-lg overflow-hidden transition hover:shadow-md"
              >
                <img
                  src={
                    URI + blog?.image ||
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  }
                  alt={blog?.tittle}
                  className="h-60 w-full object-cover"
                />

                <div className="flex flex-col gap-2 p-4 ">
                  <p className="text-sm text-[#00000099] mb-2">
                    {blog?.updated_at}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {blog?.tittle}
                  </h2>
                  <p className="text-[#000000] font-normal text-base mb-4">
                    {blog?.description}
                  </p>
                  <Link
                    to={`/blog/${blog.seoSlug}`}
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
    </>
  );
}

export default Blog;
