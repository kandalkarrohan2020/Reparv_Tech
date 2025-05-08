import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineKingBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaDiamond } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import cardAssuredTag from "../../assets/property/cardAssuredTag.svg";
import populerTag from "../../assets/property/populerTag.svg";
import { useNavigate } from "react-router-dom";
import FormatPrice from "../FormatPrice";
import { useAuth } from "../../store/auth";

function OtherProperties({ propertyTypeId, propertyId }) {
  const navigate = useNavigate();
  const { URI } = useAuth();
  const [properties, setProperties] = useState([]);

  // fetch Properties
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/${propertyTypeId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      const filtered = data.filter(
        (p) => Number(p.propertyid) !== Number(propertyId)
      );
      setProperties(filtered);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const addLike = async (id) => {
    try {
      const response = await fetch(
        `${URI}/frontend/${propertyTypeId}/like/${id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to Add Like.");
      else {
        console.log("Like added Successfully!");
        fetchData();
      }
    } catch (err) {
      console.log("Error Updating Like:", err);
    }
  };

  console.log(properties);
  useEffect(() => {
    fetchData();
  }, [propertyTypeId]);

  return (
    <div className="otherProperties w-full overflow-scroll scrollbar-hide grid place-items-center grid-flow-col gap-3 py-4 sm:p-0">
      {properties.map((property) => (
        <div
          onClick={() => navigate(`/property-info/${property.propertyid}`)}
          key={property.propertyid}
          className="group w-[350px] border border-[#00000033] rounded-lg shadow-md bg-white hover:bg-[#076300] overflow-hidden"
        >
          <img
            src={`${URI}${property.image}`}
            alt={property.name}
            className=" object-cover h-[250px] w-full"
          />
          <div className="relative p-4 flex flex-col gap-2">
            {property.likes > 500 && (
              <img
                src={populerTag}
                className="absolute top-[-15px] left-[-8px]"
              ></img>
            )}

            <div className="w-full flex text-base font-semibold leading-[150%] spacing-[-1%]">
              <span className="text-[#000929] group-hover:text-white">
                {property.property_name.length > 29
                  ? `${property.property_name.slice(0, 28)}...`
                  : property.property_name}
              </span>
            </div>

            <div className="w-full flex flex-col items-center justify-between">
              <div className="w-full flex justify-between gap-2 text-base lg:text-xl font-extrabold">
                <div className="text-[#076300] group-hover:text-white flex gap-1 items-start justify-center ">
                  EMI <FormatPrice price={property.sqft_price / 12} />
                  /m
                </div>
                <div className="text-[#076300] group-hover:text-white flex flex-col gap-1 items-start justify-center ">
                  <FormatPrice price={property.sqft_price} />
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      console.log("Show Other Charges!");
                    }}
                    className="text-[#00000066] text-xs font-medium cursor-pointer group-hover:text-white active:scale-95 "
                  >
                    +Other Charged
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-xs md:text-sm text-[#00092966] group-hover:text-[#e2e2e2] mt-2 px-4">
              <div className="flex items-center justify-start gap-2 ">
                <MdOutlineKingBed className="text-[#07630066] group-hover:text-white w-5 h-5" />
                3 Beds
              </div>
              <div className="flex items-center justify-start gap-2 ">
                <BiBath className="text-[#07630066] group-hover:text-white w-5 h-5" />
                2 Bathrooms
              </div>

              <div className="flex items-center justify-start gap-2 ">
                <FaDiamond className="text-[#07630066] group-hover:text-white w-3 h-3" />
                {property.area} Sqft
              </div>
            </div>

            <hr className="text-[#F0EFFB] my-2" />

            <div className="w-full flex gap-2 flex-wrap-reverse justify-between text-xs md:text-sm text-[#808080] group-hover:text-[#e2e2e2]">
              <div className="w-1/2 flex gap-1 items-center justify-start address text-[10px] lg:text-xs font-normal">
                <CiLocationOn className="text-[#07630066] group-hover:text-white w-5 h-5" />
                <p className="text-[#808080] group-hover:text-[#e2e2e2]">
                  {property.location.length > 9
                    ? `${property.location.slice(0, 8)}...`
                    : property.location}
                  , {property.city}
                </p>
              </div>
              <img src={cardAssuredTag} alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OtherProperties;
