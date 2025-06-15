import React from "react";
import { useAuth } from "../store/auth";
import ImageSlider from "../components/home/ImageSlider";
import StepsSection from "../components/home/StepsSection";
import VideoReviewSection from "../components/VideoReviewSection";
import PropertyNavbar from "../components/home/PropertyNavbar";
import HomePropertySection from "../components/home/HomePropertySection";
import SEO from "../components/SEO";

function Home() {
  const { selectedCity } = useAuth();
  return (
    <>
      <SEO
        title={"Reparv – Buy, Sell, or Rent Property in Maharashtra"}
        description={"Reparv is your trusted real estate platform in Vidarbha – Flats, Plots, Rentals, Legal Support & Loan Help."}
      />
      <div className="full">
        <ImageSlider />
        <div className="w-full flex items-center justify-center ">
          <div
            onClick={() => {
              window.open("https://users.reparv.in/", "_blank");
              setShowSidebar(false);
            }}
            className="md:hidden w-[90%] min-w-40 px-2 py-2 flex gap-[6px] items-center justify-center cursor-pointer text-sm font-medium hover:font-semibold border border-gray-200 bg-[#0BB501] text-white rounded-lg active:scale-95"
          >
            Sell Your Property
          </div>
        </div>
        <div className="block lg:hidden">
          <PropertyNavbar />
        </div>
        <HomePropertySection city={selectedCity} />
        <VideoReviewSection />
        <StepsSection />
      </div>
    </>
  );
}

export default Home;
