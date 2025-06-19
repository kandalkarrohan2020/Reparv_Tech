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
import OtherProperties from "../components/OtherProperties";
import { useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import SEO from "../components/SEO";

function PropertyDetails() {
  const { setOtherPropertiesInView, isScrolling } = useOutletContext();
  const { ref: videoRef, inView: otherPropertiesInView } = useInView({
    threshold: 0.1,
  });

  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const { setShowSiteVisitPopup, URI, setPropertyImage, setPropertyId } =
    useAuth();

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
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  // Fetch Property Images
  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${URI}/frontend/propertyinfo/getimages/${id}`,
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

  useEffect(() => {
    setOtherPropertiesInView(otherPropertiesInView);
  }, [otherPropertiesInView]);

  return (
    <>
      <SEO
        title={propertyInfo.seoTittle || ""}
        description={propertyInfo.seoDescription || ""}
      />
      <div className="w-full max-w-7xl flex flex-col sm:p-4 mx-auto">
        <div className="flex w-full">
          <div className="leftSection w-full md:w-[50%] flex flex-col gap-5 sm:gap-10">
            <PropertyImageGallery property={propertyInfo} />
            <div className=" block md:hidden">
              <PropertyBookingCard propertyInfo={propertyInfo} />
            </div>

            {/* Property Details */}
            <div
              className={`${
                propertyInfo?.propertyDescription === null ||
                propertyInfo?.propertyDescription === ""
                  ? "hidden"
                  : "block"
              }`}
            >
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-base font-semibold mb-4">
                  Property Details
                </h2>
                <div className="text-sm text-gray-600 ">{propertyInfo.propertyDescription}</div>
              </div>
            </div>

            <PropertyOverview propertyInfo={propertyInfo} />
            <PropertyFeatures propertyInfo={propertyInfo} />
            <EMICalculator totalAmount={propertyInfo.totalOfferPrice} />
          </div>
          <div
            className={`${
              isScrolling ? "absolute " : "fixed"
            } bookingSection hidden md:flex left-[50%] w-[50%] max-w-[540px] px-6 pb-6 z-10`}
          >
            <PropertyBookingCard propertyInfo={propertyInfo} />
          </div>
        </div>

        {/* Property Booking Inquiry Button */}
        <div className="fixed z-30 w-full sm:w-auto right-0 bottom-0 sm:hidden p-4 rounded-2xl text-white text-md shadow-lg ">
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

        {/* Other Properties Section */}
        <div
          ref={videoRef}
          className={` w-full flex flex-col px-5 pt-10 sm:pt-13 sm:p-5`}
        >
          <h2 className="text-lg md:text-3xl mx-auto text-black font-semibold mb-4">
            Explore Similar Properties
          </h2>
          <OtherProperties
            propertyCategory={propertyInfo.propertyCategory}
            propertyId={id}
            key={propertyInfo.seoSlug}
          />
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
