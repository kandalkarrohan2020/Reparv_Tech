import React from "react";
import partnerMobileBackImage from "../assets/joinOurTeam/onboardingPartner/partnerMobileBack.svg";
import partnerBackImage from "../assets/joinOurTeam/onboardingPartner/partnerBack.svg";
import RegisterForm from "../components/onboardingPartner/RegisterForm";
import { RiMapPinUserLine } from "react-icons/ri";
import VideoSection from "../components/VideoSection";
import MarketRealityGrid from "../components/onboardingPartner/MarketRealityGrid";
import SolutionReparvGrid from "../components/onboardingPartner/SolutionReparvGrid";
import BottomGrid from "../components/onboardingPartner/BottomGrid";

function OnboardingPartner() {
  return (
    <div className="w-full">
      {/* Sales Top BackGround */}
      <div className="w-full flex flex-col xl:pb-35 2xl:pb-20 items-center justify-center backImage relative">
        <div className="relative w-full min-h-120 max-h-200 sm:min-h-160 sm:max-h-200 md:min-h-80 md:max-h-200 flex items-center justify-center">
          <img
            src={partnerBackImage}
            alt=""
            className=" w-full max-w-[1600px] hidden sm:block mx-auto"
          />
          <img
            src={partnerMobileBackImage}
            alt=""
            className="w-full block sm:hidden mx-auto"
          />
          <div className="absolute w-full max-w-[1600px] h-full backdrop-blur-[10px] bg-white/30">
            {" "}
          </div>
          <div className="absolute w-full max-w-[1130px] h-full flex flex-col md:flex-row gap-5 md:gap-10 p-4 ">
            <div className="left w-full md:w-1/2 flex flex-col gap-7 pt-2 xl:pt-10">
              <div className="w-60 hidden lg:block text-xl px-4 py-2 font-semibold bg-[#FFFFFF99] rounded-xl">
                Onboarding Partner
              </div>
              <div className="flex items-center justify-center md:items-start md:justify-start flex-col gap-3 sm::gap-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  Onboarding Partner
                </h2>
                <h2 className="text-base text-center md:text-start md:text-xl lg:text-2xl font-semibold">
                  Monetize Your Network – List Properties & Get Bonuses!
                </h2>
                <h2 className="text-xs lg:text-xl md:text-start text-[#000000B2] text-center font-medium">
                  Join Reparv as an Onboarding Partner, list properties, and
                  earn bonuses on every successful sale effortlessly.
                </h2>
              </div>
            </div>
            <div className="right w-full md:w-1/2 pt-2 xl:pt-10">
              <VideoSection videoFor="onboarding partner" />
            </div>
          </div>
          <div className="absolute bottom-[-150px] 2xl:bottom-[-90px] hidden xl:flex registerForm w-full max-w-[1050px] mx-auto">
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex xl:hidden registerForm w-full max-w-[1050px] mx-auto ">
        <RegisterForm />
      </div>

      {/* Sales Other Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Why Join Reparv Section */}
        <div className="py-10">{}</div>

        <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center pb-10 sm:py-10">
          <h2 className="text-lg sm:text-2xl leading-[100%] font-semibold">
            What is an Onboarding Partner?
          </h2>
          <div className="mx-auto w-30 h-[2px] sm:h-1 bg-black"></div>
          <div className="flex max-w-[750px] flex-col items-center justify-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center p-2 bg-[#FEECDC] "><RiMapPinUserLine className="w-7 h-7"/></div>
          <span className="text-xs text-center sm:text-lg text-[#999999] px-4 font-medium mx-auto">
            An Onboarding Partner at Reparv is an individual who lists
            properties on our platform and helps expand our real estate
            inventory. They play a key role in connecting property owners with
            potential buyers and earn attractive bonuses for every successful
            sale of the listed properties.
          </span>
          </div>
         
        </div>

        <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center my-2 pb-5 sm:py-10">
          <h2 className="text-lg sm:text-2xl leading-[100%] font-semibold">
            Market Reality
          </h2>
          <span className="text-xs sm:text-base text-center text-[#999999] font-medium mx-auto">
             The challenges that onboarding partners typically face in the real estate market
          </span>
          <div className="mx-auto w-30 h-[2px] sm:h-1 bg-black"></div>
          <MarketRealityGrid />
        </div>

        <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center my-2 pb-5 sm:py-10">
          <h2 className="text-lg sm:text-2xl leading-[100%] font-semibold">
            Solutions in Reparv
          </h2>
          <span className="text-xs text-center sm:text-base text-[#999999] font-medium mx-auto">
          How Reparv addresses these challenges and creates opportunities for onboarding partners
          </span>
          <div className="mx-auto w-30 h-[2px] sm:h-1 bg-black"></div>
          <SolutionReparvGrid />
        </div>
      </div>
      
      

      {/* Grid Bottom Section */}
      <div className="w-full flex flex-col items-center justify-center bg-black border-y-2 border-white ">
        <div className="w-full flex flex-col items-center justify-center my-2 pb-5 py-10 sm:pt-15">
          <h2 className="text-white text-lg sm:text-2xl leading-[100%] font-semibold sm:mb-4">
            Who Will Become An Project Partner?
          </h2>
          <span className="hidden sm:block text-xs text-center sm:text-base text-[#999999] font-medium mx-auto">
          Reparv welcomes partners from diverse backgrounds who share a passion for real estate
          </span>
          <BottomGrid />
      </div>
      </div>
    </div>
  );
}

export default OnboardingPartner;
