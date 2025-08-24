import React from "react";
import salesBackImage from "../assets/joinOurTeam/salesPartner/salesBack.svg";
import salesMobileBackImage from "../assets/joinOurTeam/salesPartner/salesMobileBack.png";
import WhyJoinReparv from "../components/salesPartner/WhyJoinReparv";
import RegisterForm from "../components/salesPartner/registerForm";
import StepSection from "../components/salesPartner/StepSection";
import SalesTestimonial from "../components/salesPartner/SalesTestimonial";

function SalesPartner() {
  return (
    <div className="w-full">
      {/* Sales Top BackGround */}
      <div className="w-full flex flex-col lg:pb-35 items-center justify-center backImage relative">
        <img
          src={salesBackImage}
          alt=""
          className="w-full max-w-[1600px] hidden sm:block mx-auto"
        />
        <img
          src={salesMobileBackImage}
          alt=""
          className="w-full block sm:hidden mx-auto"
        />
        <div className="hidden lg:block registerForm w-full max-w-[1050px] mx-auto absolute bottom-4 ">
          <RegisterForm />
        </div>
      </div>
      
       {/* Registration Form */}
      <div className="flex lg:hidden registerForm w-full max-w-[1050px] mx-auto ">
        <RegisterForm />
      </div>

      {/* Sales Other Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Why Join Reparv Section */}
        <div className="py-10">
          <WhyJoinReparv />
        </div>

        {/* Step Section */}
        <div className="py-10">
          <StepSection />
        </div>
      </div>

      {/* Step Section */}
      <div className="flex items-center justify-center mx-auto pb-7 sm:pb-20 max-w-[1600px] ">
          <SalesTestimonial />
      </div>

    </div>
  );
}

export default SalesPartner;
