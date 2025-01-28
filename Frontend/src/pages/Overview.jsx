import React from "react";
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

function Overview() {
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
  ];

  return (
    <div className="overview w-[1168px] h-[744px] pt-10 px-4 flex flex-col items-start justify-start">
      <div className="overview-heading w-[1136px] h-[36px] flex justify-between text-lg font-semibold">
        <div className="left-heading flex items-center text-[16px] leading-[19.36px] text-black">
          Overview
        </div>
        <div className="right-heading w-[135px] h-[32px] flex items-center justify-between mr-5">
          <FaUserCircle className="w-8 h-8 text-[#076300]" />
          <div onClick={()=>{navigate("/")}} className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px] cursor-pointer">
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
          <div className="rightTableHead min-w-[310px] h-[36px] flex justify-center items-center">
            <div className="min-w-[310px] h-[36px] flex gap-6 items-center justify-between">
              <CitySelector></CitySelector>
              <CustomDateRangePicker/>
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

      <Paging totalPages={10} />
    </div>
  );
}

export default Overview;
