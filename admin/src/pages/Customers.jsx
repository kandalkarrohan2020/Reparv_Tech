import { parse } from "date-fns";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import { IoMdClose } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import FilterData from "../components/FilterData";
import DataTable from "react-data-table-component";
import { useAuth } from "../store/auth";
import DownloadCSV from "../components/DownloadCSV";
import Loader from "../components/Loader";
import propertyPicture from "../assets/propertyPicture.svg";
import FormatPrice from "../components/FormatPrice";

const Customers = () => {
  const { URI, setLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URI}/admin/customers`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Customers.");
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error("Error fetching :", err);
    } finally {
      setLoading(false);
    }
  };

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const filteredData = customers.filter((item) => {
    const matchesSearch =
      item.tittle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status?.toLowerCase().includes(searchTerm.toLowerCase());

    let startDate = range[0].startDate;
    let endDate = range[0].endDate;

    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate) endDate = new Date(endDate.setHours(23, 59, 59, 999));

    const itemDate = parse(
      item.created_at,
      "dd MMM yyyy | hh:mm a",
      new Date()
    );

    const matchesDate =
      (!startDate && !endDate) ||
      (startDate && endDate && itemDate >= startDate && itemDate <= endDate);

    return matchesSearch && matchesDate;
  });

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, width: "50px" },
    {
      name: "Property",
      cell: (row) => {
        let imageSrc = propertyPicture;

        try {
          const parsed = JSON.parse(row.frontView);
          if (Array.isArray(parsed) && parsed[0]) {
            imageSrc = `${URI}${parsed[0]}`;
          }
        } catch (e) {
          console.warn("Invalid or null frontView:", row.frontView);
        }

        return (
          <div className="w-[130px] h-14 overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt="Property"
              onClick={() => {
                window.open(
                  "https://www.reparv.in/property-info/" + row.seoSlug,
                  "_blank"
                );
              }}
              className="w-full h-[90%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      omit: false,
      width: "130px",
    },
    { name: "Date & Time", selector: (row) => row.created_at, width: "200px" },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      minWidth: "150px",
    },
    {
      name: "Payment Type",
      selector: (row) => row.paymenttype,
      minWidth: "150px",
    },
    {
      name: "Deal Amount",
      selector: (row) => <FormatPrice price={row.dealamount}/> ,
      minWidth: "150px",
    },
    {
      name: "Token Amount",
      selector: (row) => <FormatPrice price={row.tokenamount}/>,
      minWidth: "150px",
    },
    {
      name: "Remark",
      selector: (row) => row.remark,
      minWidth: "200px",
    },
    {
      name: "",
      cell: (row) => <ActionDropdown row={row} />,
      width: "120px",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  const handleMethod = () => {
    console.log("add");
  };

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id, seoSlug) => {
      switch (action) {
        case "view":
          break;
        case "update":
          //setBlogId(id);
          //edit(id);
          break;
        case "delete":
          //del(id);
          break;
        default:
          console.log("Invalid action");
      }
    };

    return (
      <div className="relative inline-block w-[120px]">
        <div className="flex items-center justify-between p-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span className=" text-[12px]">{selectedAction || "Action"}</span>
          <FiMoreVertical className="text-gray-500" />
        </div>
        <select
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          value={selectedAction}
          onChange={(e) => {
            const action = e.target.value;
            handleActionSelect(action, row.id, row.seoSlug);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  return (
    <div className="customers overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="customers-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        <div className="w-full flex items-center justify-between md:justify-end gap-1 sm:gap-3">
          <p className="block md:hidden text-lg font-semibold">Customers</p>
          <div className="flex xl:hidden flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
            <Loader />
            <DownloadCSV data={filteredData} filename={"Customers.csv"} />
          </div>
        </div>
        <div className="searchBarContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
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
            <div className="hidden xl:flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
              <DownloadCSV data={filteredData} filename={"Customers.csv"} />
            </div>
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Customers List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable columns={columns} data={filteredData} pagination />
        </div>
      </div>
    </div>
  );
};

export default Customers;
