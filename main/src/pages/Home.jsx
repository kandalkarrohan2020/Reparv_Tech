import React from "react";
import { useAuth } from "../store/auth";
import ImageSlider from "../components/home/ImageSlider";
import StepsSection from "../components/home/StepsSection";
import VideoReviewSection from "../components/VideoReviewSection";
import PropertyNavbar from "../components/home/PropertyNavbar";
import HomePropertySection from "../components/home/HomePropertySection";

function Home() {
  const { selectedCity } = useAuth();
  return (
    <div className="full">
      <ImageSlider />
      <div className="block lg:hidden">
        <PropertyNavbar />
      </div>
      <HomePropertySection city={selectedCity} />
      <VideoReviewSection />
      <StepsSection />
    </div>
  );
}

export default Home;
