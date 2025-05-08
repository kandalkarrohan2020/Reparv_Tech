import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import PropertyImageGallery from "../components/property/PropertyImageGallery";
import PropertyBookingCard from "../components/property/PropertyBookingCard";
import PropertyOverview from "../components/property/PropertyOverview";
import PropertyFeatures from "../components/property/PropertyFeatures";
import EMICalculator from "../components/property/EmiCalculator";
import OtherProperties from "../components/OtherProperties";
import { useOutletContext } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function PropertyDetails() {
  const { setOtherPropertiesInView, isScrolling } = useOutletContext();
  const { ref: videoRef, inView: otherPropertiesInView } = useInView({
    threshold: 0.1,
  });
  
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const { setShowInquiryForm, URI } = useAuth();

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
    <div className="w-full max-w-7xl flex flex-col p-4 mx-auto">
      <div className="flex w-full">
        <div className="leftSection w-[50%] flex flex-col gap-10">
          <PropertyImageGallery property={propertyInfo} />
          <PropertyOverview propertyInfo={propertyInfo} />
          <PropertyFeatures propertyFeatures={propertyInfo.propertyFeatures} propertyBenefits={propertyInfo.propertyBenefits} />
          <EMICalculator totalAmount={propertyInfo.totalOfferPrice}/>
        </div>
        <div
          className={`${
            isScrolling ? "absolute " : "fixed"
          } bookingSection left-[50%] w-[50%] max-w-[540px] flex px-6 pb-6 z-10`}
        >
          <PropertyBookingCard propertyInfo={propertyInfo} />
        </div>
      </div>

    
      {/* Other Properties Section */}
      <div
        ref={videoRef}
        className={` w-full flex flex-col pt-10 sm:pt-13 sm:p-5`}
      >
        <h2 className="text-lg md:text-3xl mx-auto text-black font-semibold mb-4">
          Explore Similar Properties
        </h2>
        <OtherProperties
          propertyCategory={propertyInfo.propertyCategory}
          propertyId={id}
          key={propertyInfo.propertyid}
        />
      </div>
    </div>
  );
}

export default PropertyDetails;
