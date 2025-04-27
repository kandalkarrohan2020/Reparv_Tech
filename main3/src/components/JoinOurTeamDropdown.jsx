import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinOurTeamDropdown = ({textColour}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleSelect = (value) => {
    setIsOpen(false); // close dropdown
    switch (value) {
      case "salesPartner":
        // window.open("https://reparv.com/", "_blank");
        navigate("/salespartner");
        break;
      case "territoryPartner":
        // window.open("https://reparv.com/territorypartner", "_blank");
        navigate("/territorypartner");
        break;
      case "onboardingPartner":
        //window.open("https://reparv.com/onboardingpartner", "_blank");
        navigate("/onboardingpartner");
        break;
      case "projectPartner":
        //  window.open("https://reparv.com/projectpartner", "_blank");
        navigate("/projectpartner");
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${textColour? "text-white":"text-gray-800"} font-medium hover:text-[#0BB501] hover:font-semibold focus:outline-none`}
      >
        Join Our Team
      </button>

      {isOpen && (
        <div className="absolute font-semibold font-sans tracking-wide z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul className=" text-sm text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 hover:text-[#0BB501] cursor-pointer"
              onClick={() => handleSelect("salesPartner")}
            >
              Sales Partner
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 hover:text-[#0BB501] cursor-pointer"
              onClick={() => handleSelect("territoryPartner")}
            >
              Territory Partner
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 hover:text-[#0BB501] cursor-pointer"
              onClick={() => handleSelect("onboardingPartner")}
            >
              Onboarding Partner
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 hover:text-[#0BB501] cursor-pointer"
              onClick={() => handleSelect("projectPartner")}
            >
              Project Partner
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default JoinOurTeamDropdown;
