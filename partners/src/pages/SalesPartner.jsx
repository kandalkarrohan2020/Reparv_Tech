import React from "react";
import { useState, lazy, Suspense } from "react";
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import salesBackImage from "../assets/joinOurTeam/salesPartner/salesBack.svg";
import salesMobileBackImage from "../assets/joinOurTeam/salesPartner/salesMobileBack.png";
import WhyJoinReparv from "../components/salesPartner/WhyJoinReparv";
import { IoMdDownload } from "react-icons/io";
import StepSection from "../components/salesPartner/StepSection";
// Lazy load heavy components
const SalesTestimonial = lazy(() =>
  import("../components/salesPartner/SalesTestimonial")
);
import SEO from "../components/SEO";
import SubscriptionSection from "../components/salesPartner/SubscriptionSection";
import playStore from "../assets/google-play-store-logo.png"

function SalesPartner() {
  const { URI } = useAuth();
  const partnerType = "Sales Partner"
  const [plans, setPlans] = useState([]);
  
  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/subscription/pricing/plans/" + partnerType, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Subscription Plans.");
      const data = await response.json();
      console.log(data);
      setPlans(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            <a href="#subscriptionSection">
              <button className="w-[20vw] h-[4vw] text-white bg-[#0BB501] cursor-pointer active:scale-95 rounded-lg text-[1.6vw] font-semibold transition">
                Register Now
              </button>
            </a>
          </div>
          <div className="w-full absolute bottom-[0px] sm:hidden flex items-center justify-center">
            <a href="#subscriptionSection" className="w-full">
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
          <div className="pt-10 pb-4">
            <StepSection />
          </div>
        </div>

        <div className="w-full pt-4 pb-12 flex items-center justify-center">
          <div
            onClick={() => {
              window.open(
                "https://play.google.com/store/apps/details?id=com.reparvnewsalesapp",
                "_blank"
              );
            }}
            className="w-full sm:w-[350px] px-4 cursor-pointer"
          >
            <div className="w-full flex gap-3 items-center justify-center text-lg sm:text-xl font-semibold text-white bg-[#076300] px-12 py-3 rounded-lg active:scale-95 ">
              <span>Sales Partner  {" "} </span>
              <img className="w-7 h-7" src={playStore} alt="" />
            </div>
          </div>
        </div>

        {/* Lazy Loaded Sales Testimonial */}
        <Suspense
          fallback={
            <div className="w-full py-10 font-bold text-center text-gray-500">
              Loading Testimonials...
            </div>
          }
        >
          <div className="flex items-center justify-center mx-auto max-w-[1600px]">
            <SalesTestimonial />
          </div>
        </Suspense>

        {/* Subscription Plan */}
        <div
          id="subscriptionSection"
          className="flex items-center justify-center mx-auto pb-8 pt-10 sm:py-20 max-w-[1600px] "
        >
          <SubscriptionSection plans={plans}/>
        </div>
      </div>
    </>
  );
}

export default SalesPartner;
