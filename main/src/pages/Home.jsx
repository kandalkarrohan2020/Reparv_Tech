import React from "react";
import ImageSlider from "../components/home/ImageSlider";
import HomePropertyGrid from "../components/home/HomePropertyGrid";
import VideoSection from "../components/home/VideoSection";
import StepsSection from "../components/home/StepsSection";
import VideoReviewSection from "../components/VideoReviewSection";
import PropertyNavbar from "../components/home/PropertyNavbar";
import OtherProperties from "../components/OtherProperties";
import HomePropertySection from "../components/home/HomePropertySection";

function Home() {
  return (
    <div className="full">
      <ImageSlider />
      <div className="block lg:hidden">
        <PropertyNavbar />
      </div>
      <HomePropertySection city={"Nagpur"} />
      <VideoReviewSection />
      <StepsSection />
    </div>
  );
}

export default Home;
