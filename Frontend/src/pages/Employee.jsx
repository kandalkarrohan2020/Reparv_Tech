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
import AddButton from "../components/AddButton";

const Employee = () => {
  const {showEplDetailsForm,setShowEplDetailsForm, action,setShowProfile} = useAuth();
  
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
      viewDetails: ""
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      position: "Sales",
      viewDetails: ""
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      position: "Sales",
      viewDetails: ""
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      position: "Sales",
      viewDetails: ""
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      position: "Sales",
      viewDetails: ""
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      position: "Sales",
      viewDetails: ""
    },
  ];

  return (
    <div className={`employee w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start`}>
      {!showEplDetailsForm?
      <>
      <div className="overview-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Employee
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
          <div className="search-bar w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
            />
          </div>
          <div className="rightTableHead min-w-[467px] h-[36px] flex justify-between items-center">
            <div className="min-w-[251px] h-[36px] flex gap-6 items-center justify-between">
              <div className="city-selector w-[40px] h-[32px] flex items-center justify-center leading-[20px] border border-[#0000001A] rounded-[8px] gap-4 py-2 px-3 text-sm text-[#000000] cursor-pointer">
                <HiMiniFunnel />
              </div>
              <CustomDateRangePicker/>
            </div>
            <AddButton label={"Add Employee"} func={setShowEplDetailsForm}/>
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
                "Actions"
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
                <td className={`p-[15px] text-sm font-normal text-black ${index%2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"} `}>
                  {row.name}
                </td>
                <td className={`p-[15px] text-sm font-normal text-black ${index%2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"} `}>
                  {row.employeeId}
                </td>
                <td className={`p-[15px] text-sm font-normal text-black ${index%2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"} `}>
                  {row.contactNumber}
                </td>
                <td className={`p-[15px] text-sm font-normal text-black ${index%2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"} `}>
                  {row.mail}
                </td>
                <td className={`p-[15px] text-sm font-normal text-black ${index%2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"} `}>
                  {row.position}
                </td>
                <td className={`p-[8px] text-sm font-normal text-black ${index%2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"} `}>
                 <ActionSelect func={setShowEplDetailsForm}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paging totalPages={10} />
      </>
      :
     <EmployeeDetailsForm label={action} handleMethod={""}/>
     }
    </div>
  
  );
};

export default Employee;
