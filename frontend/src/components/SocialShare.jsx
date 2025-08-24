import React, { useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaInstagram,
  FaShareFromSquare,
} from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";

export default function SocialShare({ label, url }) {
  const [showShare, setShowShare] = useState(false);

  // Function to handle Instagram sharing (opens Instagram with the link)
  const shareOnInstagram = () => {
    const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(
      url
    )}`;
    window.open(instagramUrl, "_blank");
  };

  // Function to copy the URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!"); // You can replace this with a toast notification
  };

  return (
    <div className="relative text-center">
      {/* Share Button */}

      <div
        className="flex gap-2 cursor-pointer active:scale-95"
        onClick={() => setShowShare(!showShare)}
      >
        <span className="font-semibold">{label}</span>
        <FaShareFromSquare className="w-5 h-5 text-[#0b9d01]" />
      </div>

      {/* Conditionally Render Share Options */}
      {showShare && (
        <div className="z-10 flex py-4 rounded-lg gap-4">
          {/* Copy Link Button */}
          <button onClick={copyToClipboard}>
            <span className="w-10 h-10 flex items-center justify-center border rounded-md border-[#0000001A] cursor-pointer hover:text-white hover:bg-[#0BB501] active:scale-95">
              <MdContentCopy className="w-6 h-6" />
            </span>
          </button>

          <FacebookShareButton url={url}>
            <span className="w-10 h-10 flex items-center justify-center border rounded-md border-[#0000001A] cursor-pointer hover:text-white hover:bg-[#0BB501] active:scale-95">
              <FaFacebook className="w-6 h-6" />
            </span>
          </FacebookShareButton>

          {/* Instagram Share Button */}
          <button onClick={shareOnInstagram}>
            <span className="w-10 h-10 flex items-center justify-center border rounded-md border-[#0000001A] cursor-pointer hover:text-white hover:bg-[#0BB501] active:scale-95">
              <FaInstagram className="w-6 h-6" />
            </span>
          </button>

          <LinkedinShareButton url={url}>
            <span className="w-10 h-10 flex items-center justify-center border rounded-md border-[#0000001A] cursor-pointer hover:text-white hover:bg-[#0BB501] active:scale-95">
              <FaLinkedin className="w-6 h-6" />
            </span>
          </LinkedinShareButton>

          <WhatsappShareButton url={url}>
            <span className="w-10 h-10 flex items-center justify-center border rounded-md border-[#0000001A] cursor-pointer hover:text-white hover:bg-[#0BB501] active:scale-95">
              <FaWhatsapp className="w-6 h-6" />
            </span>
          </WhatsappShareButton>
        </div>
      )}
    </div>
  );
}
