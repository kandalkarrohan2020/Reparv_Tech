import React from "react";
import projectPartner from "/src/assets/project_partner.png";

export default function ProjectPartner() {
  return (
    <div className="absolute flex flex-col items-center gap-8 w-full h-[518px] top-[650px] md:top-[700px] lg:top-[700px] p-0">
      {/* Header Section */}
      <div className="flex mx-auto flex-col justify-center lg:items-center gap-4 lg:w-[747px] h-[152px] p-0">
        <h2 className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#076300] text-[28px] lg:text-[40px] leading-[48px]">
          Who is a Project Partner?
        </h2>

        <p className="w-[358px] lg:w-[427px] h-[72px] text-center text-[#999999] lg:text-[#00000066] text-[16px] leading-[19px] lg:leading-[160%]">
          A Project Partner is an individual, company, or organization that
          collaborates on multiple real estate projects by contributing
          resources, expertise, or investment.
        </p>

        {/* Green Line */}
        <div className="w-[100px] lg:mt-5 h-0 border-2 border-[#0BB501] mx-auto"></div>
      </div>

      {/* Image Banner Section */}
      <div
        style={{ backgroundImage: `url(${projectPartner})` }}
        className="join absolute w-[360px] md:w-[359px] lg:w-[747px] h-[200px] lg:h-[334px] rounded-lg bg-cover bg-center lg:left-[22%] md:left-[30%] top-[170px] lg:top-[184px]"
      >
        <div className="absolute flex flex-col items-start gap-1 lg:w-[747px] h-[138px] top-[59px] lg:top-[194px] bg-gradient-to-b from-transparent via-transparent to-[#000000] rounded-b-[12px]">
          {/* Join Our Network */}
          <p className="w-[334px] lg:w-[616px] text-white text-[16px] lg:text-[24px] leading-[19px] lg:leading-[29px] font-semibold p-5 mt-5">
            Join Our Network
          </p>

          <p className="lg:w-[616px] px-4 lg:px-5 text-white text-opacity-40 text-[12px] lg:text-[16px] font-medium leading-[15px] lg:leading-[19px]">
            Partner with Reparv to access exclusive real estate opportunities
            and grow your business with our support.
          </p>
        </div>
      </div>
    </div>
  );
}
