import React from "react";
import fillFormIcon from "../../assets/home/fillFormIcon.svg";
import visitIcon from "../../assets/home/visitIcon.svg";
import dealIcon from "../../assets/home/dealIcon.svg";

const StepsSection = () => {
  const steps = [
    {
      title: "Fill the Form",
      description:
        "Provide Your Details to let us know your Preferences and requirements. Our team will get in touch to guide you through the process seamlessly.",
      icon: fillFormIcon,
    },
    {
      title: "Schedule A Visit",
      description:
        "Book a personalized visit to explore the property of your dreams. Our experts will ensure you have a hassle-free experience.",
      icon: visitIcon,
    },
    {
      title: "Close the Deal",
      description:
        "Seal the deal with confidence. We'll assist you with every step, ensuring a smooth transition to owning your dream property.",
      icon: dealIcon,
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 gap-6 pb-15 md:pb-25">
      <h2 className="text-[20px] sm:text-[28px] md:text-[40px] leading-6 md:leading-15 font-medium text-[#076300] ">
        Get Your Property in 3 Steps
      </h2>
      <div className="bg-[#076300] text-white px-4 py-16 rounded-2xl shadow-lg w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-15 md:gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center gap-4">
            <img src={step.icon} alt="" />
            <h3 className="text-lg sm:text-2xl font-medium ">{step.title}</h3>
            <p className="text-xs font-normal text-[#FFFFFFB2]">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsSection;
