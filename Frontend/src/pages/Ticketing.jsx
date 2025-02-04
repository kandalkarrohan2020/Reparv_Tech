import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import calender from "../assets/overview/calender.svg";
import { HiMiniFunnel } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ActionSelect from "../components/employee/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import { useAuth } from "../store/auth";
import CurrentDate from "../components/CurrentDate";
import FilterData from "../components/FilterData";

const Ticketing = () => {
  const { setShowProfile } = useAuth();
  const data = [
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
      viewDetails: "",
    },
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
      viewDetails: "",
    },
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
      viewDetails: "",
    },
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
      viewDetails: "",
    },
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
      viewDetails: "",
    },
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
      viewDetails: "",
    },
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
      viewDetails: "",
    },
    {
      ticketNo: "A1",
      dateAndTime: "23-01-2025 / 4:17 PM",
      issue: "Lead Issue",
      status: "Resolved",
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
    <div className="ticketing overflow-scroll max-w-[1168px] w-full h-screen py-10 px-4 flex flex-col items-start justify-start">
      <div className="ticketing-heading w-full max-w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[20px] sm:text-[16px] leading-[19.36px] text-black">
          Ticketing
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
      <div className="ticketing-table w-full max-w-[1136px] h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
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
              <FilterData/>
              <CustomDateRangePicker />
            </div>
          </div>
        </div>

        <div className="overflow-scroll scrollbar-hide">
          <table className="ticketing-table w-[1088px] h-[343px] rounded-[16px] overflow-hidden">
            <thead>
              <tr>
                {[
                  "Ticket No",
                  "Date / Time",
                  "Issues",
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
                    {row.ticketNo}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.dateAndTime}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.issue}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.status}
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

export default Ticketing;
