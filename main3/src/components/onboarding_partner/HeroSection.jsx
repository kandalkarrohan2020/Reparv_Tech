import backgroundImage from "/src/assets/territorypartner_back.png";
import videoImg from "/src/assets/hero_section_video.png";
import videoicon from "/src/assets/videoicon.png";
import { useState } from "react";

export default function OnboardingHeroSection() {
  const [showVideo, setShowVideo] = useState(false);
  const handleScrollToForm = (e) => {
    e.preventDefault();
    const formSection = document.getElementById("onboardingjoin");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-full flex flex-col p-0 m-0   ">
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className={`absolute flex flex-col w-full h-[480px]  lg:h-[530px] md:h-[700px] left-0 lg:top-[70px]  bg-white/77 bg-cover rounded-[2px] backdrop-blur-[15px]  `}
      >
        <div className="hidden md:flex lg:w-[180px] border absolute lg:flex flex-row justify-center items-center lg:p-2 h-[35px] md:left-[52px] lg:left-[172px] md:top-[100px] lg:top-[84px] bg-[rgba(255,_255,_255,_0.6)] rounded-[30px] ">
          <p className="w-full lg:w-[167px] h-[19px] px-1 font-inter font-semibold text-[16px] leading-[19px] text-[#1E1E1E] ">
            Onboarding Partner
          </p>
        </div>

        <div className="flex w-full ">
          <div className="md:mt-7 absolute flex flex-col items-center lg:items-start  md:p-5 w-full gap-2 lg:gap-5 lg:w-[516px] lg:h-[164px] lg:left-[152px] lg:top-[80px] top-[91px]">
            {" "}
            <h1 className="lg:w-[600px] font-bold  text-[36px] lg:text-[50px] font-bold leading-[40px] lg:leading-[50px] text-[#000000] ">
              Onboarding Partner
            </h1>
            <div className=" font-inter lg:font-sans  leading-[19px] text-center lg:text-start  flex-none order-0 self-stretch flex-grow-0 lg:flex w-full px-3 lg:p-0  lg:w-[450px] h-[38px]  font-semibold text-[16px] lg:text-[24px] lg:leading-[29px] text-[#1E1E1E]">
              Monetize Your Network – List Properties & Get Bonuses!
            </div>
            <div className=" text-center lg:text-start flex  lg:mt-3 lg:font-normal md:text-[20px] lg:text-[20px] lg:leading-[24px] text-[rgba(0,_0,_0,_0.6)] flex-none ">
              Join Reparv as an Onboarding Partner, list properties, and earn
              bonuses on every successful sale effortlessly.
            </div>
          </div>

          {/* Register Button of  Onboarding  */}
          <div className="absolute hover:drop-shadow-xl  hover:shadow-lg  focus:shadow-lg active:shadow-lg   w-[237px] flex flex-row justify-center items-center h-[48px] lg:h-[58px] lg:h-[58px]  left-[50%]   md:top-[740px] lg:left-[170px] top-[550px]  lg:top-[401px] transform -translate-x-[50%] -translate-y-[50%]   lg:-translate-x-[0%] lg:-translate-y-[0%] bg-[#1E1E1E] rounded-[8px]">
            <button
              onClick={handleScrollToForm}
              className="w-[104px] item-start font-inter font-semibold lg:w-[155px] flex lg:h-[29px] text-[16px] lg:text-[24px] leading-[29px] text-center text-[#FFFFFF] flex-none order-0 flex-grow-0"
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
        </div>

        <div className="absolute w-[360px] md:w-[500px] h-[270px] left-[50%] transform -translate-x-[50%] -translate-y-[50%] lg:left-[63%] lg:top-[50%] lg:p-0 top-[400px] md:top-[480px] filter drop-shadow-[0px_4px_8px_rgba(0,0,0,0.1)] px-3 lg:w-[500px]">
          <div className=" relative lg:left-[30%]">
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
                  <img src={videoicon} alt="Play" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="absolute w-full justify-evenly  lg:w-[747px] h-[342px] lg:left-[calc(50%-747px/2+0.5px)] top-[630px] md:top-[770px] lg:top-[700px] bg-white flex flex-col items-center p-0 gap-[32px]">
        <div className="lg:w-[747px] lg:h-[64px] flex flex-col items-center p-0 gap-[16px]">
          {/* Heading */}
          <h1 className="w-full p-1 lg:p-0 md:w-full md:h-[48px] lg:w-[603px] h-[90px] lg:h-[48px] font-inter font-semibold text-[28px] lg:text-[40px]  lg:leading-[48px] text-center text-[#1E1E1E]">
            Who is an Onboarding Partner?
          </h1>

          {/*orange line */}
          <div className="w-[100px] h-0 border-2 border-[#1E1E1E]"></div>

          <div className="w-16 h-16 flex-none order-1 flex-grow-0 relative">
            {/* Icons background */}
            <div className="absolute w-16 h-16 mt-5 mx-auto rounded-full bg-[#FEECDC]"></div>
            {/* Icons */}
            <div className="absolute absolute left-[28.29%] right-[38.29%] top-[52.75%]  ">
              <svg
                width="27"
                height="32"
                viewBox="0 0 27 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.89922 32V20.2286C2.88589 19.1619 2.09922 17.9429 1.53922 16.5714C0.979219 15.2 0.699219 13.7397 0.699219 12.1905C0.699219 8.7873 1.93922 5.90476 4.41922 3.54286C6.89922 1.18095 9.92589 0 13.4992 0C17.0726 0 20.0992 1.18095 22.5792 3.54286C25.0592 5.90476 26.2992 8.7873 26.2992 12.1905C26.2992 13.7397 26.0192 15.2 25.4592 16.5714C24.8992 17.9429 24.1126 19.1619 23.0992 20.2286V32L13.4992 28.9524L3.89922 32ZM13.4992 21.3333C16.1659 21.3333 18.4326 20.4444 20.2992 18.6667C22.1659 16.8889 23.0992 14.7302 23.0992 12.1905C23.0992 9.65079 22.1659 7.49206 20.2992 5.71429C18.4326 3.93651 16.1659 3.04762 13.4992 3.04762C10.8326 3.04762 8.56589 3.93651 6.69922 5.71429C4.83255 7.49206 3.89922 9.65079 3.89922 12.1905C3.89922 14.7302 4.83255 16.8889 6.69922 18.6667C8.56589 20.4444 10.8326 21.3333 13.4992 21.3333ZM7.09922 27.4667L13.4992 25.9048L19.8992 27.4667V22.7429C18.9659 23.2508 17.9592 23.6508 16.8792 23.9429C15.7992 24.2349 14.6726 24.381 13.4992 24.381C12.3259 24.381 11.1992 24.2349 10.1192 23.9429C9.03922 23.6508 8.03255 23.2508 7.09922 22.7429V27.4667Z"
                  fill="#1E1E1E"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className=" lg:mt-20  lg:w-[747px] h-[150px] sm:h-[10px] flex flex-col justify-center items-center p-0 gap-[24px]">
          {/* Paragraph of content */}
          <p className="w-[308px] sm:w-[550px] lg:mt-5  md:w-[600px] lg:w-[637px]  h-[150px] font-inter font-medium text-[16px] lg:text-[20px] leading-[150%] text-center text-[#00000099]">
            An Onboarding Partner at Reparv is an individual who lists
            properties on our platform and helps expand our real estate
            inventory. They play a key role in connecting property owners with
            potential buyers and earn attractive bonuses for every successful
            sale of the listed properties.
          </p>
        </div>
      </div>
    </div>
  );
}
