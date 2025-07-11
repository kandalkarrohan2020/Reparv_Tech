import { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import card1 from "../assets/overview/card1.svg";
import card2 from "../assets/overview/card2.svg";
import card3 from "../assets/overview/card3.svg";
import card4 from "../assets/overview/card4.svg";
import CitySelector from "../components/CitySelector";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

function Overview() {
  const { URI } = useAuth();
  const navigate = useNavigate();
  const [overviewData, setOverviewData] = useState([]);
  const [overviewCountData, setOverviewCountData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = overviewData?.filter(
    (item) =>
      item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.builderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dealAmount.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    {
      name: "Project Name",
      selector: (row) => row.projectName,
      sortable: true,
    },
    {
      name: "Builder Name",
      selector: (row) => row.builderName,
      sortable: true,
    },
    { name: "Deals", selector: (row) => row.deals, sortable: true },
    { name: "Deal Amount", selector: (row) => row.dealAmount, sortable: true },
    {
      name: "Reparv Share",
      selector: (row) => row.reparvShare,
      sortable: true,
    },
    { name: "Deal In SQFT", selector: (row) => row.dealInSqFt, sortable: true },
  ];

  const fetchCountData = async () => {
    try {
      const response = await fetch(`${URI}/project-partner/dashboard/count`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Count.");
      const data = await response.json();
      setOverviewCountData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchCountData();
  }, []);

  return (
    <div className="overview overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="overview-card-container px-4 md:px-0 gap-2 sm:gap-5 w-full grid place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5">
        <div className="overview-card w-full max-w-[272px] h-[132px] flex gap-1 flex-col items-center justify-center rounded-[24px] p-6 bg-transperent">
          <div className="upside w-full max-w-[224px] h-[40px] flex items-center justify-between gap-3 text-[24px] font-normal text-black">
            <p>Hii Franchise, </p>
          </div>
          <div className="downside w-[224px] h-[40px] flex items-center text-[40px] font-semibold text-black">
            <p className="flex items-center justify-center">Welcome</p>
          </div>
        </div>

        {[
          {
            label: "Total Deal Amount",
            value: (Number(overviewCountData?.totalDealAmount) / 10000000).toFixed(2) + " cr" || "00",
            icon: card1,
          },
          {
            label: "No. of Deal Done",
            value: overviewCountData?.totalCustomer || "00",
            icon: card2,
            to: "/customers",
          },

          {
            label: "Deal in Sq. Ft.",
            value: overviewCountData?.totalDealInSquareFeet || "00",
            icon: card4,
          },
          {
            label: "Properties",
            value: overviewCountData?.totalProperty || "00",
            //icon: card4,
            to: "/properties",
          },
          {
            label: "Builders",
            value: overviewCountData?.totalBuilder || "00",
            // icon: card4,
            to: "/builders",
          },
          {
            label: "Total Tickets",
            value: overviewCountData?.totalTicket || "00",
            //icon: card4,
            to: "/tickets",
          },
        ].map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.to)}
            className="overview-card w-full max-w-[190px] sm:max-w-[272px] h-[85px] sm:h-[132px] flex flex-col items-center justify-center gap-2 rounded-lg sm:rounded-[24px] p-4 sm:p-6 bg-gradient-to-b from-[#0BB501] to-[#076300] hover:to-[#0f930f] bg-blend-multiply cursor-pointer"
          >
            <div className="upside w-full sm:max-w-[224px] h-[30px] sm:h-[40px] flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-base font-medium text-white">
              <p>{card.label}</p>
              <img
                src={card.icon}
                alt=""
                className={`${
                  card.icon ? "block" : "hidden"
                } w-5 sm:w-10 h-5 sm:h-10`}
              />
            </div>
            <div className="downside w-full h-[30px] sm:w-[224px] sm:h-[40px] flex items-center text-xl sm:text-[32px] font-semibold text-white">
              <p className="flex items-center justify-center">
                {["Total Deal Amount"].includes(card.label) && <FaRupeeSign />}
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-table w-full h-[500px] sm:h-[420px] flex flex-col p-6 gap-4 bg-white rounded-[24px]">
        <p className="block md:hidden text-lg font-semibold">Overview</p>
        <div className="searchBarContainer w-full flex sm:flex-row flex-col items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search"
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
          <DataTable
            className="scrollbar-hide"
            columns={columns}
            data={filteredData}
            pagination
          />
        </div>
      </div>
    </div>
  );
}

export default Overview;
