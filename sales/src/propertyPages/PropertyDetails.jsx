import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import PropertyImageGallery from "../components/property/PropertyImageGallery";
import PropertyBookingCard from "../components/property/PropertyBookingCard";
import PropertyOverview from "../components/property/PropertyOverview";
import PropertyFeatures from "../components/property/PropertyFeatures";
import EMICalculator from "../components/property/EMICalculator";

function PropertyDetails() {
  
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const { setShowSiteVisitPopup, URI, setPropertyImage } = useAuth();

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/sales/propertyinfo/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setPropertyInfo(data);
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  // Fetch Property Images
  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${URI}/sales/propertyinfo/getimages/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch property images.");
      const data = await response.json();
      setPropertyImages([...data]);
    } catch (err) {
      console.error("Error fetching property images:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImages();
  }, [id]);

  return (
    <div className="w-full max-w-7xl flex flex-col sm:p-4 mx-auto bg-white">
      <div className="flex w-full">
        <div className="leftSection w-full md:w-[50%] flex flex-col gap-5 sm:gap-10">
          <PropertyImageGallery property={propertyInfo} />
          <div className=" block md:hidden">
            <PropertyBookingCard propertyInfo={propertyInfo} />
          </div>
          <PropertyOverview propertyInfo={propertyInfo} />
          <PropertyFeatures propertyInfo={propertyInfo} />
          <EMICalculator totalAmount={propertyInfo.totalOfferPrice}/>
        </div>
        <div
          className={`fixed bookingSection hidden md:flex left-[60%] w-[40%] max-w-[540px] px-6 pb-6 z-10`}
        >
          <PropertyBookingCard propertyInfo={propertyInfo} />
        </div>
      </div>

      {/* Property Booking Inquiry Button */}
      <div
        className="fixed z-30 w-full sm:w-auto right-0 bottom-0 sm:hidden p-4 rounded-2xl text-white text-md shadow-lg "
      >
        <button
          onClick={() => {
            setShowSiteVisitPopup(true);
            setPropertyImages(JSON.parse(propertyInfo.frontView)[0]);
          }}
          className="w-full flex items-center justify-center sm:hidden rounded-md bg-[#0BB501] text-white font-semibold py-3 text-base active:scale-95 cursor-pointer"
        >
          Book Site Visit Now
        </button>
      </div>
    </div>
  );
}

export default PropertyDetails;
