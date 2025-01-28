import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import calender from "../assets/overview/calender.svg";
import { HiMiniFunnel } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ActionSelect from "../components/employee/ActionSelect";

const Customers = () => {
  const data = [
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 1",
      contactNumber: "1234567890",
      city: "City 1",
      enquiryDate: "1 Jan 2025",
      assignedPerson: "Name",
      decisionTime: "1 Jan 2025",
      status: "Received",
      viewDetails: "",
    },
  ];

  return (
    <div className="customers w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start">
      <div className="customers-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Enquirers
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
          <FaUserCircle className="w-8 h-8 text-[#076300]" />
          <div className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px]">
            <p>Logout</p>
          </div>
        </div>
      </div>
      <div className="enquirers-table w-[1136px] h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="searchBarContainer w-[1088px] h-[36px] flex align-center justify-between">
          <div className="search-bar w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
            />
          </div>
          <div className="rightTableHead w-[244px] h-[36px] flex justify-between items-center">
            <div className="w-[244px] h-[36px] flex gap-6 items-center justify-between">
              <div className="city-selector w-[40px] h-[32px] flex items-center justify-center leading-[20px] border border-[#0000001A] rounded-[8px] gap-4 py-2 px-3 text-sm text-[#000000] cursor-pointer">
                <HiMiniFunnel />
              </div>
              <div className="date-selector w-[187px] h-[36px] flex items-center justify-between border border-[#0000001A] rounded-[8px] py-2 px-3 text-sm text-[#00000066] cursor-pointer">
                <p>Select Date Range</p>
                <img src={calender} alt="" />
              </div>
            </div>
          </div>
        </div>
        <table className="overview-table w-[1088px] h-[343px] overflow-hidden rounded-[16px]">
          <thead>
            <tr>
              {[
                "Name",
                "Contact Number",
                "City",
                "Enquiry Date",
                "Assigned Person",
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
                  {row.city}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.enquiryDate}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.assignedPerson}
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

      <div className="enquirers-footer w-[1136px] h-[52px] flex items-center justify-end gap-2 my-[10px] p-[10px] text-xs font-medium">
        <div className="left-button w-[24px] h-[20px] flex items-center justify-center border border-[#0000001A] rounded-[6px] cursor-pointer">
          <FaAngleLeft />
        </div>
        <p>1/10</p>
        <div className="right-button w-[24px] h-[20px] flex items-center justify-center border border-[#0000001A] rounded-[6px] cursor-pointer">
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default Customers;
