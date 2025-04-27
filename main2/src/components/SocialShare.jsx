import React, { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaInstagram, FaShareFromSquare, } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";

export default function SocialShare({ url }) {
  const [showShare, setShowShare] = useState(false);

  // Function to handle Instagram sharing (opens Instagram with the link)
  const shareOnInstagram = () => {
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(url)}`;
    window.open(instagramUrl, "_blank");
  };

  // Function to copy the URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!"); // You can replace this with a toast notification
  };

  return (
    <div className="text-center relative">
      {/* Share Button */}
      
      <div className=" sm:w-25 pr-4 sm:p-2 h-full flex items-center justify-center gap-2  cursor-pointer active:scale-95" onClick={() => setShowShare(!showShare)} >
      <span className="hidden sm:block font-semibold">Share</span>
      <FaShareFromSquare
        className="w-5 h-5 text-[#0b9d01]"
        
      />
      </div>

      {/* Conditionally Render Share Options */}
      {showShare && (
        <div className="absolute z-10 flex flex-col top-12 left-1/4 sm:left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-md rounded-lg gap-5 border-2 border-[#0BB501]">
          {/* Copy Link Button */}
          <button onClick={copyToClipboard}>
            <MdContentCopy size={24} className="text-[#0BB501] cursor-pointer" />
          </button>
          
          <FacebookShareButton url={url}>
            <FaFacebook size={24} className="text-blue-600 cursor-pointer" />
          </FacebookShareButton>

          {/* Instagram Share Button */}
          <button onClick={shareOnInstagram}>
            <FaInstagram size={24} className="text-red-600 cursor-pointer" />
          </button>

          <LinkedinShareButton url={url}>
            <FaLinkedin size={24} className="text-blue-700 cursor-pointer" />
          </LinkedinShareButton>

          <WhatsappShareButton url={url}>
            <FaWhatsapp size={26} className="text-[#0BB501] cursor-pointer" />
          </WhatsappShareButton>

        </div>
      )}
    </div>
  );
}