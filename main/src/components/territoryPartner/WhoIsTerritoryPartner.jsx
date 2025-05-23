import {FaLocationDot, FaUserGroup, FaArrowTrendUp } from "react-icons/fa6";
import { AiOutlineAim } from "react-icons/ai";
import VideoSection from "../VideoSection.jsx";

const benefits = [
  {
    title: "Regional Leadership",
    icon: <FaLocationDot className="w-4 h-4 md:w-7 md:h-7"/>,
  },
  {
    title: "Team Management",
    icon: <FaUserGroup className="w-4 h-4 md:w-7 md:h-7"/>,
  },
  {
    title: "Strategy Execution",
    icon: <AiOutlineAim className="w-4 h-4 md:w-7 md:h-7"/>,
  },
  {
    title: "Business Growth",
    icon: <FaArrowTrendUp className="w-4 h-4 md:w-7 md:h-7"/>,
  },
];

export default function WhoIsTerritoryPartner() {
  return (
    <div className="max-w-6xl text-center mx-auto">
      <h2 className="text-lg sm:text-2xl leading-[100%] font-semibold mb-4">Who Is Territory Pertner ?</h2>
      <div className="mx-auto w-30 h-[2px] sm:h-1 bg-[#026FBE] mb-4 sm:mb-7"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-18 items-center mx-auto">
        {/* Left Side - Image */}
        <div className="w-full h-full flex justify-center">
          <VideoSection />
        </div>

        {/* Right Side - Text */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2 sm:gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex items-center gap-2 sm:gap-6">
                  <div className="w-7 h-7 sm:w-15 sm:h-15 rounded-full flex items-center justify-center text-[#026FBE] bg-[#E0EEFE] font-semibold ">{benefit.icon}</div>
                  <p className="text-sm sm:text-2xl text-black ">{benefit.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
