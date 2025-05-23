import React from "react";
import {
  MdOutlineHandshake,
  MdEditNote,
  MdCurrencyRupee,
} from "react-icons/md";

const StepSection = () => {
  const steps = [
    {
      id: 1,
      icon: (
        <MdEditNote className="text-[#F04C5D] w-10 h-10 sm:w-15 lg:w-20 sm:h-15 lg:h-20" />
      ),
      title: "Step 1",
      description: "Register Yourself",
      bg: "bg-[#FBF5F5]",
    },
    {
      id: 2,
      icon: (
        <MdOutlineHandshake className="text-[#39B957] w-10 h-10 sm:w-15 lg:w-20 sm:h-15 lg:h-20" />
      ),
      title: "Step 2",
      description: "Complete Training",
      bg: "bg-[#EAFFEE]",
    },
    {
      id: 3,
      icon: (
        <MdCurrencyRupee className="text-[#F6A12C] w-10 h-10 sm:w-15 lg:w-20 sm:h-15 lg:h-20" />
      ),
      title: "Step 3",
      description: "Start Earning",
      bg: "bg-[#FFF1E6]",
    },
  ];
  return (
    <div className="w-full flex flex-col pb-20 sm:pb-40 items-center">
      <div className="relative w-full h-75 flex flex-col items-center bg-[#076300] rounded-xl p-4 sm:p-6 mb-8">
        <h2 className="text-white mt-4 sm:mt-10 text-xl md:text-3xl font-semibold text-center">
          Join REPARV with 3 easy steps
        </h2>
        <div className="absolute bottom-[-120px] sm:py-2 shadow sm:shadow-none sm:bottom-[-170px] w-[300px] sm:w-auto sm:bg-transparent rounded-3xl bg-white overflow-hidden grid grid-cols-1 sm:grid-cols-3 gap-[1px] sm:gap-6 md::gap-10 items-center justify-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className=" w-[300px] sm:w-auto bg-white sm:rounded-xl shadow-md flex sm:flex-col gap-10 sm:gap-2 items-center text-center p-6 sm:p-8 lg:p-10 "
            >
              <div
                className={`w-15 h-15 sm:w-30 lg:w-40 sm:h-30 lg:h-40 ${step.bg} rounded-full flex items-center justify-center sm:mb-4`}
              >
                {step.icon}
              </div>
              <div className="flex flex-col">
                <h3 className="text-base sm:text-lg lg:text-2xl font-bold ">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base lg:text-xl text-[#535353] font-medium mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepSection;
