import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import calender from "../assets/overview/calender.svg";
import { HiMiniFunnel } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import BuilderForm from "../components/partners/BuilderForm";
import { useAuth } from "../store/auth";
import ActionSelect from "../components/employee/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import FilterData from "../components/FilterData";
import SwipeButton from "../components/partners/SwipeButton";

const Builders = () => {
  const { showBuilderForm, setShowBuilderForm, action } = useAuth();
  const func = () => {
    console.log("add");
  };
  const data = [
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get data for the current page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const emptyRows = itemsPerPage - currentData.length;

  return (
    <div className={`builders`}>
      {!showBuilderForm ? (
        <>
          <div className="builder-table w-full h-[550px] sm:h-[578px] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
            <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
              <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search Builder"
                  className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
                />
              </div>
              <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
                <div className="flex flex-wrap items-center justify-end gap-3 px-2">
                  <FilterData/>
                  <CustomDateRangePicker />
                </div>
                <AddButton label={"Add Builder"} func={setShowBuilderForm} />
              </div>
            </div>

            <div className="overflow-scroll scrollbar-hide">
              <table className="overview-table w-[1188px] 2xl:w-full h-[343px] rounded-[16px]">
                <thead>
                  <tr>
                    {[
                      "Name",
                      "Employee Id",
                      "Contact Number",
                      "Mail",
                      "City",
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
                  {currentData.map((row, index) => (
                    <tr key={index}>
                      <td
                        style={{ width: "155px", height: "52px" }}
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.name}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.employeeId}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.contactNumber}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.mail}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.city}
                      </td>
                      <td
                        className={`p-[8px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        <ActionSelect func={setShowBuilderForm} />
                      </td>
                    </tr>
                  ))}
                  {Array.from({ length: emptyRows }).map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td colSpan={7} className="h-13"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Paging
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <BuilderForm label={action} handleMethod={func} />
      )}
    </div>
  );
};

export default Builders;
