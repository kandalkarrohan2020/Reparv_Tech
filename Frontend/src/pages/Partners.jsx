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
  const {showEplDetailsForm,setShowEplDetailsForm, action,setShowProfile} = useAuth();
  const [ isActive, setIsActive ] = useState("Builders");

  return (
    <div className={`partners w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start`}>
      <div className="partner-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          <div className="swipeButton h-[28px] flex items-center justify-center text-black text-sm cursor-pointer">
            <div onClick={()=>{setIsActive("Builders")}} className={`builderBtn px-3 py-1 border-[1.5px] rounded-tl-lg rounded-bl-lg border-[#4faa48] ${isActive === "Builders"?"text-[#076300] bg-[#E3FFDF] ":"bg-white"}`} >
              Builders
            </div>
            <div onClick={()=>{setIsActive("Sales")}} className={`SalesPersonBtn px-3 py-1 border-[1.5px] border-x-0  border-[#4faa48] ${isActive === "Sales"?"text-[#076300] bg-[#E3FFDF] ":"bg-white"}`}>
              Sales
            </div>
            <div onClick={()=>{setIsActive("Auction")}} className={`AuctionMemberBtn px-3 py-1 border-[1.5px] rounded-tr-lg rounded-br-lg border-[#4faa48] ${isActive === "Auction"?"text-[#076300] bg-[#E3FFDF] ":"bg-white"}`}>
              Auction
            </div>
          </div>
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
          <FaUserCircle onClick={()=>{setShowProfile("true")}} className="w-8 h-8 text-[#076300]" />
          <div className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px]">
            <p>Logout</p>
          </div>
        </div>
      </div>
      {isActive === "Builders"? <Builders/> : isActive === "Sales"? <SalesPerson/> : <AuctionMembers/>}
    </div>
    
  );
};

export default Partners;
