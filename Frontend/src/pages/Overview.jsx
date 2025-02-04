import React from "react";
import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import cityIcon from "../assets/overview/cityIcon.svg";
import downArrow from "../assets/overview/downArrow.svg";
import calender from "../assets/overview/calender.svg";
import card1 from "../assets/overview/card1.svg";
import card2 from "../assets/overview/card2.svg";
import card3 from "../assets/overview/card3.svg";
import card4 from "../assets/overview/card4.svg";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Paging from "../components/Paging";
import CitySelector from "../components/CitySelector";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import { useAuth } from "../store/auth";

function Overview() {
  const { setShowProfile } = useAuth();
  const navigate = useNavigate();

  const data = [
    {
      projectName: "Project Name",
      builderName: "Builder Name 1",
      deals: 1,
      dealAmount: "₹942.00",
      reparvShare: "₹942.00",
      dealSqFt: "942 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 2",
      deals: 2,
      dealAmount: "₹881.00",
      reparvShare: "₹881.00",
      dealSqFt: "881 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 3",
      deals: 3,
      dealAmount: "₹409.00",
      reparvShare: "₹409.00",
      dealSqFt: "409 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 4",
      deals: 4,
      dealAmount: "₹953.00",
      reparvShare: "₹953.00",
      dealSqFt: "953 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 5",
      deals: 5,
      dealAmount: "₹907.00",
      reparvShare: "₹907.00",
      dealSqFt: "907 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 3",
      deals: 3,
      dealAmount: "₹409.00",
      reparvShare: "₹409.00",
      dealSqFt: "409 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 4",
      deals: 4,
      dealAmount: "₹953.00",
      reparvShare: "₹953.00",
      dealSqFt: "953 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 5",
      deals: 5,
      dealAmount: "₹907.00",
      reparvShare: "₹907.00",
      dealSqFt: "907 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 3",
      deals: 3,
      dealAmount: "₹409.00",
      reparvShare: "₹409.00",
      dealSqFt: "409 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 4",
      deals: 4,
      dealAmount: "₹953.00",
      reparvShare: "₹953.00",
      dealSqFt: "953 Sq. Ft.",
    },
    {
      projectName: "Project Name",
      builderName: "Builder Name 5",
      deals: 5,
      dealAmount: "₹907.00",
      reparvShare: "₹907.00",
      dealSqFt: "907 Sq. Ft.",
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
    <div className="overview overflow-scroll max-w-[1168px] w-full h-screen py-10 sm:px-4 px-0 flex flex-col items-start justify-start">
      <div className="overview-heading w-full max-w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[20px] sm:text-[16px] leading-[19.36px] text-black">
          Overview
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between">
          <FaUserCircle
            onClick={() => {
              setShowProfile("true");
            }}
            className="w-8 h-8 text-[#076300]"
          />
          <div
            onClick={() => {
              navigate("/");
            }}
            className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px] cursor-pointer"
          >
            <p>Logout</p>
          </div>
        </div>
      </div>

      <div className="overview-card-container gap-5 w-full max-w-[1136px] grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5">
        {[
          {
            label: "Total Deal Amount",
            value: "30.6 Lac",
            icon: card1,
          },
          {
            label: "No. of Deal Done",
            value: "7,265",
            icon: card2,
          },
          {
            label: "Reparv Share",
            value: "70K",
            icon: card3,
          },
          {
            label: "Deal in Sq. Ft.",
            value: "7,265 Sq. Ft.",
            icon: card4,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="overview-card w-full max-w-[272px] h-[132px] flex flex-col items-center justify-center gap-2 rounded-[24px] p-6 bg-gradient-to-b from-[#0BB501] to-[#076300] bg-blend-multiply"
          >
            <div className="upside w-full max-w-[224px] h-[40px] flex items-center justify-between gap-3 text-base font-medium text-white">
              <p>{card.label}</p>
              <img src={card.icon} alt="" />
            </div>
            <div className="downside w-[224px] h-[40px] flex items-center text-[32px] font-semibold text-white">
              <p className="flex items-center justify-center">
                <FaRupeeSign />
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-table w-full max-w-[1136px] h-[500px] sm:h-[420px] flex flex-col p-6 gap-4 bg-white rounded-[24px]">
        <div className="searchBarContainer w-full max-w-[1088px] flex sm:flex-row flex-col items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
            />
          </div>
          <div className="rightTableHead w-full sm:w-1/2 min-w-[307px] sm:h-[36px] flex justify-end items-center">
            <div className="flex flex-wrap-reverse sm:flex-nowrap gap-2 px-2">
              <CitySelector></CitySelector>
              <CustomDateRangePicker />
            </div>
          </div>
        </div>
        
        <div className="overflow-scroll scrollbar-hide">
          <table className="overview-table w-[1088px] h-[320px] rounded-[16px]">
            <thead>
              <tr>
                {[
                  "Project Name",
                  "Owner / Company Name",
                  "No. of Deal Done",
                  "Deal Done Amount",
                  "Reparv Share (Amount)",
                  "Deal Sq. Ft.",
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
                  <td style={{width:"155px", height:"52px"}}
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.projectName}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.builderName}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.deals}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.dealAmount}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.reparvShare}
                  </td>
                  <td
                    className={`p-[15px] text-sm font-normal text-black ${
                      index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                    } `}
                  >
                    {row.dealSqFt}
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
}

export default Overview;
