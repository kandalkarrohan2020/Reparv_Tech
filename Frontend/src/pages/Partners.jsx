import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import calender from "../assets/overview/calender.svg";
import { HiMiniFunnel } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import EmployeeDetailsForm from "../components/employee/EmployeeDetailsForm";
import { useAuth } from "../store/auth";
import ActionSelect from "../components/employee/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import Builders from "./Builders";
import SalesPerson from "./SalesPerson";
import AuctionMembers from "./AuctionMembers";

const Partners = () => {
  const {
    showEplDetailsForm,
    setShowEplDetailsForm,
    action,
    setShowProfile,
    showBuilderForm,
    showSalesForm,
    showAuctionForm,
    isActive,
    setIsActive,
  } = useAuth();

  return (
    <div
      className={`partners overflow-scroll max-w-[1168px] w-full h-screen py-5 sm:py-10 px-0 sm:px-4 flex flex-col items-start justify-start`}
    >
      <div
        className={`partner-heading w-full max-w-[1136px] flex flex-col-reverse sm:flex-row justify-between gap-4 text-lg font-semibold ${
          showBuilderForm === true ||
          showSalesForm === true ||
          showAuctionForm === true
            ? "hidden"
            : "block"
        }`}
      >
        <div className="left-heading flex items-center text-[20px] sm:text-[16px] leading-[19.36px] text-black">
          <span>{isActive}</span>
        </div>
        <div className="right-heading w-full gap-5 sm:w-[135px] h-[32px] flex items-center justify-end sm:justify-between mr-5">
          <FaUserCircle
            onClick={() => {
              setShowProfile("true");
            }}
            className="w-8 h-8 text-[#076300]"
          />
          <div className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px]">
            <p>Logout</p>
          </div>
        </div>
      </div>
      
      <div className="w-full">
        {isActive === "Builders" ? (
          <Builders />
        ) : isActive === "Sales Persons" ? (
          <SalesPerson />
        ) : (
          <AuctionMembers />
        )}
      </div>
    </div>
  );
};

export default Partners;
