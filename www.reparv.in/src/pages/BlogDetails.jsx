import React from "react";
import { useState, useEffect } from "react";
import HomePropertySection from "../components/home/HomePropertySection";
import { useAuth } from "../store/auth";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO";
import SocialShare from "../components/SocialShare";

function BlogDetails() {
  const { URI, selectedCity } = useAuth();
  const { blogId } = useParams();
  const [blog, setBlog] = useState();

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/blog/details/${blogId}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <SEO
        title={
          blog?.seoTittle ||
          "Buy Property in Nagpur Easily with Reparv’s Expert Help"
        }
        description={
          blog?.seoDescription ||
          "Looking to buy property in Nagpur or nearby? Reparv provides full support from site visits and loans to legal documentation and registry — making real estate hassle-free."
        }
      />
      <div className="w-full">
        {/* Blog Top BackGround */}
        <div className="w-full flex flex-col items-center justify-center backImage relative">
          <img
            src={
              URI + blog?.image ||
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            }
            alt={blog?.tittle}
            className="w-full max-w-[1200px] mx-auto object-cover"
          />
        </div>

        {/* Blog Section */}
        <div className="max-w-6xl py-6 mx-auto px-4 sm:px-6">
          <div className="flex items-center pb-4 mb-6 border-b border-[#0000001A] ">
            <div
              style={{
                background: "linear-gradient(270deg, #076300 0%, #0BB501 100%)",
              }}
              className="h-10 w-10 text-xl flex items-center justify-center rounded-full bg-green-600 text-white font-bold"
            >
              R
            </div>
            <div className="ml-3">
              <p className="text-sm font-semibold">Reparv Team</p>
              <p className="text-xs text-gray-500">{blog?.updated_at}</p>
            </div>
          </div>

          <div className="hidden lg:block registerForm w-full max-w-[1050px] mb-5">
            <h2 className="text-3xl font-semibold text-[black]">
              {blog?.tittle}
            </h2>
          </div>
          
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />

          <hr className="my-6 text-[#0000001A] " />
          
          <SocialShare label={"Share this article"} url={"https://www.reparv.in/blog/"+blogId} ></SocialShare>
        </div>

        {/* Properties Section */}
        <HomePropertySection city={selectedCity} />
      </div>
    </>
  );
}

export default BlogDetails;
