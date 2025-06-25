import React from "react";
import salesBackImage from "../assets/joinOurTeam/salesPartner/salesBack.svg";
import salesMobileBackImage from "../assets/joinOurTeam/salesPartner/salesMobileBack.png";
import WhyJoinReparv from "../components/salesPartner/WhyJoinReparv";
import RegisterForm from "../components/salesPartner/RegisterForm";
import StepSection from "../components/salesPartner/StepSection";
import SalesTestimonial from "../components/salesPartner/SalesTestimonial";
import SEO from "../components/SEO";
import RegistrationForm from "../components/salesPartner/RegistrationForm";

function SalesPartner() {
  return (
    <>
      <SEO
        title={"Earn from Real Estate – Become a Reparv Sales Partner"}
        description={
          "Get paid directly for every successful real estate deal. Just ₹599/year to join. Work from anywhere with expert guidance and a verified property base."
        }
        keywords={""}
      />
      <div className="w-full">
        {/* Sales Top BackGround */}
        <div className="w-full flex flex-col items-center justify-center backImage relative">
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
          {/* Registration Button */}
          <div className="absolute hidden sm:flex items-center justify-center bottom-[20%] left-[14.5%]">
            <a href="#registrationForm">
              <button className="w-[20vw] h-[4vw] text-white bg-[#0BB501] cursor-pointer active:scale-95 rounded-lg text-[1.6vw] font-semibold transition">
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
          </div>
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

        {/* Sales Testimonial */}
        <div className="flex items-center justify-center mx-auto max-w-[1600px] ">
          <SalesTestimonial />
        </div>

        {/* Registration Form */}
        <div
          id="registrationForm"
          className="flex items-center justify-center mx-auto pb-8 pt-10 sm:py-20 max-w-[1600px] "
        >
          <RegistrationForm />
        </div>
      </div>
    </>
  );
}

export default SalesPartner;
