import React from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";

import {
  FaHandshake,
  FaMapMarkedAlt,
  FaBuilding,
  FaUserPlus,
  FaArrowRight,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const partners = [
    {
      title: "Sales Partner",
      icon: <FaHandshake className="text-[#00b501] w-10 h-10" />,
      desc: "Join as a Sales Partner and boost your property sales with digital tools, verified listings, and instant commission on successful deals.",
      link: "/sales-partner",
      color: "from-green-50 to-white",
    },
    {
      title: "Project Partner",
      icon: <FaBuilding className="text-[#00b501] w-10 h-10" />,
      desc: "Collaborate with builders and developers, manage projects, and reach buyers through Reparv’s trusted marketing ecosystem.",
      link: "/project-partner",
      color: "from-green-50 to-white",
    },
    {
      title: "Territory Partner",
      icon: <FaMapMarkedAlt className="text-[#00b501] w-10 h-10" />,
      desc: "Lead your region, manage a team, and drive property growth as a Territory Partner with strong leadership and strategic execution.",
      link: "/territory-partner",
      color: "from-white to-green-50",
    },
    {
      title: "Onboarding Partner",
      icon: <FaUserPlus className="text-[#00b501] w-10 h-10" />,
      desc: "Work directly with property owners, ensure smooth listing, documentation, and onboarding while earning structured commissions.",
      link: "/onboarding-partner",
      color: "from-white to-green-50",
    },
  ];

  return (
    <>
      <SEO
        title="Become a Trusted Real Estate Partner with Reparv | Verified Listings & High Commission Opportunities"
        description="Start your real estate journey with the Reparv Partner Program. Work with verified properties, earn structured commissions, and join as a Sales, Onboarding, Territory, or Project Partner. Apply now and boost your income."
      />
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 py-12 px-6">
      <div className="max-w-5xl mx-auto text-center mb-15">
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#076506] mb-6">
          Join the Reparv Partner Network
        </h1>
        <p className="text-gray-600 text-lg md:text-xl font-medium max-w-5xl mx-auto">
          Become a part of the fastest-growing property ecosystem — whether
          you're selling, managing, onboarding, or leading. Reparv empowers you
          to grow your real estate career.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:gap-12 max-w-5xl mx-auto">
        {partners.map((partner, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${partner.color} shadow-lg hover:shadow-2xl rounded-2xl py-15 px-12 flex flex-col sm:flex-row items-center justify-between transition-transform duration-300 hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-8 sm:gap-10">
              <div className="bg-white shadow-md p-4 rounded-full">
                {partner.icon}
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-[#076506] mb-3">
                  {partner.title}
                </h2>
                <p className="text-gray-700 text-base sm:mr-4">{partner.desc}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(partner.link)}
              className="min-w-[180px] flex items-center justify-center text-base sm:text-lg mt-6 sm:mt-0 gap-2 bg-[#00b501] hover:bg-[#076506] text-white font-semibold px-6 py-4 rounded-lg shadow-md transition duration-200 cursor-pointer"
            >
              <span>Read More</span> <FaArrowRight />
            </button>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}