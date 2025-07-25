import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineKingBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaDiamond } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import propertyPicture from "../assets/property/propertyPicture.svg";
import cardAssuredTag from "../assets/property/cardAssuredTag.svg";
import populerTag from "../assets/property/populerTag.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormatPrice from "./FormatPrice";
import { useAuth } from "../store/auth";
import { usePropertyFilter } from "../store/propertyFilter";

function OtherProperties({ propertyCategory, propertyId }) {
  const navigate = useNavigate();
  const { URI, setPriceSummery, setShowPriceSummery } = useAuth();
  const { selectedCity } = usePropertyFilter();
  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    try {
      let url = `${URI}/frontend/properties?`;
      const params = [];

      if (selectedCity && selectedCity.trim() !== "") {
        params.push(`city=${encodeURIComponent(selectedCity)}`);
      }

      if (propertyCategory && propertyCategory.trim() !== "") {
        params.push(`propertyCategory=${encodeURIComponent(propertyCategory)}`);
      }

      url += params.join("&");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      const filtered = data.filter((p) => p.seoSlug !== propertyId);
      setProperties(filtered);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [propertyCategory]);

  return (
    <div className="otherProperties w-full overflow-scroll scrollbar-hide grid place-items-center grid-flow-col gap-6 py-4 sm:p-5">
      {properties.map((property) => (
        <div
          onClick={() => navigate(`/property-info/${property.seoSlug}`)}
          key={property.seoSlug}
          className="w-[350px] sm:w-[375px] border border-[#00000033] rounded-2xl shadow-md bg-white overflow-hidden"
        >
          <img
            src={(() => {
              try {
                const images = JSON.parse(property.frontView || "[]");
                return images.length > 0
                  ? `${URI}${images[0]}`
                  : `${propertyPicture}`;
              } catch {
                return `${propertyPicture}`;
              }
            })()}
            alt={property.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `${propertyPicture}`;
            }}
            className="object-cover h-[200px] w-full bg-[#00000020]"
          />
          <div className="relative flex flex-col gap-2">
            {property.likes > 500 && (
              <img
                src={populerTag}
                className="absolute top-[-15px] left-[-8px]"
              ></img>
            )}

            <div className="w-full px-4 pt-4 flex text-base font-semibold leading-[150%] spacing-[-1%] ">
              <span className="text-[#000929] group-hover:text-white">
                {property.propertyName.length > 26
                  ? `${property.propertyName.slice(0, 25)}...`
                  : property.propertyName}
              </span>
            </div>

            <div className="w-full px-4 flex flex-col items-center justify-between">
              <div className="w-full flex justify-between gap-2 text-base lg:text-xl font-extrabold">
                <div
                  className={`${
                    property.propertyCategory === "RentalFlat" ||
                    property.propertyCategory === "RentalShop" ||
                    property.propertyCategory === "RentalOffice" ||
                    property.loanAvailability === "No"
                      ? "hidden"
                      : "flex"
                  } text-black group-hover:text-white gap-1 items-center justify-center `}
                >
                  EMI <FormatPrice price={property.emi} />
                  /m
                </div>
                <div className="text-black group-hover:text-white flex flex-col gap-1 items-start justify-center ">
                  <span className="text-[#00000066] group-hover:text-white line-through text-xs font-medium ">
                    <FormatPrice price={Math.floor(property.totalSalesPrice)} />
                  </span>
                  <FormatPrice price={property.totalOfferPrice} />
                  <span
                    onClick={() => {
                      setShowPriceSummery(true);
                      setPriceSummery(property);
                    }}
                    className="text-[#00000066] underline text-xs font-medium cursor-pointer group-hover:text-white "
                  >
                    +Other Charged
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 px-4 text-[10px] md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2] mt-2">
              <div
                className={`${
                  property.propertyCategory === "FarmLand" ? "hidden" : "flex"
                } py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl `}
              >
                <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
                <span>{property.propertyApprovedBy}</span>
              </div>

              <div
                className={`py-1 px-3 gap-1 items-center justify-center text-gray-600 bg-[#eeffec] rounded-xl ${
                  ["NewFlat", "NewPlot"].includes(property.propertyCategory)
                    ? "flex"
                    : "hidden"
                }`}
              >
                <IoMdDoneAll className="w-[17px] h-[17px] text-green-700" />
                <span>RERA Approved</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 px-4 text-[10px] md:text-xs font-medium  text-[#00092966] group-hover:text-[#e2e2e2]">
              <div className="py-1 px-3 bg-[#0000000F] rounded-xl ">
                {property.distanceFromCityCenter} KM Distance from city center
              </div>
            </div>

            <hr className="text-[#F0EFFB] my-2 " />
            <div className="w-full flex px-4 justify-between mb-1">
              <img src={cardAssuredTag} alt="" className="w-40" />
              <div className="text-sm py-1 px-3 bg-[#0000000F] group-hover:text-[#e2e2e2] rounded-xl ">
                {property.propertyCategory}
              </div>
            </div>

            <div className="w-full flex gap-1 items-center justify-start py-3 px-4 rounded-bl-lg rounded-br-lg address text-[10px] md:text-xs lg:text-sm font-normal text-[#808080] group-hover:text-[#e2e2e2] bg-[#0000000F] ">
              <CiLocationOn className="text-[#07630066] group-hover:text-white w-5 h-5" />
              <p className="text-[#808080] group-hover:text-[#e2e2e2]">
                {property.location.length > 25
                  ? `${property.location.slice(0, 24)}...`
                  : property.location}
                , {property.city}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OtherProperties;
