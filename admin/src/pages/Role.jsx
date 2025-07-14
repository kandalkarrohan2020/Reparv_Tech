import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import ActionSelect from "../components/ActionSelect";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import EmployeeFilter from "../components/employee/EmployeeFilter";
import DataTable from "react-data-table-component";
import Loader from "../components/Loader";

const Role = () => {
  const { showRoleForm, setShowRoleForm, action, URI, setLoading } = useAuth();
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newRole, setNewRole] = useState({ roleid: "", role: "" });

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/roles", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch roles.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //Add or update record
  const addOrUpdate = async (e) => {
    e.preventDefault();

    const endpoint = newRole.roleid ? `edit/${newRole.roleid}` : "add";
    try {
      setLoading(true);
      const response = await fetch(URI + `/admin/roles/${endpoint}`, {
        method: action === "update" ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole),
      });

      if (!response.ok) throw new Error("Failed to save role.");

      if (newRole.roleid) {
        alert(`Role updated successfully!`);
      } else if (response.status === 202) {
        alert(`Role already Exit!!`);
      } else {
        alert(`Role added successfully!`);
      }

      setNewRole({ role: "" });

      setShowRoleForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving :", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/roles/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch roles.");
      const data = await response.json();
      setNewRole(data);
      setShowRoleForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    try {
      const response = await fetch(URI + `/admin/roles/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Role deleted successfully!");

        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  // change status record
  const status = async (id) => {
    if (!window.confirm("Are you sure you want to change this role status?"))
      return;

    try {
      const response = await fetch(URI + `/admin/roles/status/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    { name: "Name", selector: (row) => row.role, sortable: true },
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
      name: "",
      cell: (row) => (
        <ActionSelect
          statusAction={() => status(row.roleid)}
          editAction={() => edit(row.roleid)} // Dynamic edit route
          deleteAction={() => del(row.roleid)} // Delete function
        />
      ),
    },
  ];
  // const handleMethod = () => {
  //   console.log("add");
  // };

  return (
    <div
      className={`role overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className="role-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
        {/* <p className="block md:hidden text-lg font-semibold">Role</p> */}
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Role"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <AddButton label={"Add"} func={setShowRoleForm} />
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Role List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable columns={columns} data={filteredData} pagination />
        </div>
      </div>

      <div
        className={`${
          showRoleForm ? "flex" : "hidden"
        } z-[61] roleForm overflow-scroll scrollbar-hide w-full fixed bottom-0 md:bottom-auto `}
      >
        <div className="w-full md:w-[500px] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-4 sm:px-6 border border-[#cfcfcf33] rounded-tl-lg rounded-tr-lg md:rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Role</h2>
            <IoMdClose
              onClick={() => {
                setShowRoleForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addOrUpdate}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1">
              <input
                type="hidden"
                value={newRole.roleid || ""}
                onChange={(e) =>
                  setNewRole({ ...newRole, roleid: e.target.value })
                }
              />
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Enter Role
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Role"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newRole.role}
                  onChange={(e) =>
                    setNewRole({ ...newRole, role: e.target.value })
                  }
                />
              </div>
            </div>
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
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                {action}
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Role;
