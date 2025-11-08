import { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import CitySelector from "../components/CitySelector";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../store/auth";

function Dashboard() {
  const { URI, user } = useAuth();
  const navigate = useNavigate();
  const [overviewData, setOverviewData] = useState([]);
  const [overviewCountData, setOverviewCountData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const menus = [
    {
      label: "Enquirers",
      value: overviewCountData?.totalEnquiry || "00",
      //icon: card4,
      to: "/enquirers",
    },
    {
      label: "Customers",
      value: overviewCountData?.totalCustomer || "00",
      //icon: card2,
      to: "/customers",
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
      label: "Project Partners",
      value: overviewCountData?.totalProjectPartner || "00",
      // icon: card4,
      to: "/projectpartner",
    },
    {
      label: "Onboarding Partners",
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
      label: "Blogs",
      value: overviewCountData?.totalBlog || "00",
      //icon: card4,
      to: "/blogs",
    },
    {
      label: "Tickets",
      value: overviewCountData?.totalTicket || "00",
      //icon: card4,
      to: "/tickets",
    },
  ];

  const fetchCountData = async () => {
    try {
      const response = await fetch(`${URI}/${user?.projectpartnerid ? "employee":"admin"}/dashboard/count`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Count.");
      const data = await response.json();
      //console.log(data);
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
      <div className="overview-card-container gap-2 sm:gap-3 px-4 md:px-0 w-full grid place-items-center grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-5">
        {menus
          .filter((menu) => user?.assignMenus?.includes(menu.label))
          .map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.to)}
              className="overview-card w-full max-w-[190px] sm:max-w-[290px] flex flex-col items-center justify-center gap-2 rounded-lg sm:rounded-[16px] p-4 sm:p-6 border-2 hover:border-[#0BB501] bg-white cursor-pointer"
            >
              <div className="upside w-full sm:max-w-[224px] h-[30px] sm:h-[40px] flex items-center justify-between gap-2 sm:gap-3 text-xs sm:text-base font-semibold ">
                <p>{card.label}</p>
                <p className="flex items-center justify-center text-xl">
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
    </div>
  );
}

export default Dashboard;
