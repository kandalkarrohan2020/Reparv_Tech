import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import ActionSelect from "../components/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";

const Enquirers = () => {
  
  // Data and Paging State
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
      status: "Visit Rescheduled",
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
      status: "Visit Rescheduled",
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
    {
      name: "Name 9",
      contactNumber: "6677889900",
      budget: "₹85,000",
      city: "City 9",
      decisionTime: "5 Days",
      status: "Token",
      viewDetails: "",
    },
    {
      name: "Name 10",
      contactNumber: "6677889900",
      budget: "₹85,000",
      city: "City 10",
      decisionTime: "5 Days",
      status: "Token",
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
    <div className="enquirers overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
    
      <div className="enquirers-table w-full h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
      <p className="block md:hidden text-lg font-semibold">Enquirers</p>
        <div className="searchBarContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input md:w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
            />
          </div>
          <div className="rightTableHead w-full sm:w-1/2 min-w-[307px] sm:h-[36px] flex justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <FilterData />
              <CustomDateRangePicker />
            </div>
          </div>
        </div>

        <div className="overflow-scroll scrollbar-hide">
          <table className="overview-table w-[1188px] 2xl:w-full rounded-[16px]">
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
              {currentData.map((row, index) => (
                <tr key={index}>
                  <td
                    style={{width:"155px", height:"52px"}}
                    className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                      index % 2 === 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    }`}
                  >
                    {row.name}
                  </td>
                  <td
                    className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                      index % 2 === 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    }`}
                  >
                    {row.contactNumber}
                  </td>
                  <td
                    className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                      index % 2 === 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    }`}
                  >
                    {row.budget}
                  </td>
                  <td
                    className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                      index % 2 === 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    }`}
                  >
                    {row.city}
                  </td>
                  <td
                    className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                      index % 2 === 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    }`}
                  >
                    {row.decisionTime}
                  </td>
                  <td
                    className={`w-[155px] h-13 p-[12px] text-sm font-normal text-black ${
                      index % 2 === 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    }`}
                  >
                    <p
                      className={`text-center rounded-3xl p-1 ${
                        row.status === "Received"
                          ? "bg-[#EAFBF1] text-[#0BB501]"
                          : row.status === "Visit Scheduled"
                          ? "bg-[#E9F2FF] text-[#0068FF]"
                          : row.status === "Token"
                          ? "bg-[#FFF8DD] text-[#FFCA00]"
                          : row.status === "Cancelled"
                          ? "bg-[#FFEAEA] text-[#ff2323]"
                          : row.status === "Ongoing"
                          ? "bg-[#F4F0FB] text-[#5D00FF]"
                          : "bg-[#E8E9EA] text-[#7E7E7E]"
                      }`}
                    >
                      {row.status}
                    </p>
                  </td>
                  <td
                    className={`w-[155px] h-13 p-[8px] text-sm font-normal text-black ${
                      index % 2 === 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    }`}
                  >
                    <ActionSelect />
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

      {/* Paging Component */}
      <Paging
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Enquirers;
