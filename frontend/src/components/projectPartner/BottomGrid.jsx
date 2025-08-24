import React from "react";

const professionalOptions = [
  {
    number: "1",
    title: "Real Estate Professionals",
    desc: "Experienced agents and brokers looking to expand their reach and leverage advanced technology tools.",
  },
  {
    number: "2",
    title: "Property Developers",
    desc: "Builders and developers seeking reliable marketing and sales support to enhance project visibility.",
  },
  {
    number: "3",
    title: "Investment Consultants",
    desc: "Financial advisors specializing in real estate who want to offer transparent, high-quality investment opportunities.",
  },
];

const BottomGrid = () => {
  return (
    <div className="w-full py-10 px-4 flex justify-center">
      <div className="w-full max-w-[1130px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionalOptions.map((item, index) => (
          <div
            key={index}
            className="bg-[#FFFFFF1A] hover:shadow-sm hover:shadow-[#aeff9b] rounded-xl shadow-md p-8 flex flex-col gap-4 text-white"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFFFFF1A] text-white font-semibold flex items-center justify-center">
              {item.number}
            </div>
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-white/80">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomGrid;