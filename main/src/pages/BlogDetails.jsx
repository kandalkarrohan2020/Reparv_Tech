import React from "react";
import HomePropertySection from "../components/home/HomePropertySection";
import { useAuth } from "../store/auth";
import { FaFacebook, FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

function BlogDetails() {
  const { selectedCity } = useAuth();
  return (
    <div className="w-full">
      {/* Blog Top BackGround */}
      <div className="w-full flex flex-col items-center justify-center backImage relative">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt=""
          className="w-full max-h-[500px] max-w-[1600px] mx-auto object-cover"
        />
        <div className="absolute max-h-[500px] w-full max-w-[1600px] h-full backdrop-blur-[0.5px] bg-black/30">
          {" "}
        </div>
        {/* Text On BackImage */}
        <div className="hidden lg:block registerForm w-full max-w-[1050px] mx-auto absolute bottom-10 ">
          <p className="text-base text-white mb-2">May 18, 2025</p>
          <h2 className="text-4xl font-semibold text-[white] mb-2">
            Great News! Reparv.in, Your Reliable Property Platform in Nagpur, Is
            On the Way
          </h2>
        </div>
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
            <p className="text-xs text-gray-500">May 20, 2025</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          We are excited to report that Reparv.in, your new go-to resource for
          all things real estate in Nagpur, will soon launch! Whether you want
          to buy, sell, or rent a property, Reparv.in can help you make the
          process easier and more efficient.
        </p>

        <h2 className="font-bold text-md text-gray-900 mb-1">We Provide:</h2>

        <ul className="text-sm text-gray-700 space-y-2 mb-4">
          <li>
            <span className="font-semibold">Comprehensive Listings:</span> Look
            through a variety of residential and business properties in Nagpur,
            including prominent commercial spaces, modern flats, and roomy
            villas.
          </li>
          <li>
            <span className="font-semibold">Experience for Users:</span> With
            sophisticated filters and comprehensive property details, our site
            is made to make property searches quick and simple.
          </li>
          <li>
            <span className="font-semibold">Reliable Transactions:</span> To
            guarantee seamless purchasing, selling, and renting experiences, we
            place a high value on openness and security.
          </li>
          <li>
            <span className="font-semibold">Professional Help:</span> To make
            your real estate transactions hassle-free, our staff of real estate
            experts is committed to helping you at every stage.
          </li>
        </ul>

        <h2 className="font-bold text-md text-gray-900 mb-1">
          Reparv.in: Why Choose It?
        </h2>
        <p className="text-gray-700 mb-4">
          Finding the ideal property should be a fun, rather than a stressful,
          process because Nagpur is a city of opportunities. Reparv.in gives you
          access to a trustworthy platform that links you with vetted listings
          and reputable agents.
        </p>

        <h2 className="font-bold text-md text-gray-900 mb-1">
          Keep an eye out!
        </h2>
        <p className="text-gray-700 mb-4">
          Our website is currently being finalized and will shortly be launched.
          For news, exclusive deals, and professional advice on navigating the
          Nagpur real estate market, keep checking back here.
        </p>

        <h2 className="font-bold text-md text-gray-900 mb-1">
          Prepare to Use Reparv.in to Realize Your Real Estate Dreams!
        </h2>
        <p className="text-gray-700 mb-4">
          With Reparv.in, get ready to realize your real estate dreams!
          <br />
          Be the first to know when we launch by subscribing to our newsletter
          and following us on social media.
        </p>

        <h2 className="font-bold text-md text-gray-900 mb-1">Get in Touch</h2>
        <p className="text-gray-700 mb-4">
          Do you wish to share your property needs or have questions? We can be
          reached at <span className="font-semibold">+91 801 0881 965</span> or
          through our social media accounts.
          <br />I appreciate all of your help and patience. We hope to assist
          you in finding the ideal Nagpur property soon!
        </p>

        <hr className="my-6 text-[#0000001A] " />

        <div>
          <p className="text-lg font-medium mb-2">Share this article</p>
          <div className="flex gap-4">
            <Link className="w-10 h-10 flex items-center justify-center border rounded-md border-[#0000001A] cursor-pointer hover:border-[#0BB501] active:scale-95">
              <FaFacebook className="w-6 h-6" />
            </Link>
            <Link className="w-10 h-10 flex items-center justify-center border rounded-md border-[#0000001A] cursor-pointer hover:border-[#0BB501] active:scale-95 ">
              <FaLinkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <HomePropertySection city={selectedCity} />
    </div>
  );
}

export default BlogDetails;
