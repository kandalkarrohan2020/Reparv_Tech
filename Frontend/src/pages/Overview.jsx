import React from "react";
import { FaRupeeSign } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import cityIcon from "../assets/overview/cityIcon.png";
import downArrow from "../assets/overview/downArrow.png";
import calender from "../assets/overview/calender.png";
import card1 from "../assets/overview/card1.png";
import card2 from "../assets/overview/card2.png";
import card3 from "../assets/overview/card3.png";
import card4 from "../assets/overview/card4.png";
import { FaUserCircle } from "react-icons/fa";

function Overview() {
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
  ];

  return (
    <div className="overview w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start">
      <div className="overview-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Overview
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
          <FaUserCircle className="w-8 h-8 text-[#076300]" />
          <div className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px]">
            <p>Logout</p>
          </div>
        </div>
      </div>

      <div className="overview-card-container w-[1136px] h-[150px] flex items-center justify-between my-[10px]">
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
            className="overview-card w-[272px] h-[132px] flex flex-col items-center justify-center gap-2 rounded-[24px] p-6 bg-gradient-to-b from-[#0BB501] to-[#076300] bg-blend-multiply"
          >
            <div className="upside w-[224px] h-[40px] flex items-center justify-between text-base font-medium text-white">
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

      <div className="overview-table w-[1136px] h-[420px] flex flex-col p-6 gap-4 bg-white rounded-[24px]">
        <div className="searchBarContainer w-[1088px] h-[36px] flex align-center justify-between">
          <div className="search-bar w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
            />
          </div>
          <div className="rightTableHead w-[310px] h-[36px] flex justify-between items-center">
            <div className="w-[310px] h-[36px] flex gap-6 items-center justify-between">
              <div className="city-selector w-[107px] h-[36px] flex items-center justify-center leading-[20px] border border-[#0000001A] rounded-[8px] gap-4 py-2 px-3 text-sm text-[#000000] cursor-pointer">
                <img src={cityIcon} alt="" />
                <p>City</p>
                <img src={downArrow} alt="" />
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
            {data.map((row, index) => (
              <tr key={index}>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.projectName}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.builderName}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.deals}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.dealAmount}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.reparvShare}
                </td>
                <td className="p-[15px] text-sm font-normal text-black bg-[#0000000A]">
                  {row.dealSqFt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overview-footer w-[1136px] h-[52px] flex items-center justify-end gap-2 my-[10px] p-[10px] text-xs font-medium">
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
}

export default Overview;
