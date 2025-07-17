import React from "react";
import { FaPhoneAlt, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import CardAssuredTag from "../../assets/property/cardAssuredTag.svg";
import { useAuth } from "../../store/auth";
import FormatPrice from "../FormatPrice";
import { IoMdDoneAll } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PropertyBookingCard = ({ propertyInfo }) => {
  const navigate = useNavigate();
  const {
    priceSummery,
    setPriceSummery,
    setShowPriceSummery,
    setShowBenefitsPopup,
    setShowSiteVisitPopup,
    setPropertyImage,
    setPropertyCategory,
    setPropertyId,
  } = useAuth();
  return (
    <div
      className={`w-full max-w-[540px] flex flex-col gap-2 sm:gap-4 bg-white rounded-xl p-6 sm:border`}
    >
      {/* Title */}
      <h2 className="text-lg sm:text-2xl font-semibold">
        {propertyInfo.propertyName}
      </h2>

      {/* Flat/Plot Count */}
      <div
        className={`${
          ["NewFlat", "NewPlot"].includes(propertyInfo.propertyCategory)
            ? "flex"
            : "hidden"
        } flex flex-wrap gap-4 text-sm md:text-base font-medium text-[#00092966] group-hover:text-[#e2e2e2] mt-1`}
      >
        <div className={`py-[6px] sm:py-[8px] px-4 sm:px-6 flex gap-2 items-center justify-center text-green-700 bg-[#eeffec] rounded-xl`} >
          <span>Available</span>
          <div className="flex items-center justify-center text-xs md:text-sm py-[2px] px-2 bg-white rounded-lg">{propertyInfo.availableCount}</div>
        </div>
        
        <div className={`py-[6px] sm:py-[8px] px-4 sm:px-6 flex gap-2 items-center justify-center text-red-500 bg-red-100 rounded-xl`} >
          <span>Booked </span>
          <div className="flex items-center justify-center text-xs md:text-sm py-[2px] px-2 bg-white rounded-lg">{propertyInfo.bookedCount}</div>
        </div>
  
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-[11px] md:text-xs font-medium text-[#00092966] group-hover:text-[#e2e2e2] mt-1">
        <div
          className={`${
            propertyInfo.propertyCategory === "FarmLand" ? "hidden" : "flex"
          } py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl `}
        >
          <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
          <span>{propertyInfo.propertyApprovedBy}</span>
        </div>

        <div
          className={`py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl ${
            ["NewFlat", "NewPlot"].includes(propertyInfo.propertyCategory)
              ? "flex"
              : "hidden"
          }`}
        >
          <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
          <span>RERA Approved</span>
        </div>

        <div className="py-1 px-3 bg-[#0000000F] rounded-xl ">
          {propertyInfo.distanceFromCityCenter} KM Distance from city center
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center justify-between text-gray-700 mt-3">
        <div className="flex items-center justify-center gap-1 text-sm sm:text-base text-[#00000099] ">
          <FaMapMarkerAlt className="text-[#00000099]" />
          <span>
            {propertyInfo.city}, {propertyInfo.state || "Maharashtra"}
          </span>
        </div>

        <a
          href="tel:+918010881965"
          className="text-[#0BB501] text-xs sm:text-sm font-medium flex items-center gap-2 hover:underline"
        >
          <FaPhoneAlt className="text-xs" />
          Call Agent
        </a>
      </div>

      {/* REPARV Assured */}
      <div className="flex items-center justify-between text-[#0BB501]">
        <img src={CardAssuredTag} alt="" />
        <button
          onClick={() => {
            setShowBenefitsPopup(true);
          }}
          className=" text-black text-sm sm:text-sm underline cursor-pointer"
        >
          Know benefits
        </button>
      </div>

      {/* EMI Box */}
      <div className="border border-[#0000001A] rounded-lg mt-4 p-4 space-y-4">
        <div
          className={`${
            propertyInfo.propertyCategory === "RentalFlat" ||
            propertyInfo.propertyCategory === "RentalShop" ||
            propertyInfo.propertyCategory === "RentalOffice" ||
            propertyInfo.loanAvailability === "No"
              ? "hidden"
              : "flex"
          } items-center justify-between`}
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs sm:text-sm text-[#0b0b0b7b] ">
              EMI starts at
            </p>
            <p className="text-xl font-bold">
              <FormatPrice price={propertyInfo.emi} />{" "}
              <span className="text-base font-medium">/mo</span>
            </p>
          </div>
          <button onClick={()=>{navigate("/check-eligibility")}} className="flex items-center text-black text-xs sm:text-sm font-medium gap-1 hover:text-[#0BB501] transition cursor-pointer">
            Check eligibility{" "}
            <HiOutlineArrowNarrowRight className="text-xl font-normal" />
          </button>
        </div>

        <hr
          className={`${
            propertyInfo.propertyCategory === "RentalFlat" ||
            propertyInfo.propertyCategory === "RentalShop" ||
            propertyInfo.propertyCategory === "RentalOffice" ||
            propertyInfo.loanAvailability === "No"
              ? "hidden"
              : "flex"
          } text-[#0000001A] `}
        />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-base font-bold">
              <FormatPrice price={propertyInfo.totalOfferPrice} />
            </p>
            <p className="text-xs sm:text-sm text-gray-500">+Other Charged</p>
          </div>
          <button
            onClick={() => {
              setShowPriceSummery(true);
              setPriceSummery(propertyInfo);
              console.log(priceSummery);
            }}
            className="flex items-center text-xs sm:text-sm font-medium gap-1 hover:text-[#0BB501] transition cursor-pointer"
          >
            Pricing Breakup{" "}
            <HiOutlineArrowNarrowRight className="text-xl font-normal" />
          </button>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          setShowSiteVisitPopup(true);
          setPropertyImage(JSON.parse(propertyInfo.frontView)[0]);
          setPropertyId(JSON.parse(propertyInfo.propertyid));
          setPropertyCategory(propertyInfo.propertyCategory);
        }}
        className="w-full hidden sm:block bg-[#0BB501] text-white font-semibold py-3 mt-4 rounded-lg text-lg sm:text-2xl active:scale-95 cursor-pointer"
      >
        Book Site Visit Now
      </button>
    </div>
  );
};

export default PropertyBookingCard;
