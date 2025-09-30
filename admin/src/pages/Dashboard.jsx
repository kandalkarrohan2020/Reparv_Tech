import { useState } from "react";
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
import { useEffect } from "react";
import { useAuth } from "../store/auth";
import DashboardFilter from "../components/dashboard/DashboardFilter";

function Dashboard() {
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

  const customStyles = {
    rows: {
      style: {
        padding: "5px",
        fontSize: "14px",
        fontWeight: 500,
        color: "#111827",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "600",
        backgroundColor: "#F9FAFB",
        backgroundColor: "#00000007",
        color: "#374151",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#1F2937",
      },
    },
  };

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
      const response = await fetch(`${URI}/admin/dashboard/count`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Count.");
      const data = await response.json();
      console.log(data);
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
      <div className="overview-card-container gap-2 sm:gap-5 px-4 md:px-0 w-full grid place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5">
        {[
          {
            label: "Total Deal Amount",
            value:
              (Number(overviewCountData?.totalDealAmount) / 10000000).toFixed(
                2
              ) + " cr" || "00",
            icon: card1,
          },
          {
            label: "No. of Deal Done",
            value: overviewCountData?.totalCustomer || "00",
            icon: card2,
            to: "/customers",
          },
          {
            label: "Total Share",
            value:
              (Number(overviewCountData?.totalCommission) / 100000).toFixed(2) +
                " Lac" || "00",
            icon: card1,
          },
          {
            label: "Deal in Sq. Ft.",
            value: overviewCountData?.totalDealInSquareFeet || "00",
            icon: card4,
          },
          {
            label: "Reparv Share",
            value:
              (
                Number(overviewCountData?.totalReparvCommission) / 100000
              ).toFixed(2) + " Lac" || "00",
            icon: card1,
          },
          {
            label: "Sales Share",
            value:
              (
                Number(overviewCountData?.totalSalesCommission) / 100000
              ).toFixed(2) + " Lac" || "00",
            icon: card1,
          },
          {
            label: "Territory Share",
            value:
              (
                Number(overviewCountData?.totalTerritoryCommission) / 100000
              ).toFixed(2) + " Lac" || "00",
            icon: card1,
          },
          {
            label: "No of Enquiry",
            value: overviewCountData?.totalEnquiry || "00",
            //icon: card4,
            to: "/enquirers",
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
            label: "Employees",
            value: overviewCountData?.totalEmployee || "00",
            // icon: card4,
            to: "/employees",
          },
          {
            label: "Promoters",
            value: overviewCountData?.totalPromoter || "00",
            // icon: card4,
            to: "/promoters",
          },
          {
            label: "Project Partners",
            value: overviewCountData?.totalProjectPartner || "00",
            // icon: card4,
            to: "/projectpartner",
          },
          {
            label: "OnBoarding Partners",
            value: overviewCountData?.totalOnboardingPartner || "00",
            //icon: card4,
            to: "/onboardingpartner",
          },
          {
            label: "Sales Persons",
            value: overviewCountData?.totalSalesPerson || "00",
            //icon: card4,
            to: "/salespersons",
          },
          {
            label: "Territory Partners",
            value: overviewCountData?.totalTerritoryPartner || "00",
            //icon: card4,
            to: "/territorypartner",
          },
          {
            label: "Guest Users",
            value: overviewCountData?.totalGuestUser || "00",
            //icon: card4,
            to: "/guest-users",
          },
          {
            label: "Total Tickets",
            value: overviewCountData?.totalTicket || "00",
            //icon: card4,
            to: "/tickets",
          },
          {
            label: "Total Blogs",
            value: overviewCountData?.totalBlog || "00",
            //icon: card4,
            to: "/blogs",
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
                {[
                  "Total Deal Amount",
                  "Reparv Share",
                  "Total Share",
                  "Sales Share",
                  "Territory Share",
                ].includes(card.label) && <FaRupeeSign />}
                {card.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="overview-table w-full h-[60vh] flex flex-col p-4 md:p-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        <div className="w-full flex items-center justify-between md:justify-end gap-1 sm:gap-3">
          <p className="block md:hidden text-lg font-semibold">Dashboard</p>
        </div>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A] border">
            <CiSearch />
            <input
              type="text"
              placeholder="Search"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <div className="block">
                <CustomDateRangePicker range={range} setRange={setRange} />
              </div>
            </div>
          </div>
        </div>
        <div className="filterContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <DashboardFilter counts={propertyCounts} />
        </div>

        <h2 className="text-[16px] ml-1 font-semibold">Customer List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            customStyles={customStyles}
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={10}
            paginationComponentOptions={{
              rowsPerPageText: "Rows per page:",
              rangeSeparatorText: "of",
              selectAllRowsItem: true,
              selectAllRowsItemText: "All",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
