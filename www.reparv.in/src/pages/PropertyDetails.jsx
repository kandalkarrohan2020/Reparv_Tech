import React, { useState, useEffect, lazy, Suspense } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useAuth } from "../store/auth";
import PropertyBookingCard from "../components/property/PropertyBookingCard";
import PropertyOverview from "../components/property/PropertyOverview";
import PropertyFeatures from "../components/property/PropertyFeatures";
import EMICalculator from "../components/property/EMICalculator";
import { useInView } from "react-intersection-observer";
import SEO from "../components/SEO";
import WingData from "../components/property/WingData";
import PlotData from "../components/property/PlotData";
import TypeWisePricing from "../components/property/TypeWisePricing";

// Lazy-loaded components
const PropertyImageGallery = lazy(() =>
  import("../components/property/PropertyImageGallery")
);
const OtherProperties = lazy(() => import("../components/OtherProperties"));

function PropertyDetails() {
  const { setOtherPropertiesInView, isScrolling } = useOutletContext();
  const { ref: videoRef, inView: otherPropertiesInView } = useInView({
    threshold: 0.1,
  });

  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const { setShowSiteVisitPopup, URI, setPropertyCategory, setPropertyId } =
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
      setPropertyCategory(data.propertyCategory);
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
          <div className="leftSection w-full md:w-[50%] flex flex-col gap-2 sm:gap-10">
            {/* Lazy load Image Gallery */}
            <Suspense
              fallback={
                <div className="text-center py-10">Loading Images...</div>
              }
            >
              <PropertyImageGallery property={propertyInfo} />
            </Suspense>

            <div className=" block md:hidden">
              <PropertyBookingCard propertyInfo={propertyInfo} />
            </div>

            {/* Show Wing Data */}
            {["NewFlat", "CommercialFlat"].includes(
              propertyInfo.propertyCategory
            ) && <WingData propertyInfo={propertyInfo} />}

            {/* Show Plot Data */}
            {["NewPlot", "CommercialPlot"].includes(
              propertyInfo.propertyCategory
            ) && <PlotData propertyInfo={propertyInfo} />}

            {/* Show Type Wise Property */}
            <TypeWisePricing
              propertyInfo={propertyInfo}
              propertyId={propertyInfo?.propertyid}
              propertyCategory={propertyInfo?.propertyCategory}
              propertyType={propertyInfo.propertyType}
              brochureFile={propertyInfo.brochureFile}
              videoFile={propertyInfo.videoFile}
            />

            {/* Property Details */}
            {propertyInfo?.propertyDescription && (
              <div className="bg-white rounded-lg p-4">
                <h2 className="text-base font-semibold mb-4">
                  Property Details
                </h2>
                <div className="text-sm text-gray-600 ">
                  {propertyInfo.propertyDescription}
                </div>
              </div>
            )}

            <PropertyOverview propertyInfo={propertyInfo} />
            <PropertyFeatures propertyInfo={propertyInfo} />

            {/* Hide EMI Calculator in Rentals */}
            {!["RentalFlat", "RentalShop", "RentalOffice"].includes(
              propertyInfo.propertyCategory
            ) && <EMICalculator totalAmount={propertyInfo.totalOfferPrice} />}
          </div>

          {/* Booking card */}
          <div
            className={`${
              isScrolling ? "absolute " : "fixed"
            } bookingSection hidden md:flex left-[50%] w-[50%] max-w-[540px] px-6 pb-6 z-10`}
          >
            <PropertyBookingCard propertyInfo={propertyInfo} />
          </div>
        </div>

        {/* Book Site Visit Button (Mobile) */}
        <div className="fixed z-30 w-full sm:w-auto right-0 bottom-0 sm:hidden p-4 rounded-2xl text-white text-md shadow-lg ">
          <button
            onClick={() => {
              setShowSiteVisitPopup(true);
              setPropertyImages(JSON.parse(propertyInfo.frontView)[0]);
              setPropertyId(JSON.parse(propertyInfo.propertyid));
              setPropertyCategory(propertyInfo.propertyCategory);
            }}
            className="w-full flex items-center justify-center sm:hidden rounded-md bg-[#0BB501] text-white font-semibold py-3 text-base active:scale-95 cursor-pointer"
          >
            Book Site Visit Now
          </button>
        </div>

        {/* Lazy load Other Properties */}
        <div
          ref={videoRef}
          className="w-full flex flex-col px-5 pt-10 sm:pt-13 sm:p-5"
        >
          <h2 className="text-lg md:text-3xl mx-auto text-black font-semibold mb-4">
            Explore Similar Properties
          </h2>
          <Suspense
            fallback={
              <div className="text-center py-10">
                Loading Similar Properties...
              </div>
            }
          >
            <OtherProperties
              propertyCity={propertyInfo.city}
              propertyCategory={propertyInfo.propertyCategory}
              propertyId={id}
              key={propertyInfo.seoSlug}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
