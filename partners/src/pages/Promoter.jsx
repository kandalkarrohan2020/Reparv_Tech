import React from "react";
import promoterBackImage from "../assets/joinOurTeam/promoter/promoterBackImage.png";
import promoterMobileBackImage from "../assets/joinOurTeam/promoter/promoterMobileBackImage.png";
import promoterSectionImage from "../assets/joinOurTeam/promoter/promoterSectionImage.png";
import promoterRealImage from "../assets/joinOurTeam/promoter/promoterRealImage.png";
import promoterResponsibilityImage from "../assets/joinOurTeam/promoter/promoterResponsibilityImage.png";
import promoterInvestmentImage from "../assets/joinOurTeam/promoter/promoterInvestmentImage.png";
import promoterUSPImage from "../assets/joinOurTeam/promoter/promoterUSPImage.png";
import promoterContent from "../assets/joinOurTeam/promoter/promoterContent.pdf";
import { RiMapPinUserLine } from "react-icons/ri";
import { IoMdDownload } from "react-icons/io";

import SEO from "../components/SEO";
import RegistrationForm from "../components/promoter/RegistrationForm";

function Promoter() {
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
        {/* Promoter Top BackGround */}
        <div className="w-full flex flex-col items-center justify-center bg-[#00b800] backImage relative">
          <img
            src={promoterSectionImage}
            alt=""
            className="w-full max-w-[1100px] sm:mb-10 mx-auto"
          />

          {/* Registration Button 
          <div className="absolute hidden sm:flex items-center justify-center bottom-[15%] left-[17%]">
            <a href="#registrationForm">
              <button className="w-[20vw] h-[4vw] text-white bg-[#088d17] border-3 border-white cursor-pointer active:scale-95 rounded-lg text-[1.6vw] font-semibold transition">
                Register Now
              </button>
            </a>
          </div>
          <div className="w-full absolute bottom-[0px] sm:hidden flex items-center justify-center">
            <a href="#registrationForm" className="w-full">
              <button className="w-full h-[40px] text-white text-base font-semibold bg-[#0BB501] cursor-pointer active:scale-95 transition">
                Register Now
              </button>
            </a>
          </div>*/}
        </div>

        <div className="w-full flex flex-col items-center justify-center bg-[#00b800]">
          <img
            src={promoterRealImage}
            alt=""
            className="w-full max-w-[1100px] sm:mb-10 mx-auto"
          />
          <img
            src={promoterUSPImage}
            alt=""
            className="w-full max-w-[1100px] sm:mb-10 mx-auto"
          />
        </div>

        {/* Grid Bottom Section */}
        <div className="w-full flex flex-col items-center justify-center bg-[#00b800]">
          <img
            src={promoterInvestmentImage}
            alt=""
            className="w-full max-w-[1100px] sm:mb-10 mx-auto"
          />
          <img
            src={promoterResponsibilityImage}
            alt=""
            className="w-full max-w-[1100px] sm:mb-10 mx-auto"
          />
        </div>

        {/* Registration Form */}
        <div
          id="registrationForm"
          className="flex items-center justify-center mx-auto pb-8 pt-10 max-w-[1600px] "
        >
          <RegistrationForm />
        </div>

        {/* Download Content Button */}
        <div className="fixed bottom-15 right-8 sm:bottom-20 sm:right-20">
          <a href={promoterContent} download="Promoter_Content.pdf">
            <div className="p-2 sm:p-3 bg-white rounded-full shadow cursor-pointer">
              <IoMdDownload className="w-5 h-5 sm:w-7 sm:h-7 text-[#00b800]" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default Promoter;
