import React, { useEffect } from "react";
import { parse } from "date-fns";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import { useAuth } from "../store/auth";
import TicketingFilter from "../components/ticketing/TicketingFilter";
import AddButton from "../components/AddButton";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Loader from "../components/Loader";
import { RiArrowDropDownLine } from "react-icons/ri";
import DownloadCSV from "../components/DownloadCSV";

const Ticketing = () => {
  const {
    showTicketForm,
    setShowTicketForm,
    showTicket,
    setShowTicket,
    action,
    setLoading,
    showResponseForm,
    setShowResponseForm,
    URI,
  } = useAuth();

  const [data, setData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [ticket, setTicket] = useState({});
  const [selectedTicketFilter, setSelectedTicketFilter] = useState("");
  const [newTicket, setNewTicketData] = useState({
    adminid: "",
    departmentid: "",
    employeeid: "",
    issue: "",
    details: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenerator, setSelectedGenerator] = useState(
    "Select Ticket Generator"
  );
  const [selectedStatus, setSelectedStatus] = useState("");
  const [ticketResponse, setTicketResponse] = useState("");
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    fetchData();
    fetchAdminData();
    fetchDepartmentData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedGenerator]);

  useEffect(() => {
    if (newTicket.adminid !== "") {
      setNewTicketData((prev) => ({
        ...prev,
        departmentid: "",
        employeeid: "",
      }));
    }
  }, [newTicket.adminid]);

  useEffect(() => {
    if (newTicket.departmentid) {
      fetchEmployeeData(newTicket.departmentid);
    }
  }, [newTicket.departmentid]);

  // *Fetch Data from API*
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${URI}/admin/tickets/get/${selectedGenerator}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch tickets.");

      const data = await response.json();
      setData(data);
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  };

  //Fetch department data
  const fetchAdminData = async () => {
    try {
      const response = await fetch(URI + "/admin/tickets/admins", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Admins.");
      const data = await response.json();
      setAdminData(data);
    } catch (err) {
      console.error("Error fetching Admins:", err);
    }
  };

  //Fetch department data
  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(URI + "/admin/tickets/departments", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch departments.");
      const data = await response.json();
      setDepartmentData(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  //Fetch department data
  const fetchEmployeeData = async (id) => {
    try {
      const response = await fetch(URI + "/admin/tickets/employees/" + id, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch departments.");
      const data = await response.json();
      setEmployeeData(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const addTicket = async (e) => {
    e.preventDefault();

    const endpoint = newTicket.ticketid ? `edit/${newTicket.ticketid}` : "add";
    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/tickets/${endpoint}`, {
        method: newTicket.ticketid ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTicket),
      });

      if (response.status === 409) {
        alert("Ticket already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save ticket. Status: ${response.status}`);
      } else {
        alert(
          newTicket.ticketid
            ? "Ticket updated successfully!"
            : "Ticket added successfully!"
        );
      }

      // Clear form only after successful fetch
      setNewTicketData({
        adminid: "",
        departmentid: "",
        employeeid: "",
        issue: "",
        details: "",
      });

      setShowTicketForm(false);

      await fetchData();
    } catch (err) {
      console.error("Error saving employee:", err);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, label) => {
    try {
      const response = await fetch(`${URI}/admin/tickets/status/change/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: label }),
      });

      if (!response.ok) throw new Error("Failed to Update Status.");

      const data = await response.json(); // Fetch response data

      if (data.updated && data.status === label) {
        // Check if update happened
        alert("Status Changed Successfully to " + label);
      } else {
        console.log("No status change detected.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      fetchData();
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(`${URI}/admin/tickets/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch ticket.");
      const data = await response.json();
      setNewTicketData(data);
      setTicketResponse(data.response ? data.response : "");
      setShowTicketForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const viewTicket = async (id) => {
    try {
      const response = await fetch(`${URI}/admin/tickets/${id}`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Ticket.");
      const data = await response.json();
      setTicket(data);
      setShowTicket(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const fetchResponse = async (id) => {
    try {
      const response = await fetch(`${URI}/admin/tickets/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch ticket.");
      const data = await response.json();
      setNewTicketData(data);
      setTicketResponse(data.response ? data.response : "");
      setSelectedStatus(data.status);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Add Response

  const addResponse = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${URI}/admin/tickets/response/add/${ticketId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketResponse, selectedStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update ticket response.");
      await fetchData();
      setSelectedStatus("");
      setTicketResponse("");
      alert("Response added successfully");
      setShowResponseForm(false);
    } catch (err) {
      console.error("Error updating ticket response:", err);
      alert("Failed to add response");
    } finally {
      setLoading(false);
    }
  };

  // Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const response = await fetch(URI + `/admin/tickets/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Ticket deleted successfully!");
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting :", error);
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

  const filteredData = data.filter((item) => {
    const search = searchTerm.toLowerCase();
    const statusFilter = selectedTicketFilter.toLowerCase();
    // Status filter
    const matchesStatus = item.status?.toLowerCase().includes(statusFilter);

    // Search term filter
    const matchesSearch =
      item.ticketno?.toLowerCase().includes(search) ||
      item.status?.toLowerCase().includes(search) ||
      item.issue?.toLowerCase().includes(search) ||
      item.admin_name?.toLowerCase().includes(search) ||
      item.department?.toLowerCase().includes(search) ||
      item.employee_name?.toLowerCase().includes(search);

    // Date range filter
    let startDate = range[0].startDate;
    let endDate = range[0].endDate;

    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate) endDate = new Date(endDate.setHours(23, 59, 59, 999));

    // Parse item.created_at (format: "26 Apr 2025 | 06:28 PM")
    const itemDate = parse(
      item.created_at,
      "dd MMM yyyy | hh:mm a",
      new Date()
    );

    const matchesDate =
      (!startDate && !endDate) || // no range selected
      (startDate && endDate && itemDate >= startDate && itemDate <= endDate);

    return matchesStatus && matchesSearch && matchesDate;
  });

  const baseColumns = [
    {
      name: "SN",
      cell: (row, index) => (
        <span
          className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md ${
            row.status === "Resolved"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.status === "Open"
              ? "bg-[#E9F2FF] text-[#0068FF]"
              : row.status === "In Progress"
              ? "bg-[#fff8e3] text-[#ffbc21]"
              : row.status === "Pending"
              ? "bg-[#FFEAEA] text-[#ff2323]"
              : "text-[#000000]"
          }`}
        >
          {index + 1}
        </span>
      ),
      sortable: false,
      width: "80px",
    },
    {
      name: "Ticket No",
      cell: (row, index) => (
        <span
          onClick={() => {
            viewTicket(row.ticketid);
          }}
          className={`px-2 py-1 rounded-md cursor-pointer ${
            row.status === "Resolved"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.status === "Open"
              ? "bg-[#E9F2FF] text-[#0068FF]"
              : row.status === "In Progress"
              ? "bg-[#fff8e3] text-[#ffbc21]"
              : row.status === "Pending"
              ? "bg-[#FFEAEA] text-[#ff2323]"
              : "text-[#000000]"
          }`}
        >
          {row.ticketno}
        </span>
      ),
      sortable: false,
      width: "120px",
    },
    {
      name: "Status",
      cell: (row) => <StatusDropdown row={row} />,
      width: "130px",
    },
    { name: "Date & Time", selector: (row) => row.created_at, width: "200px" },

    { name: "Issue", selector: (row) => row.issue, width: "160px" },
    {
      name: "Description",
      selector: (row) => row.details,
      minWidth: "300px",
      maxWidth: "350px",
    },
    {
      name: "Ticket Response",
      selector: (row) => row.response || "--NON--",
      width: "180px",
    },
    {
      name: "Admin",
      selector: (row) => row.admin_name || "--NON--",
      width: "130px",
      omit: false,
    },
    {
      name: "Department",
      selector: (row) => row.department || "--NON--",
      width: "130px",
    },
    {
      name: "Employee",
      selector: (row) => row.employee_name || "--NON--",
      width: "180px",
    },
    {
      name: "Ticket Generator",
      cell: (row) => (
        <div className="w-full flex flex-col gap-[2px]">
          <p>{row.ticketadder_name}</p>
          <p>{row.ticketadder_contact}</p>
        </div>
      ),
      omit: false,
      width: "180px",
    },

    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} />,
      width: "120px",
    },
  ];

  const hasAdmin = data.some((row) => !!row.admin_name);
  const hasTicketGenerator = data.some((row) => !!row.ticketadder_name);

  const finalColumns = baseColumns.map((col) => {
    if (col.name === "Ticket Generator")
      return { ...col, omit: !hasTicketGenerator };
    if (col.name === "Admin") return { ...col, omit: !hasAdmin };
    return col;
  });

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "view":
          viewTicket(id);
          break;
        case "update":
          edit(id);
          break;
        case "addResponse":
          setTicketId(id);
          fetchResponse(id);
          setShowResponseForm(true);
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
            handleActionSelect(action, row.ticketid);
          }}
        >
          <option value="" disabled>
            Action
          </option>
          <option value="view">View</option>
          <option value="update">Update</option>
          <option value="addResponse">Add Response</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  const StatusDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "Open":
          changeStatus(id, "Open");
          break;
        case "Resolved":
          changeStatus(id, "Resolved");
          break;
        case "Pending":
          changeStatus(id, "Pending");
          break;
        case "In Progress":
          changeStatus(id, "In Progress");
          break;
        default:
          console.log("Invalid action");
      }
    };

    return (
      <div className="relative inline-block ">
        <span
          className={`px-2 py-1 rounded-md ${
            row.status === "Resolved"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.status === "Open"
              ? "bg-[#E9F2FF] text-[#0068FF]"
              : row.status === "In Progress"
              ? "bg-[#fff8e3] text-[#ffbc21]"
              : row.status === "Pending"
              ? "bg-[#FFEAEA] text-[#ff2323]"
              : "text-[#000000]"
          }`}
        >
          {row.status}
        </span>
        <select
          className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer`}
          value={selectedAction}
          onChange={(e) => {
            const action = e.target.value;
            handleActionSelect(action, row.ticketid);
          }}
        >
          <option value="" disabled>
            Change Status
          </option>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>
    );
  };

  return (
    <div className="ticketing overflow-scroll w-full h-screen flex flex-col items-start justify-start">
      <div className="ticket-table w-full h-[80vh] flex flex-col p-4 md:p-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
        {/* <p className="block md:hidden text-lg font-semibold">Tickets</p> */}
        <div className="w-full flex items-center justify-between gap-1 sm:gap-3">
          <div className="w-[65%] sm:min-w-[220px] sm:max-w-[230px] relative inline-block">
            <div className="flex gap-1 sm:gap-2 items-center justify-between bg-white border border-[#00000033] text-sm font-semibold  text-black rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#076300]">
              <span>{selectedGenerator || "Select Ticket Generator"}</span>
              <RiArrowDropDownLine className="w-6 h-6 text-[#000000B2]" />
            </div>
            <select
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              value={selectedGenerator}
              onChange={(e) => {
                const action = e.target.value;
                setSelectedGenerator(action);
              }}
            >
              <option value="Select Ticket Generator">
                Select Ticket Generator
              </option>
              <option value="Admin">Admin</option>
              <option value="Sales Person">Sales Person</option>
              <option value="Onboarding Partner">Onboarding Partner</option>
              <option value="Territory Partner">Territory Partner</option>
              <option value="Project Partner">Project Partner</option>
            </select>
          </div>
          <div className="flex xl:hidden flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
            <DownloadCSV data={filteredData} filename={"Ticket.csv"} />
            <AddButton label={"Add"} func={setShowTicketForm} />
          </div>
        </div>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Ticket"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <TicketingFilter
                selectedFilter={selectedTicketFilter}
                setSelectedFilter={setSelectedTicketFilter}
              />
              <div className="block">
                <CustomDateRangePicker range={range} setRange={setRange} />
              </div>
            </div>
            <div className="hidden xl:flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
              <DownloadCSV data={filteredData} filename={"Ticket.csv"} />
              <AddButton label={"Add"} func={setShowTicketForm} />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <h2 className="text-[16px] font-semibold">Tickets List</h2>
          <Loader className="w-4"></Loader>
        </div>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            columns={finalColumns}
            data={filteredData}
            pagination
          />
        </div>
      </div>

      <div
        className={`${
          showTicketForm ? "flex" : "hidden"
        } z-[61] ticketForm overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Ticket Details</h2>
            <IoMdClose
              onClick={() => {
                setShowTicketForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addTicket} className="w-full">
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2">
              <input
                type="hidden"
                value={newTicket.ticketid || ""}
                onChange={(e) =>
                  setNewTicketData({ ...newTicket, ticketid: e.target.value })
                }
              />

              <div className="w-full">
                <label
                  htmlFor="city"
                  className="block text-sm leading-4 text-[#00000066] font-medium"
                >
                  Select Issue
                </label>
                <select
                  name="issue"
                  id="issue"
                  value={newTicket.issue}
                  onChange={(e) =>
                    setNewTicketData({ ...newTicket, issue: e.target.value })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  required
                >
                  <option value=""> Select Issue </option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Commission Issue">Commission Issue</option>
                  <option value="Lead Issue">Lead Issue</option>
                </select>
              </div>

              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Select Admin
                </label>
                <select
                  required
                  disabled={true}
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  style={{ backgroundImage: "none" }}
                  value={newTicket.adminid}
                  onChange={(e) =>
                    setNewTicketData({
                      ...newTicket,
                      adminid: e.target.value,
                    })
                  }
                >
                  <option value="">Select Admin</option>
                  {adminData?.map((admin, index) => (
                    <option key={index} value={admin.id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`w-full`}>
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Department
                </label>
                <select
                  required
                  disabled={false}
                  className={`w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent`}
                  style={{ backgroundImage: "none" }}
                  value={newTicket.departmentid}
                  onChange={(e) =>
                    setNewTicketData({
                      ...newTicket,
                      departmentid: e.target.value,
                    })
                  }
                >
                  <option value="">Select Department</option>
                  {departmentData?.map((department, index) => (
                    <option key={index} value={department.departmentid}>
                      {department.department}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`w-full`}>
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Employee
                </label>
                <select
                  disabled={newTicket.departmentid === "" ? true : false}
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  style={{ backgroundImage: "none" }}
                  value={newTicket.employeeid}
                  onChange={(e) =>
                    setNewTicketData({
                      ...newTicket,
                      employeeid: e.target.value,
                    })
                  }
                >
                  <option value="">Select Employee</option>
                  {employeeData?.map((employee, index) => (
                    <option key={index} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={` w-full mt-3`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Ticket Description
              </label>
              <textarea
                rows={2}
                cols={40}
                placeholder="Enter Details"
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newTicket.details}
                onChange={(e) =>
                  setNewTicketData({
                    ...newTicket,
                    details: e.target.value,
                  })
                }
              />
            </div>

            <div className="w-full flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowTicketForm(false);
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Save
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      {/* Add Response Form */}
      <div
        className={`${
          showResponseForm ? "flex" : "hidden"
        } z-[61] ticketForm overflow-scroll scrollbar-hide w-[400px] min-h-[300px] max-h-[400px] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Ticket Response</h2>
            <IoMdClose
              onClick={() => {
                setShowResponseForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addResponse} className="w-full ">
            <input
              type="hidden"
              value={newTicket.ticketid || ""}
              onChange={(e) =>
                setNewTicketData({ ...newTicket, ticketid: e.target.value })
              }
            />
            <div className={` w-full mt-3`}>
              <textarea
                rows={2}
                cols={40}
                placeholder="Enter Ticket Response"
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticketResponse}
                onChange={(e) => setTicketResponse(e.target.value)}
              />
            </div>

            <div className="selectTicketStatus min-w-[250px] max-w-[280px] relative inline-block mt-2">
              <div
                className={`${
                  selectedStatus === "Resolved"
                    ? "bg-[#EAFBF1] text-[#0BB501]"
                    : selectedStatus === "Open"
                    ? "bg-[#E9F2FF] text-[#0068FF]"
                    : selectedStatus === "In Progress"
                    ? "bg-[#FFF8DD] text-[#FFCA00]"
                    : selectedStatus === "Pending"
                    ? "bg-[#FFEAEA] text-[#ff2323]"
                    : "text-[#000000]"
                } flex gap-2 items-center justify-between bg-white border border-[#00000033] text-base font-semibold rounded-lg py-3 px-5 focus:outline-none focus:ring-2 focus:ring-[#076300]`}
              >
                <span>{selectedStatus || "Select Ticket Status"}</span>
                <RiArrowDropDownLine className="w-7 h-7 text-[#000000B2]" />
              </div>
              <select
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                value={selectedStatus}
                onChange={(e) => {
                  const action = e.target.value;
                  setSelectedStatus(action);
                }}
              >
                <option disabled value="">
                  Select Ticket Status
                </option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div className="w-full flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowResponseForm(false);
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Save
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      {/* Show Ticket Info */}
      <div
        className={`${
          showTicket ? "flex" : "hidden"
        } z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Ticket Details</h2>
            <IoMdClose
              onClick={() => {
                setShowTicket(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>

          <form className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Ticket No
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticket.ticketno}
                readOnly
              />
            </div>
            <div className={`${ticket.adminid ? "block" : "hidden"} w-full`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Admin
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticket.admin_name}
                readOnly
              />
            </div>
            <div
              className={`${ticket.departmentid ? "block" : "hidden"} w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Department
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticket.department}
                readOnly
              />
            </div>
            <div className={`${ticket.employeeid ? "block" : "hidden"} w-full`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Employee
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticket.employee_name}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Issue
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={ticket.issue}
                readOnly
              />
            </div>
          </form>
          <div className="w-full mt-3">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Description
            </label>
            <textarea
              rows={4}
              disabled
              readOnly
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-[#f9f9f9]"
              value={ticket.details}
            />
          </div>
          <div
            className={`${ticket.response ? "block" : "hidden"} w-full mt-3`}
          >
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Response
            </label>
            <input
              type="text"
              disabled
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ticket.response}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticketing;
