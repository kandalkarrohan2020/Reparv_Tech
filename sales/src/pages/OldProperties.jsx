import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";

const Properties = () => {
  const {
    setShowPropertyForm,
    URI,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/properties", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rerano.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    {
      name: "Image",
      cell: (row) => (
        <div className={`w-full h-14 overflow-hidden flex items-center justify-center`}>
          <img src={`${URI}${row.image}`} alt="Image" className="w-full h-[90%] object-cover" />
        </div>
      ),
    },
    { name: "Builder", selector: (row) => row.company_name, sortable: true },
    { name: "Type", selector: (row) => row.propertytypeid, sortable: true },
    { name: "Name", selector: (row) => row.property_name, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "city", selector: (row) => row.city, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Rera No.", selector: (row) => row.rerano, sortable: true },
    { name: "Area", selector: (row) => row.area, sortable: true },
    { name: "Price Sqft", selector: (row) => row.sqft_price, sortable: true },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.status === "Active"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FBE9E9] text-[#FF0000]"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Approve",
      cell: (row) => (
        <span
          className={`w-[150px] px-2 py-1 rounded-md ${
            row.approve === "Approved"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FBE9E9] text-[#FF0000]"
          }`}
        >
          {row.approve}
        </span>
      ),
    },
  ];

  return (
    <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="properties-table w-full h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Property"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <FilterData />
              <CustomDateRangePicker />
            </div>
          </div>
        </div>

        <h2 className="text-[16px] font-semibold">Properties List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable className="scrollbar-hide" columns={columns} data={filteredData} pagination />
        </div>
      </div>

    </div>
  );
};

export default Properties;
