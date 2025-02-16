import React from "react";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import ActionSelect from "../components/ActionSelect";
import Paging from "../components/Paging";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import FilterData from "../components/FilterData";
import { IoMdClose } from "react-icons/io";
import EmployeeFilter from "../components/employee/EmployeeFilter";

const Role = () => {
  const { showRoleForm, setShowRoleForm, action, } = useAuth();

  const handleMethod = () => {
    console.log("handle Click");
  }
  const data = [
    {
      sn: "1",
      role: "Developer"
    },
    {
        sn: "2",
        role: "Developer"
      },
      {
        sn: "3",
        role: "Developer"
      },
      {
        sn: "4",
        role: "Developer"
      },
      {
        sn: "5",
        role: "Developer"
      },
      {
        sn: "6",
        role: "Developer"
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
    <div
      className={`role overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      {!showRoleForm ? (
        <>
          <div className="role-table w-full h-[578px] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
            <p className="block md:hidden text-lg font-semibold">Role</p>
            <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
              <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search Role"
                  className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
                />
              </div>
              <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
                <div className="flex flex-wrap items-center justify-end gap-3 px-2">
                  <EmployeeFilter/>
                  <CustomDateRangePicker />
                </div>
                <AddButton
                  label={"Add Role"}
                  func={setShowRoleForm}
                />
              </div>
            </div>
            <div className="overflow-scroll scrollbar-hide">
              <table className="role-table w-[1188px] 2xl:w-full h-[343px] overflow-hidden rounded-[16px]">
                <thead>
                  <tr>
                    {[
                      "SN",
                      "Role",
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
                        {row.sn}
                      </td>
                      <td
                        className={`p-[15px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        {row.role}
                      </td>
                      <td
                        className={`p-[8px] text-sm font-normal text-black ${
                          index % 2 == 0 ? "bg-[#0000000A]" : "bg-[#00000003]"
                        } `}
                      >
                        <ActionSelect func={setShowRoleForm} />
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
        <div className="roleForm overflow-scroll scrollbar-hide w-[400px] h-[600px] md:w-[700px] md:h-[650px] flex fixed">
          <div className="w-[330px] sm:w-[600px] sm:h-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[650px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold">Role</h2>
              <IoMdClose
                onClick={() => {
                  setShowRoleForm(false);
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <form className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2">
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Enter Role
                </label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                onClick={() => {
                  setShowRoleForm(false);
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

export default Role;
