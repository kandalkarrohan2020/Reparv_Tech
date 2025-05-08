import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../store/auth";

const PropertyImageGallery = ({ property }) => {
  const { URI } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("frontView");

  const imageCategories = {
    frontView: "Front View",
    sideView: "Side View",
    hallView: "Hall",
    kitchenView: "Kitchen",
    bathroomView: "Bathroom",
    bedroomView: "Bedroom",
    balconyView: "Balcony",
    nearestLandmark: "Landmark",
    developedAmenities: "Amenities",
  };

  // Helper to parse stringified image arrays
  const parseImages = (raw) => {
    if (!raw) return [];

    try {
      let parsed = raw;

      // If double-stringified
      if (
        typeof parsed === "string" &&
        parsed.startsWith("[") &&
        parsed.includes("\\")
      ) {
        parsed = JSON.parse(parsed); // Remove first layer
        if (typeof parsed === "string") parsed = JSON.parse(parsed);
      } else if (typeof parsed === "string") {
        parsed = JSON.parse(parsed); // If normal JSON string
      }

      return Array.isArray(parsed) ? parsed.map((img) => img.trim()) : [];
    } catch (err) {
      return raw.split(",").map((img) => img.trim()); // fallback
    }
  };

  const imagesByCategory = {};
  for (const key in imageCategories) {
    imagesByCategory[key] = parseImages(property[key]);
  }

  const activeImages = imagesByCategory[activeCategory] || [];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? activeImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === activeImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);
  };

  if (!activeImages.length) {
    return (
      <div className="text-center text-gray-500 py-10">
        No images available.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {/* Main image */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={`${URI}${activeImages[currentIndex]}`}
          alt={`${activeCategory}-${currentIndex + 1}`}
          className="w-full h-[250px] sm:h-[390px] object-cover rounded-lg"
        />

        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
        >
          <FaArrowLeft />
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
        >
          <FaArrowRight />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap overflow-scroll scrollbar-hide gap-3 p-3 mt-4 rounded-lg border border-gray-200">
        {Object.entries(imageCategories).map(([key, label]) => {
          const firstImage = imagesByCategory[key]?.[0];
          if (!firstImage) return null;

          return (
            <div
              key={key}
              onClick={() => handleCategoryClick(key)}
              className={`cursor-pointer border-2 rounded-lg overflow-hidden ${
                activeCategory === key ? "border-[#0BB501]" : "border-gray-200"
              }`}
            >
              <img
                src={`${URI}${firstImage}`}
                alt={label}
                className="w-[100px] h-[55px] object-cover"
              />
              <div className="text-[10px] text-center text-black">{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyImageGallery;
