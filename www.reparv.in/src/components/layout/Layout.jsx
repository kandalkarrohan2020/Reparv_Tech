import { useState, lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useInView } from "react-intersection-observer";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SuccessScreen from "../SuccessScreen";
import PriceSummery from "../property/PriceSummery";
import BenefitsPopup from "../property/BenefitsPopup";
import SiteVisitPopup from "../property/SiteVisitPopup";
import FilterSidebar from "../FilterSidebar";
import PlayVideo from "../property/PlayVideo";
import WingInfo from "../property/WingInfo";
import PlotInfo from "../property/PlotInfo";
import Share from "../property/Share";
import PlayYoutubeVideo from "../property/PlayYoutubeVideo";

// lazy load
const CitySelector = lazy(() => import("../CitySelector"));

function Layout() {
  const {
    showSuccess,
    URI,
    successScreen,
    setSuccessScreen,
    selectedCity,
    setSelectedCity,
    showPriceSummery,
    setShowPriceSummery,
    showBenefitsPopup,
    setShowBenefitsPopup,
    showSiteVisitPopup,
    setShowSiteVisitPopup,
    showFilterPopup,
    setShowFilterPopup,
    showPlayVideo,
    setShowPlayVideo,
    showWingInfoPopup,
    setShowWingInfoPopup,
    showPlotInfoPopup,
    setShowPlotInfoPopup,
    showCitySelector,
    setShowCitySelector,
    showSharePopup,
    setShowSharePopup,
    propertyInformation
  } = useAuth();

  const { ref: footerRef, inView: footerInView } = useInView({
    threshold: 0.1,
  });
  const [videoInView, setVideoInView] = useState(false);
  const [otherPropertiesInView, setOtherPropertiesInView] = useState(false);

  const isIntersecting = footerInView || videoInView;
  const isScrolling = footerInView || otherPropertiesInView;

  return (
    <div className="layout w-full flex flex-col bg-white overflow-hidden ">
      {/* Desktop Navbar And Mobile SideBar */}
      <Navbar />

      {/* container */}
      <div className="w-full pt-15 sm:pt-22 sm:bg-[#FAFAFA]">
        <Outlet
          context={{
            setVideoInView,
            isIntersecting,
            setOtherPropertiesInView,
            isScrolling,
          }}
        />
      </div>

      {/* footer */}
      <Footer footerRef={footerRef} />

      {/* City Selector Popup */}
      {showCitySelector && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0 sm:top-10">
            <Suspense
              fallback={
                <div className="rounded-full bg-white px-15 py-4 text-2xl font-bold">
                  Loading...
                </div>
              }
            >
              {" "}
              <CitySelector />
            </Suspense>
          </div>
        </div>
      )}

      {/* Show Book Site Form Screen */}
      {showSiteVisitPopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <SiteVisitPopup />
          </div>
        </div>
      )}

      {/* Show Success Screen */}
      {successScreen?.show && <SuccessScreen />}

      {showPriceSummery && (
        <div
          onClick={() => {
            setShowPriceSummery(false);
          }}
          className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center"
        >
          <PriceSummery />
        </div>
      )}

      {showBenefitsPopup && (
        <div
          onClick={() => {
            setShowBenefitsPopup(false);
          }}
          className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center"
        >
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <BenefitsPopup />
          </div>
        </div>
      )}

      {showPlayVideo && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <PlayYoutubeVideo />
        </div>
      )}

      {showSharePopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <Share propertyData={propertyInformation}/>
        </div>
      )}

      {showWingInfoPopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <WingInfo />
        </div>
      )}

      {showPlotInfoPopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <PlotInfo />
        </div>
      )}

      {showFilterPopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end h-[90vh] absolute bottom-0">
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
