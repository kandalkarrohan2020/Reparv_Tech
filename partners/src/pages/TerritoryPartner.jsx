import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import territoryFigure from "../assets/joinOurTeam/territoryPartner/territoryFig.svg";
import territoryMobileFigure from "../assets/joinOurTeam/territoryPartner/territoryMobileFig.png";
import territoryMobileBackImage from "../assets/joinOurTeam/territoryPartner/territoryMobileBack.png";
import territoryBackImage from "../assets/joinOurTeam/territoryPartner/territoryBack.png";
import { IoMdDownload } from "react-icons/io";

import WhoIsTerritoryPartner from "../components/territoryPartner/WhoIsTerritoryPartner";
import VideoReviewSection from "../components/VideoReviewSection";
import MarketRealitySlider from "../components/territoryPartner/MarketRealitySlider";
import SEO from "../components/SEO";
import SubscriptionSection from "../components/territoryPartner/SubscriptionSection";

function TerritoryPertner() {
  const { URI } = useAuth();
  const partnerType = "Territory Partner";
  const [plans, setPlans] = useState([]);

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(
        URI + "/admin/subscription/pricing/plans/" + partnerType,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Subscription Plans.");
      const data = await response.json();
      console.log(data);
      setPlans(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <SEO
        title={"Become a Reparv Territory Partner – Lead & Earn Big"}
        description={
          "Take charge of your region with Reparv. Manage teams, drive sales & earn per deal. Get expert support, verified properties & flexible digital work tools."
        }
        keywords={""}
      />
      <div className="w-full">
        {/* Sales Top BackGround */}
        <div className="w-full flex flex-col items-center justify-center backImage relative">
          <div className="flex items-center justify-center pb-10 sm:pb-[6vw] bg-[#026FBE1A]">
            <img
              src={territoryBackImage}
              alt=""
              className="w-full max-w-[1600px] hidden sm:block mx-auto"
            />
            <img
              src={territoryMobileBackImage}
              alt=""
              className="w-full block sm:hidden mx-auto"
            />
            {/* Registration Button */}
            <div className="absolute hidden sm:flex items-center justify-center bottom-[5%] left-[30%]">
              <a href="#subscriptionSection">
                <button className="w-[40vw] h-[4vw] text-white bg-[#0BB501] cursor-pointer active:scale-95 rounded-lg text-[1.6vw] font-semibold transition">
                  Register Now
                </button>
              </a>
            </div>
            <div className="w-full absolute bottom-[0px] sm:hidden flex items-center justify-center">
              <a href="#subscriptionSection" className="w-full">
                <button className="w-full h-[40px] text-white text-base font-semibold bg-[#0BB501] cursor-pointer active:scale-95 transition">
                  Register Now
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Sales Other Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Why Join Reparv Section */}
          <div className="py-10">
            <WhoIsTerritoryPartner />
          </div>

          {/* Download Application */}
          <div className="w-full pt-0 pb-10 sm:pb-4  flex items-center justify-center">
            <div
              onClick={() => {
                window.open(
                  "https://play.google.com/store/apps/details?id=com.newreparvterritory_app",
                  "_blank"
                );
              }}
              className="w-full sm:w-[350px] cursor-pointer"
            >
              <div className="w-full flex gap-2 items-center justify-center text-base sm:text-xl font-semibold text-white bg-[#0BB501] px-12 py-2 sm:py-3 rounded-lg active:scale-95 ">
                <span>Territory Partner Apk</span>{" "}
                <IoMdDownload className="w-5 h-5 sm:w-6 sm:h-6 " />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center pb-10 sm:py-10">
            <h2 className="text-lg sm:text-2xl leading-[100%] font-semibold">
              Market Reality
            </h2>
            <div className="mx-auto w-30 h-[2px] sm:h-1 bg-[#026FBE]"></div>
            <span className="text-xs sm:text-base text-[#999999] font-medium mx-auto">
              Understanding the challenges in today's real estate market
            </span>
            <MarketRealitySlider />
          </div>

          {/* Figure/Diagram Section */}
          <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center pt-10">
            <h2 className="text-lg sm:text-2xl leading-[100%] font-semibold">
              What will Change in Your Business?
            </h2>
            <div className="mx-auto w-30 h-[2px] sm:h-1 bg-[#026FBE] mb-2 sm:mb-7"></div>
            <img
              src={territoryFigure}
              alt=""
              className="w-full max-w-[950px] hidden sm:block mx-auto"
            />
            <img
              src={territoryMobileFigure}
              alt=""
              className="w-full block sm:hidden mx-auto"
            />
          </div>
        </div>

        {/* Subscription Plan */}
        <div
          id="subscriptionSection"
          className="flex items-center justify-center mx-auto pb-8 pt-10 sm:py-20 max-w-[1600px] "
        >
          <SubscriptionSection plans={plans}/>
        </div>
      </div>
    </>
  );
}

export default TerritoryPertner;
