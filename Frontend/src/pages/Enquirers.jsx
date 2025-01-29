import React from "react";
import { CiSearch } from "react-icons/ci";
import calender from "../assets/overview/calender.svg";
import { HiMiniFunnel } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ActionSelect from "../components/employee/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import { useAuth } from "../store/auth";

const Enquirers = () => {
  const { setShowProfile } = useAuth();
  const data = [
    {
      name: "Name 1",
      contactNumber: "1234567890",
      budget: "₹50,000",
      city: "City 1",
      decisionTime: "1 Week",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 2",
      contactNumber: "0987654321",
      budget: "₹60,000",
      city: "City 2",
      decisionTime: "2 Weeks",
      status: "Visit Scheduled",
      viewDetails: "",
    },
    {
      name: "Name 3",
      contactNumber: "1122334455",
      budget: "₹70,000",
      city: "City 3",
      decisionTime: "3 Days",
      status: "Token",
      viewDetails: "",
    },
    {
      name: "Name 4",
      contactNumber: "2233445566",
      budget: "₹80,000",
      city: "City 4",
      decisionTime: "1 Month",
      status: "Cancelled",
      viewDetails: "",
    },
    {
      name: "Name 5",
      contactNumber: "3344556677",
      budget: "₹1,00,000",
      city: "City 5",
      decisionTime: "Immediate",
      status: "Ongoing",
      viewDetails: "",
    },
    {
      name: "Name 6",
      contactNumber: "4455667788",
      budget: "₹40,000",
      city: "City 6",
      decisionTime: "2 Days",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 7",
      contactNumber: "5566778899",
      budget: "₹75,000",
      city: "City 7",
      decisionTime: "3 Weeks",
      status: "Visit Scheduled",
      viewDetails: "",
    },
    {
      name: "Name 8",
      contactNumber: "6677889900",
      budget: "₹85,000",
      city: "City 8",
      decisionTime: "5 Days",
      status: "Token",
      viewDetails: "",
    },
  ];

  return (
    <div className="enquirers w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start">
      <div className="overview-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Enquirers
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
          <FaUserCircle onClick={()=>{setShowProfile("true")}} className="w-8 h-8 text-[#076300]" />
          <div className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px]">
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="enquirers-table w-[1136px] h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="searchBarContainer w-[1088px] h-[36px] flex align-center justify-between">
          <div className="search-bar min-w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
            />
          </div>
          <div className="rightTableHead min-w-[244px] h-[36px] flex justify-between items-center">
            <div className="min-w-[244px] h-[36px] flex gap-6 items-center justify-between">
              <div className="city-selector w-[40px] h-[32px] flex items-center justify-center leading-[20px] border border-[#0000001A] rounded-[8px] gap-4 py-2 px-3 text-sm text-[#000000] cursor-pointer">
                <HiMiniFunnel />
              </div>
              <CustomDateRangePicker/>          
            </div>
          </div>
        </div>
        <table className="overview-table w-[1088px] h-[343px] overflow-hidden rounded-[16px]">
          <thead>
            <tr>
              {[
                "Name",
                "Contact Number",
                "Budget",
                "City",
                "Decision Time",
                "Status",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className="py-[15px] px-[10px] text-left text-xs font-normal text-[#00000066]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.name}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.contactNumber}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.budget}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.city}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.decisionTime}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.status}
                </td>
                <td className="p-[8px] text-sm font-normal text-black bg-[#0000000A]">
                  <ActionSelect/>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paging totalPages={10} />
    </div>
  );
};

export default Enquirers;
