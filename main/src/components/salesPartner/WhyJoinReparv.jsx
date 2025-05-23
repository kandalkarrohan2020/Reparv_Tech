import { FaRegCircleCheck } from "react-icons/fa6";
import VideoSection from "../VideoSection";

const benefits = [
  {
    title: "Get paid on successful deal",
    description:
      "Get payment directly in your bank account after each successful deal payment received to owner",
  },
  {
    title: "Flexible working hours",
    description: "Choose your working hours according to your convenience",
  },
  {
    title: "Verified property availability",
    description: "All available properties are cross verified from Reparv team",
  },
  {
    title: "Expert sales support",
    description: "10+ years experience expert support for sales closing",
  },
  {
    title: "Digital working platform",
    description:
      "Understand and match client need & requirements with your digital access of reparv",
  },
];

export default function WhyJoinReparv() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-3xl leading-[100%] font-semibold mb-4">Why Join REPARV?</h2>
      <p className="italic mb-6 text-sm sm:text-base">
        At reparv, we respect your time and efforts. We know you deserve the
        best, so we strive to give you the best.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 items-center mx-auto">
        {/* Left Side - Image */}
        <div className="w-full h-full flex justify-center">
          <VideoSection />
        </div>

        {/* Right Side - Text */}
        <div>
          <ul className="flex flex-col gap-2 sm:gap-4 pr-6">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex gap-2 items-start">
                <div>
                 <FaRegCircleCheck className="text-[#0BB501] sm:w-5 sm:h-5 mt-1" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold text-sm sm:text-base">{benefit.title}</h4>
                  <p className="text-xs sm:text-sm text-[#00000066] ">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
