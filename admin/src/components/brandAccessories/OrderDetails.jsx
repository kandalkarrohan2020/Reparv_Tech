import React from "react";
import { parse } from "date-fns";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../../store/auth";
import CustomDateRangePicker from "../CustomDateRangePicker";
import AddButton from "../AddButton";
import FilterData from "../FilterData";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../Loader";
import DownloadCSV from "../DownloadCSV";
import TableFilter from "./tableFilter";

const OrderDetails = ({ selectedTable, setSelectedTable }) => {
  const { URI, setLoading, showOrder, setShowOrder } = useAuth();

  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [newOrder, setNewOrder] = useState({
    orderId: "",
    productName: "",
    partnerName: "",
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(
        URI + "/admin/brand-accessories/product/orders/get",
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Orders.");
      const data = await response.json();
      console.log(data);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(
        URI + `/admin/brand-accessories/product/order/${id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch blog.");
      const data = await response.json();

      setNewOrder(data);

      // Only show form after blog data is loaded
      setShowOrder(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // change status record
  const changeStatus = async (id) => {
    if (!window.confirm("Are you sure you want to change this Product status?"))
      return;

    try {
      const response = await fetch(
        URI + `/admin/brand-accessories/order/status/${id}`,
        {
          method: "PUT",
          credentials: "include", //  Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedStatus }),
        }
      );
      const data = await response.json();
      //console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      await fetchData();
    } catch (error) {
      console.error("Error changing status :", error);
    }
  };

  //Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Order ?")) return;

    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/brand-accessories/order/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Order deleted successfully!");
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting Order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const filteredData = orders.filter((item) => {
    const matchesSearch =
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ordererid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ordererName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const customStyles = {
    rows: {
      style: {
        padding: "5px 0px",
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
    {
      name: "Product Image",
      cell: (row) => {
        let imageSrc =
          URI + row.productImage ||
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c";
        return (
          <div className="w-[110px] h-[62px] overflow-hidden rounded-lg border flex items-center justify-center">
            <img
              src={imageSrc}
              alt="productImage"
              onClick={() => {
                //navigate(`${URI}${row.image}`, "_blank");
              }}
              className="w-full h-[100%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      width: "150px",
    },

    { name: "Date & Time", selector: (row) => row.created_at, width: "200px" },
    {
      name: "Status",
      cell: (row, index) => (
        <span
          className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md cursor-pointer ${
            row.status === "New"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FFEAEA] text-[#ff2323]"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
      width: "150px",
    },
    {
      name: "Order ID",
      cell: (row, index) => (
        <span
          className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md cursor-pointer ${
            row.status === "New"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FFEAEA] text-[#ff2323]"
          }`}
        >
          {row.orderId}
        </span>
      ),
      width: "200px",
    },
    {
      name: "Product",
      selector: (row) => row.productName,
      sortable: true,
      minWidth: "150px",
      maxWidth: "200px",
    },
    {
      name: "Quantity",
      selector: (row) => row.orderQuantity + " Units",
      sortable: true,
      minWidth: "100px",
      maxWidth: "200px",
    },
    {
      name: "Customer",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-md bg-[#EAFBF1] text-[#0BB501]`}>
          <p>{row.ordererName}</p>
          <p>{row.ordererContact}</p>
        </span>
      ),
      minWidth: "250px",
    },
    {
      name: "State",
      selector: (row) => row.ordererState,
      minWidth: "150px",
    },
    {
      name: "City",
      selector: (row) => row.ordererCity,
      minWidth: "150px",
    },
    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} />,
      width: "120px",
    },
  ];

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "view":
          //
          break;
        case "status":
          //status(id);
          break;
        case "update":
          setOrderId(id);
          edit(id);
          break;
        case "delete":
          del(id);
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
            handleActionSelect(action, row.id);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View</option>
          <option value="status">Status</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  return (
    <div
      className={`overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className="sales-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        <div className="w-full flex items-center justify-between gap-1 sm:gap-3">
          <TableFilter
            selectedTable={selectedTable}
            setSelectedTable={setSelectedTable}
          />
          <div className="flex xl:hidden flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
            <DownloadCSV data={filteredData} filename={"Orders.csv"} />
          </div>
        </div>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
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
            <div className="hidden xl:flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
              <DownloadCSV data={filteredData} filename={"Order.csv"} />
            </div>
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Order List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            customStyles={customStyles}
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={15}
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
};

export default OrderDetails;
