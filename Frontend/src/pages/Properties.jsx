import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import ActionSelect from "../components/employee/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import { useAuth } from "../store/auth";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";

const Properties = () => {
  const { setShowPropertyForm, showPropertyForm, action } = useAuth();

  const handleMethod = () => {
    console.log("Handle Click");
  };

  const data = [
    {
      name: "Name 1",
      contactNumber: "1234567890",
      budget: "₹50,000",
      city: "City 1",
      decisionTime: "1 Week",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 2",
      contactNumber: "0987654321",
      budget: "₹60,000",
      city: "City 2",
      decisionTime: "2 Weeks",
      status: "Visit Scheduled",
      viewDetails: "",
    },
    {
      name: "Name 3",
      contactNumber: "1122334455",
      budget: "₹70,000",
      city: "City 3",
      decisionTime: "3 Days",
      status: "Token",
      viewDetails: "",
    },
    {
      name: "Name 4",
      contactNumber: "2233445566",
      budget: "₹80,000",
      city: "City 4",
      decisionTime: "1 Month",
      status: "Cancelled",
      viewDetails: "",
    },
    {
      name: "Name 5",
      contactNumber: "3344556677",
      budget: "₹1,00,000",
      city: "City 5",
      decisionTime: "Immediate",
      status: "Ongoing",
      viewDetails: "",
    },
    {
      name: "Name 6",
      contactNumber: "4455667788",
      budget: "₹40,000",
      city: "City 6",
      decisionTime: "2 Days",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 7",
      contactNumber: "5566778899",
      budget: "₹75,000",
      city: "City 7",
      decisionTime: "3 Weeks",
      status: "Visit Rescheduled",
      viewDetails: "",
    },
    {
      name: "Name 8",
      contactNumber: "6677889900",
      budget: "₹85,000",
      city: "City 8",
      decisionTime: "5 Days",
      status: "Token",
      viewDetails: "",
    },
    {
      name: "Name 6",
      contactNumber: "4455667788",
      budget: "₹40,000",
      city: "City 6",
      decisionTime: "2 Days",
      status: "Received",
      viewDetails: "",
    },
    {
      name: "Name 7",
      contactNumber: "5566778899",
      budget: "₹75,000",
      city: "City 7",
      decisionTime: "3 Weeks",
      status: "Visit Rescheduled",
      viewDetails: "",
    },
    {
      name: "Name 8",
      contactNumber: "6677889900",
      budget: "₹85,000",
      city: "City 8",
      decisionTime: "5 Days",
      status: "Token",
      viewDetails: "",
    },
    {
      name: "Name 9",
      contactNumber: "6677889900",
      budget: "₹85,000",
      city: "City 9",
      decisionTime: "5 Days",
      status: "Token",
      viewDetails: "",
    },
    {
      name: "Name 10",
      contactNumber: "6677889900",
      budget: "₹85,000",
      city: "City 10",
      decisionTime: "5 Days",
      status: "Token",
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
    <>
      {!showPropertyForm ? (
        <>
          <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
            <div className="properties-table w-full h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
              <p className="block md:hidden text-lg font-semibold">Properties</p> 
              <div className="searchBarContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
                  <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
                    <CiSearch />
                    <input
                      type="text"
                      placeholder="Search Builder"
                      className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
                    />
                  </div>
                  <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
                    <div className="flex flex-wrap items-center justify-end gap-3 px-2">
                      <FilterData />
                      <CustomDateRangePicker />
                    </div>
                    <AddButton
                      label={"Add Property"}
                      func={setShowPropertyForm}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-scroll scrollbar-hide">
                <table className="properties-table w-[1188px] 2xl:w-full rounded-[16px]">
                  <thead>
                    <tr>
                      {[
                        "Name",
                        "Contact Number",
                        "Budget",
                        "City",
                        "Decision Time",
                        "Status",
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
                          className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                            index % 2 === 0
                              ? "bg-[#0000000A]"
                              : "bg-[#00000003]"
                          }`}
                        >
                          {row.name}
                        </td>
                        <td
                          className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                            index % 2 === 0
                              ? "bg-[#0000000A]"
                              : "bg-[#00000003]"
                          }`}
                        >
                          {row.contactNumber}
                        </td>
                        <td
                          className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                            index % 2 === 0
                              ? "bg-[#0000000A]"
                              : "bg-[#00000003]"
                          }`}
                        >
                          {row.budget}
                        </td>
                        <td
                          className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                            index % 2 === 0
                              ? "bg-[#0000000A]"
                              : "bg-[#00000003]"
                          }`}
                        >
                          {row.city}
                        </td>
                        <td
                          className={`w-[155px] h-13 p-[15px] text-sm font-normal text-black ${
                            index % 2 === 0
                              ? "bg-[#0000000A]"
                              : "bg-[#00000003]"
                          }`}
                        >
                          {row.decisionTime}
                        </td>
                        <td
                          className={`w-[155px] h-13 p-[12px] text-sm font-normal text-black ${
                            index % 2 === 0
                              ? "bg-[#0000000A]"
                              : "bg-[#00000003]"
                          }`}
                        >
                          <p
                            className={`text-center rounded-3xl p-1 ${
                              row.status === "Received"
                                ? "bg-[#EAFBF1] text-[#0BB501]"
                                : row.status === "Visit Scheduled"
                                ? "bg-[#E9F2FF] text-[#0068FF]"
                                : row.status === "Token"
                                ? "bg-[#FFF8DD] text-[#FFCA00]"
                                : row.status === "Cancelled"
                                ? "bg-[#FFEAEA] text-[#ff2323]"
                                : row.status === "Ongoing"
                                ? "bg-[#F4F0FB] text-[#5D00FF]"
                                : "bg-[#E8E9EA] text-[#7E7E7E]"
                            }`}
                          >
                            {row.status}
                          </p>
                        </td>
                        <td
                          className={`w-[155px] h-13 p-[8px] text-sm font-normal text-black ${
                            index % 2 === 0
                              ? "bg-[#0000000A]"
                              : "bg-[#00000003]"
                          }`}
                        >
                          <ActionSelect />
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

            {/* Paging Component */}
            <Paging
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="property-form overflow-scroll scrollbar-hide w-[400px] h-[600px] md:w-[700px] md:h-[650px] flex fixed">
          <div className="w-[330px] sm:w-[600px] sm:h-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[650px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold">Property</h2>
              <IoMdClose
                onClick={() => {
                    setShowPropertyForm(false);
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <form className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Property Price
                </label>
                <input
                  type="text"
                  placeholder="Enter Property Price"
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
                  Property Type
                </label>
                <input
                  type="text"
                  placeholder="Enter Type"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Property Area
                </label>
                <input
                  type="text"
                  placeholder="Enter Area In Sq.Ft"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Property Picture
                </label>
                <div className="w-full mt-2">
                  <input type="file" className="hidden" id="rera-documents" />
                  <label
                    htmlFor="rera-documents"
                    className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                  >
                    <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                      Upload Image
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
                  setShowPropertyForm(false);
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
    </>
  );
};

export default Properties;
