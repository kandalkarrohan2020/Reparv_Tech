import React, { lazy, Suspense } from "react";
import { useAuth } from "../store/auth";
import SEO from "../components/SEO";

// lazy load heavy components
const ImageSlider = lazy(() => import("../components/home/ImageSlider"));
const StepsSection = lazy(() => import("../components/home/StepsSection"));
const VideoReviewSection = lazy(() => import("../components/VideoReviewSection"));
const PropertyNavbar = lazy(() => import("../components/home/PropertyNavbar"));
const HomePropertySection = lazy(() => import("../components/home/HomePropertySection"));

function Home() {
  const { selectedCity } = useAuth();

  return (
    <>
      <SEO
        title="Reparv - India's Fast-Growing Real Estate Ecosystem | Property & Partner Programs"
        description="Buy, sell, or rent property with seamless legal and loan assistance. Become a Sales, Territory, Project, or Onboarding Partner and grow your real estate career with low investment, high margins, and nationwide scalability powered by Reparv."
      />

      <div className="full">
        {/* Lazy loaded components wrapped in Suspense */}
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <ImageSlider />
        </Suspense>

        <div className="w-full flex items-center justify-center">
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
          <Suspense fallback={<div>Loading navbar...</div>}>
            <PropertyNavbar />
          </Suspense>
        </div>

        <Suspense fallback={<div className="text-center">Loading properties...</div>}>
          <HomePropertySection />
        </Suspense>

        <Suspense fallback={<div className="text-center">Loading reviews...</div>}>
          <VideoReviewSection />
        </Suspense>

        <Suspense fallback={<div className="text-center">Loading steps...</div>}>
          <StepsSection />
        </Suspense>
      </div>
    </>
  );
}

export default Home;