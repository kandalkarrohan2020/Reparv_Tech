import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  FaWhatsapp,
  FaLink,
  FaShareAlt,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { useAuth } from "../../store/auth";

function Share() {
  const { URI, setShowSharePopup } = useAuth();
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/propertyinfo/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setPropertyInfo(data);
      console.log(data);
      //setPropertyCategory(data.propertyCategory);
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const propertyUrl = `https://www.reparv.in/property-info/${
    propertyInfo?.seoSlug || id
  }`;

  // Build formatted WhatsApp message
  const buildPropertyShareText = (property) => {
    return `✨ Best Property on Reparv! ✨
             🏠 Property             
             📝 Name: ${property?.propertyName}             
             📍 Location: ${property?.location}, ${property?.city}             
             💰 Price: ₹${             
                    property?.totalOfferPrice || property?.price || "Contact for Price"             

                 }             
             🔗 Check out full details, photos, and book a visit:             
             ${propertyUrl}

             Don't miss this opportunity! 🚀 `;
  };

  // WhatsApp share
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(buildPropertyShareText(propertyInfo));
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  // Facebook share
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      propertyUrl
    )}`;
    window.open(url, "_blank");
  };

  // Instagram share (no direct API)
  const handleInstagramShare = () => {
    navigator.clipboard.writeText(propertyUrl);
    alert(
      "Property link copied! Open Instagram and paste it in a post or story."
    );
    window.open("https://www.instagram.com/", "_blank");
  };

  // Copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(propertyUrl);
    alert("Property link copied to clipboard!");
  };

  // Native share
  const handleNativeShare = async () => {
    try {
      const message = buildPropertyShareText(propertyInfo);
      if (navigator.share) {
        await navigator.share({
          title: "Share Property",
          text: message,
          url: propertyUrl,
        });
      } else {
        alert("Native sharing not supported on this browser.");
      }
    } catch (error) {
      console.warn("Error sharing:", error);
    }
  };

  return (
    <div className="absolute bottom-0 pb-10 md:top-[150px] max-w-3xl overflow-scroll scrollbar-hide mx-auto w-full md:w-[600px] h-350px sm:max-h-[300px] bg-white rounded-tl-2xl rounded-tr-2xl sm:rounded-xl shadow-xl p-6 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-5">
        <h2 className="text-xl font-semibold">Share Property</h2>
        <RxCross2
          onClick={() => setShowSharePopup(false)}
          className="w-6 h-6 sm:w-7 sm:h-7 font-semibold cursor-pointer hover:text-[#076300] active:scale-95"
        />
      </div>

      {/* Share options */}
      <div className="grid grid-cols-3 gap-6 mt-6 pb-10 sm:pb-5">
        {/* WhatsApp */}
        <button
          onClick={handleWhatsAppShare}
          className="flex flex-col items-center text-green-600 hover:scale-105"
        >
          <FaWhatsapp size={32} />
          <span className="text-sm mt-1">WhatsApp</span>
        </button>

        {/* Facebook */}
        <button
          onClick={handleFacebookShare}
          className="flex flex-col items-center text-blue-600 hover:scale-105"
        >
          <FaFacebook size={32} />
          <span className="text-sm mt-1">Facebook</span>
        </button>

        {/* Instagram */}
        <button
          onClick={handleInstagramShare}
          className="flex flex-col items-center text-pink-600 hover:scale-105"
        >
          <FaInstagram size={32} />
          <span className="text-sm mt-1">Instagram</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex flex-col items-center text-gray-600 hover:scale-105"
        >
          <FaLink size={32} />
          <span className="text-sm mt-1">Copy Link</span>
        </button>

        {/* Native Share */}
        <button
          onClick={handleNativeShare}
          className="flex flex-col items-center text-purple-600 hover:scale-105"
        >
          <FaShareAlt size={32} />
          <span className="text-sm mt-1">More</span>
        </button>
      </div>
    </div>
  );
}

export default Share;
