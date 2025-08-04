import React from "react";
import projectPartnerMobileBackImage from "../assets/joinOurTeam/projectPartner/projectPartnerMobileBack.svg";
import projectPartnerBackImage from "../assets/joinOurTeam/projectPartner/projectPartnerBack.svg";
import deskTopImage from "../assets/joinOurTeam/projectPartner/deskTop.svg";
import RegisterForm from "../components/projectPartner/RegisterForm";
import { RiMapPinUserLine } from "react-icons/ri";
import VideoSection from "../components/VideoSection";
import MarketRealityGrid from "../components/projectPartner/MarketRealityGrid";
import SolutionReparvGrid from "../components/projectPartner/SolutionReparvGrid";
import BottomGrid from "../components/projectPartner/BottomGrid";
import SEO from "../components/SEO";
import RegistrationForm from "../components/projectPartner/RegistrationForm";

function ProjectPartner() {
  return (
    <>
      <SEO
        title={"Join as a Project Partner with Reparv – Grow & Earn More"}
        description={
          "Collaborate with Reparv to scale your real estate success. Developers, agents & consultants – boost visibility, sales & profit. Partner with us today!"
        }
        keywords={""}
      />
      <div className="w-full">
        {/*  Top BackGround */}
        <div className="w-full flex flex-col items-center justify-center backImage relative">
          <div className="relative w-full min-h-120 max-h-170 sm:min-h-170 sm:max-h-200 md:min-h-70 md:max-h-200 flex items-center justify-center">
            <img
              src={projectPartnerBackImage}
              alt=""
              className=" w-full max-w-[1600px] hidden sm:block mx-auto"
            />
            <img
              src={projectPartnerBackImage}
              alt=""
              className="w-full block sm:hidden mx-auto"
            />
            <div className="absolute w-full max-w-[1600px] h-full backdrop-blur-[10px] bg-white/30">
              {" "}
            </div>
            <div className="absolute w-full max-w-[1130px] h-full flex flex-col md:flex-row gap-5 md:gap-10 p-4 ">
              <div className="left w-full md:w-1/2 flex flex-col gap-4 lg:gap-7 pt-2 sm:pt-6 xl:pt-10">
                <div className="w-50 hidden text-[#0BB501] md:block text-xl px-4 py-2 font-semibold bg-[#FFFFFF99] rounded-xl">
                  Project Partner
                </div>
                <div className="flex items-start justify-start flex-col gap-4 sm:gap-3 lg:gap-5">
                  <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                    Empower Investors, Earn Together
                  </h2>
                  <h2 className="text-base md:text-lg lg:text-2xl xl:text-3xl text-start text-[#000000B2] font-medium">
                    Collaborate with us to build a transparent and profitable
                    real estate ecosystem.
                  </h2>
                  <a href="#registrationForm">
                    <button className="w-[300px] h-[50px] md:h-[60px] mt-3 xl:mt-5 text-base md:text-xl text-white bg-[#0BB501] cursor-pointer active:scale-95 rounded-lg font-semibold transition">
                      Register Now
                    </button>
                  </a>
                </div>
              </div>
              <div className="right w-full md:w-1/2 pt-2 xl:pt-10">
                <VideoSection videoFor="project partner" />
              </div>
            </div>
          </div>
        </div>

        {/* Project Other Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Who is a Project Partner Section */}
          <div className="py-5 sm:py-2">{}</div>

          <div className="flex flex-col gap-4 items-center justify-center pb-10 sm:py-10">
            <h2 className="text-lg text-[#076300] sm:text-2xl leading-[100%] font-semibold">
              What is an Project Partner?
            </h2>
            <div className="flex max-w-[750px] flex-col items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center p-2 bg-[#FEECDC] ">
                <RiMapPinUserLine className="w-7 h-7" />
              </div>
              <span className="text-xs max-w-[500px] text-center sm:text-lg text-[#999999] px-4 font-medium mx-auto">
                A Project Partner is an individual, company, or organization
                that collaborates on multiple real estate projects by
                contributing resources, expertise, or investment.
              </span>
              <div className="mx-auto w-30 h-[2px] sm:h-1 bg-[#0BB501] "></div>
              <img src={deskTopImage} alt="" className="w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center my-2 pb-5 sm:py-10">
            <h2 className="text-[#076300] text-lg sm:text-2xl leading-[100%] font-semibold">
              Market Reality
            </h2>
            <span className="max-w-[400px] text-xs sm:text-base text-center text-[#999999] font-medium mx-auto">
              The current real estate market faces significant challenges that
              impact investors and businesses.
            </span>
            <div className="mx-auto w-30 h-[2px] sm:h-1 bg-[#0BB501] "></div>
            <MarketRealityGrid />
          </div>

          <div className="flex flex-col gap-2 sm:gap-4 items-center justify-center my-2 pb-5 sm:py-10">
            <h2 className="text-[#076300] text-lg sm:text-2xl leading-[100%] font-semibold">
              Solutions in Reparv
            </h2>
            <span className="max-w-[400px] text-xs text-center sm:text-base text-[#999999] font-medium mx-auto">
              Reparv offers comprehensive solutions to overcome the challenges
              faced by real estate professionals.
            </span>
            <div className="mx-auto w-30 h-[2px] sm:h-1 bg-[#0BB501]"></div>
            <SolutionReparvGrid />
          </div>
        </div>

        {/* Grid Bottom Section */}
        <div className="w-full flex flex-col items-center justify-center bg-[#076300] border-y-2 border-white ">
          <div className="w-full flex flex-col items-center justify-center my-2 pb-5 py-10 sm:pt-15">
            <h2 className="text-white text-lg sm:text-2xl leading-[100%] font-semibold sm:mb-4">
              Who Will Become An Project Partner?
            </h2>
            <BottomGrid />
          </div>
        </div>

        {/* Registration Form */}
        <div
          id="registrationForm"
          className="flex items-center justify-center mx-auto pb-8 pt-10 sm:py-20 max-w-[1600px] "
        >
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}

export default ProjectPartner;
