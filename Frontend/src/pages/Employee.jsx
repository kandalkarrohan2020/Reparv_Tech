import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import calender from "../assets/overview/calender.png";
import { HiMiniFunnel } from "react-icons/hi2";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

const Employee = () => {
  const data = [
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      position: "Sales",
      viewDetails: "",
    },
    {
        name: "Name 1",
        employeeId: "A:MO28",
        contactNumber: "1234567890",
        mail: "abc@gmail.com",
        position: "Sales",
        viewDetails: "",
      },
      {
        name: "Name 1",
        employeeId: "A:MO28",
        contactNumber: "1234567890",
        mail: "abc@gmail.com",
        position: "Sales",
        viewDetails: "",
      },
      {
        name: "Name 1",
        employeeId: "A:MO28",
        contactNumber: "1234567890",
        mail: "abc@gmail.com",
        position: "Sales",
        viewDetails: "",
      },
      {
        name: "Name 1",
        employeeId: "A:MO28",
        contactNumber: "1234567890",
        mail: "abc@gmail.com",
        position: "Sales",
        viewDetails: "",
      },
      {
        name: "Name 1",
        employeeId: "A:MO28",
        contactNumber: "1234567890",
        mail: "abc@gmail.com",
        position: "Sales",
        viewDetails: "",
      },
      {
        name: "Name 1",
        employeeId: "A:MO28",
        contactNumber: "1234567890",
        mail: "abc@gmail.com",
        position: "Sales",
        viewDetails: "",
      },
      {
        name: "Name 1",
        employeeId: "A:MO28",
        contactNumber: "1234567890",
        mail: "abc@gmail.com",
        position: "Sales",
        viewDetails: "",
      },
  ];

  return (
    <div className="enquirers w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start">
      <div className="overview-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Enquirers
        </div>
        <div className="right-heading w-[251px] h-[36px] flex gap-6 items-center justify-between">
          <div className="city-selector w-[40px] h-[32px] flex items-center justify-center leading-[20px] border border-[#0000001A] rounded-[8px] gap-4 py-2 px-3 text-sm text-[#000000] cursor-pointer">
            <HiMiniFunnel />
          </div>
          <div className="date-selector w-[187px] h-[36px] flex items-center justify-between border border-[#0000001A] rounded-[8px] py-2 px-3 text-sm text-[#00000066] cursor-pointer">
            <p>Select Date Range</p>
            <img src={calender} alt="" />
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
        <div className="addEmployeeButton cursor-pointer w-[192px] h-[36px] flex items-center justify-center gap-3 border border-[#00000033] rounded-[8px] bg-[#076300] font-semibold text-4 leading-5 text-[#FFFFFF] active:scale-[0.98]">
          <FaPlus className="text-[20px]"/>
          <p>Add Employee</p>
        </div>
        </div>
        <table className="overview-table w-[1088px] h-[343px] overflow-hidden rounded-[16px]">
          <thead>
            <tr>
              {[
                "Name",
                "Employee Id",
                "Contact Number",
                "Mail",
                "Position",
                "View Details",
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
                  {row.employeeId}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.contactNumber}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.mail}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.position}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  <Link to={row.viewDetails} className="flex align-center justify-center" ><IoMdEye className="text-[24px] text-[#007AFF] "/></Link>
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

export default Employee;
