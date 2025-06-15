import React from "react";
import territoryFigure from "../assets/joinOurTeam/territoryPartner/territoryFig.svg";
import territoryMobileFigure from "../assets/joinOurTeam/territoryPartner/territoryMobileFig.png";
import territoryMobileBackImage from "../assets/joinOurTeam/territoryPartner/territoryMobileBack.png";
import territoryBackImage from "../assets/joinOurTeam/territoryPartner/territoryBack.png";
import RegisterForm from "../components/territoryPartner/RegisterForm";
import StepSection from "../components/salesPartner/StepSection";

import WhoIsTerritoryPartner from "../components/territoryPartner/WhoIsTerritoryPartner";
import VideoReviewSection from "../components/VideoReviewSection";
import MarketRealitySlider from "../components/territoryPartner/MarketRealitySlider";
import SEO from "../components/SEO";

function TerritoryPertner() {
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
        <div className="w-full flex flex-col lg:pb-55 items-center justify-center backImage relative">
          <div className="flex items-center justify-center lg:pb-25 bg-[#026FBE1A]">
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
            <div className="absolute bottom-[32px] hidden lg:flex registerForm w-full max-w-[1050px] mx-auto ">
              <RegisterForm />
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex lg:hidden registerForm w-full max-w-[1050px] mx-auto ">
          <RegisterForm />
        </div>

        {/* Sales Other Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Why Join Reparv Section */}
          <div className="py-10">
            <WhoIsTerritoryPartner />
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
          <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center pb-10 sm:py-10">
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
      </div>
    </>
  );
}

export default TerritoryPertner;
