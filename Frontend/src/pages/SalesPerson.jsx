import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import ActionSelect from "../components/employee/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import FilterData from "../components/FilterData";
import { IoMdClose } from "react-icons/io";

const SalesPerson = () => {
  const { showSalesForm, setShowSalesForm, action } = useAuth();
  const handleMethod = () => {
    console.log("Handle Click");
  };
  const data = [
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
    },
    {
      name: "Name 1",
      employeeId: "A:MO28",
      contactNumber: "1234567890",
      mail: "abc@gmail.com",
      city: "Nagpur",
      viewDetails: "",
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
    <div className={`builders`}>
      {!showSalesForm ? (
        <>
          <div className="sales-table w-full h-[550px] sm:h-[578px] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
            <p className="block md:hidden text-lg font-semibold">Sales Persons</p>
            <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
              <div className="ssearch-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search Sales Person"
                  className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
                />
              </div>
              <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
                <div className="flex flex-wrap items-center justify-end gap-3 px-2">
                  <FilterData/>
                  <CustomDateRangePicker />
                </div>
                <AddButton label={"Add Sales Person"} func={setShowSalesForm} />
              </div>
            </div>

            <div className="overflow-scroll scrollbar-hide">
              <table className="sales-table w-[1188px] 2xl:w-full h-[343px] rounded-[16px]">
                <thead>
                  <tr>
                    {[
                      "Name",
                      "Employee Id",
                      "Contact Number",
                      "Mail",
                      "City",
                      "Actions",
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
                      <td
                        style={{ width: "155px", height: "52px" }}
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.name}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.employeeId}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.contactNumber}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.mail}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.city}
                      </td>
                      <td
                        className={`p-[8px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        <ActionSelect func={setShowSalesForm} />
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
        </>
      ) : (
        <div className="sales-form overflow-scroll scrollbar-hide w-[400px] h-[600px] md:w-[700px] md:h-[650px] flex fixed">
              <div className="w-[330px] sm:w-[600px] sm:h-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[650px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px] font-semibold">Sales Person</h2>
                  <IoMdClose
                    onClick={() => {
                      setShowSalesForm(false);
                    }}
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <form className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
                  <div className="w-full ">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Contact Number"
                      className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Address"
                      className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Experience
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Experience"
                      className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Adhar Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Adhar Number"
                      className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Adhar Card
                    </label>
                    <div className="w-full mt-2">
                      <input type="file" className="hidden" id="rera-documents" />
                      <label
                        htmlFor="rera-documents"
                        className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                      >
                        <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                          Upload Document
                        </span>
                        <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                          Browse
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Pan Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Pan Number"
                      className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      Pan Card
                    </label>
                    <div className="w-full mt-2">
                      <input type="file" className="hidden" id="rera-documents" />
                      <label
                        htmlFor="rera-documents"
                        className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                      >
                        <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                          Upload Document
                        </span>
                        <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                          Browse
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm leading-4 text-[#00000066] font-medium">
                      RERA Document
                    </label>
                    <div className="w-full mt-2">
                      <input type="file" className="hidden" id="sanctioned-documents" />
                      <label
                        htmlFor="sanctioned-documents"
                        className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                      >
                        <span className="m-3 px-2 text-[16px] font-medium text-[#00000066]">
                          Upload Document
                        </span>
                        <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                          Browse
                        </div>
                      </label>
                    </div>
                  </div>
                </form>
                <div className="flex mt-8 md:mt-6 justify-end gap-6">
                  <button
                    onClick={() => {
                      setShowSalesForm(false);
                    }}
                    className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleMethod}
                    className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
                  >
                    {action}
                  </button>
                </div>
              </div>
            </div>
      )}
    </div>
  );
};

export default SalesPerson;
