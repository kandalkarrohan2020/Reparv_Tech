import React from "react";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import calender from "../assets/overview/calender.svg";
import { HiMiniFunnel } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ActionSelect from "../components/employee/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import { useAuth } from "../store/auth";
import FilterData from "../components/FilterData";

const Customers = () => {
  const { setShowProfile } = useAuth();
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
    <div className="customers overflow-scroll max-w-[1168px] w-full h-screen py-10sm:px-4 px-0 flex flex-col items-start justify-start">
      <div className="customers-heading w-full max-w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[20px] sm:text-[16px] leading-[19.36px] text-black">
          Customers
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
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

      <div className="customers-table w-full max-w-[1136px] h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="searchBarContainer w-full max-w-[1088px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
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
          <table className="overview-table w-[1088px] overflow-hidden rounded-[16px]">
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
                    {row.contactNumber}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.city}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.enquiryDate}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.assignedPerson}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.decisionTime}
                  </td>
                  <td
                    className={`p-[12px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
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
                    className={`p-[8px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
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

      <Paging
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Customers;
