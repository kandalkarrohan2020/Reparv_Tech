// src/components/HeroSection.jsx
import React, { useState } from "react";
import "../../App.css";
import backgroundImg from "/src/assets/herosection_back.png";
import videoIcon from "/src/assets/videoicon.png";
import videoImg from "/src/assets/hero_section_video.png";

export default function Section1() {
  const [showVideo, setShowVideo] = useState(false);
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formSection = document.getElementById("projectjoin");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="home"
      className={`flex flex-col justify-between w-full    bg-cover  md:h-[600px] h-[530px] lg:h-[600px]`}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="flex w-full h-[300px]">
        <div className="flex flex-col">
          {/* Project Partner Tag */}
          <div className="hidden md:flex lg:flex absolute flex-row justify-center items-center p-2 h-[35px] md:left-[52px] lg:left-[152px] md:top-[100px] lg:top-[134px] bg-[rgba(255,_255,_255,_0.6)] rounded-[30px]">
            <p className="w-[147px] h-[19px] px-1 font-inter font-semibold text-[16px] leading-[19px] text-[#0BB501]">
              Project Partner
            </p>
          </div>

          {/* Text Content */}

          <div className="md:mt-7 absolute flex flex-col items-start md:items-center p-5 lg:p-0 w-full gap-6 lg:w-[486px] h-[164px] lg:left-[152px] lg:top-[164px] top-[91px]">
            <h1 className=" font-inter font-bold text-[36px] lg:text-[50px] leading-[40px] lg:leading-[50px] text-[#000000]">
              Empower Investors, Earn Together
            </h1>
            <div className="hidden lg:flex font-normal text-[20px] leading-[24px] text-[rgba(0,_0,_0,_0.6)]">
              Collaborate with us to build a transparent and profitable real
              estate ecosystem.
            </div>
            <div className="lg:hidden md:flex text-center lg:w-[358px] md:w-[700px] h-[54px] font-inter font-medium text-[14px] md:text-[20px]  leading-[18px] md:leading-[20px] text-[rgba(0,_0,_0,_0.6)]">
              Explore exciting opportunities in real estate sales with expert
              guidance. Unlock your potential and take the first step toward
              rewarding growth!
            </div>
          </div>
        </div>

        {/* Register Button */}
        <div className="absolute hover:drop-shadow-xl hover:shadow-lg focus:shadow-lg active:shadow-lg w-[237px] flex flex-row justify-center items-center h-[48px] lg:h-[58px] left-[50%] md:top-[650px] lg:left-[150px] top-[570px] lg:top-[421px] transform -translate-x-[50%] -translate-y-[50%] lg:-translate-x-[0%] lg:-translate-y-[0%] bg-[#0BB501] rounded-[8px]">
          <button
            onClick={handleScrollToForm}
            className="w-[104px] font-inter font-semibold lg:w-[155px] flex lg:h-[29px] text-[16px] lg:text-[24px] leading-[29px] text-center text-[#FFFFFF]"
          >
            Register Now
          </button>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 18L12.6 16.55L16.15 13H4V11H16.15L12.6 7.45L14 6L20 12L14 18Z"
              fill="white"
            />
          </svg>
        </div>

        {/* HeroSection Video */}

        <div className="absolute w-[360px]  partnervideo  md:w-[500px] h-[270px] left-[50%] transform -translate-x-[50%] -translate-y-[50%] lg:left-[63%] lg:top-[50%] lg:p-0 top-[430px] md:top-[450px] filter drop-shadow-[0px_4px_8px_rgba(0,0,0,0.1)] px-3 lg:w-[500px]">
          <div className="relative lg:left-[30%]">
            {showVideo ? (
              <div className="relative h-full w-full aspect-video">
                <iframe
                  className="w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/3bmzcxBu5H0?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <>
                <img
                  src={videoImg}
                  alt="video"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div
                  className="absolute w-[57.71px] h-[65.49px] left-[50%] transform -translate-x-[50%] top-[60px] md:top-[100px] lg:top-[109.66px] cursor-pointer"
                  onClick={() => setShowVideo(true)}
                >
                  <img src={videoIcon} alt="Play" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Partner with Reparv Section */}
        <div className="hidden md:hidden lg:flex absolute flex flex-col items-start md:p-5 lg:p-[24px] gap-[12px] h-[124px] md:left-[570px] lg:left-[1000px] md:top-[390px] lg:top-[460px] bg-[rgba(255,_255,_255,_0.4)] backdrop-blur-[25px] rounded-[12px]">
          <div className="w-[202px] h-[19px] font-inter font-semibold text-[16px] leading-[19px] text-[#000000]">
            Partner with Reparv!
          </div>
          <div className="w-[202px] h-[45px] font-inter font-medium text-[12px] leading-[15px] text-[rgba(0,_0,_0,_0.6)]">
            Join our network of successful real estate professionals and grow
            your business.
          </div>
        </div>
      </div>
    </div>
  );
}
