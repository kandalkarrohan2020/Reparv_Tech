import React from "react";
import "./Overview.css";
import cityIcon from "../assets/overview/cityIcon.png";
import downArrow from "../assets/overview/downArrow.png";
import calender from "../assets/overview/calender.png";
import card1 from "../assets/overview/card1.png";
import card2 from "../assets/overview/card2.png";
import card3 from "../assets/overview/card3.png";
import card4 from "../assets/overview/card4.png";
import { FaRupeeSign } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

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
    <div className="overview">
      <div className="overviewHeading">
        <div className="leftHeading">Overview</div>
        <div className="rightHeading">
          <div className="citySelecter">
            <img src={cityIcon} alt="" />
            <p>City</p>
            <img src={downArrow} alt="" />
          </div>
          <div className="dateSelecter">
            <p>Select Date Range</p>
            <img src={calender} alt="" />
          </div>
        </div>
      </div>

      <div className="overviewCardContainer">
        <div className="overviewCard">
          <div className="upside">
            <p>Total Deal Amount</p>
            <img src={card1} alt="" />
          </div>
          <div className="downside">
            <p>
              <FaRupeeSign />
              30.6 Lac
            </p>
          </div>
        </div>

        <div className="overviewCard">
          <div className="upside">
            <p>No. of Deal Done</p>
            <img src={card2} alt="" />
          </div>
          <div className="downside">
            <p>
              <FaRupeeSign />
              7,265
            </p>
          </div>
        </div>

        <div className="overviewCard">
          <div className="upside">
            <p>Reparv Share</p>
            <img src={card3} alt="" />
          </div>
          <div className="downside">
            <p>
              <FaRupeeSign />
              70K
            </p>
          </div>
        </div>

        <div className="overviewCard">
          <div className="upside">
            <p>Deal in Sq. Ft.</p>
            <img src={card4} alt="" />
          </div>
          <div className="downside">
            <p>
              <FaRupeeSign />
              7,265 Sq. Ft.
            </p>
          </div>
        </div>
      </div>

      <div className="overviewTable">
        <div className="search-bar">
          <CiSearch />
          <input
            type="text"
            placeholder="Search Builder"
            className="search-input"
          />
        </div>

        <table className="overview-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Owner / Company Name</th>
              <th>No. of Deal Done</th>
              <th>Deal Done Amount</th>
              <th>Reparv Share (Amount)</th>
              <th>Deal Sq. Ft.</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.projectName}</td>
                <td>{row.builderName}</td>
                <td>{row.deals}</td>
                <td>{row.dealAmount}</td>
                <td>{row.reparvShare}</td>
                <td>{row.dealSqFt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overviewFooter">
        <div className="leftButton">
          <FaAngleLeft />
        </div>
        <p>1/10</p>
        <div className="rightButton">
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
}

export default Overview;
