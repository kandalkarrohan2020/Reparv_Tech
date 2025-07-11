import { parse } from "date-fns";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import EmployeeFilter from "../components/employee/EmployeeFilter";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../components/Loader";
import DownloadCSV from "../components/DownloadCSV";
import FormatPrice from "../components/FormatPrice";

const Employee = () => {
  const {
    showEplDetailsForm,
    setShowEplDetailsForm,
    action,
    giveAccess,
    setGiveAccess,
    token,
    URI,
    loading,
    setLoading,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null); // Stores employee ID
  const [newEmployee, setEmployeeData] = useState({
    name: "",
    uid: "",
    contact: "",
    email: "",
    address: "",
    dob: "",
    departmentid: "",
    roleid: "",
    salary: "",
    doj: "",
    status: "",
  });

  // *Fetch Data from API*
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/employees", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch employees.");

      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //Fetch roles data
  const fetchRoleData = async () => {
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
      setRoleData(data); // Store the fetched data
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  //Fetch department data
  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(URI + "/admin/departments", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch departments.");
      const data = await response.json();
      setDepartmentData(data); // Store the fetched data
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const add = async (e) => {
    e.preventDefault();

    const endpoint = newEmployee.id ? `edit/${newEmployee.id}` : "add";

    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/employees/${endpoint}`, {
        method: newEmployee.id ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (response.status === 409) {
        alert("Employee already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save employee. Status: ${response.status}`);
      } else {
        alert(
          newEmployee.id
            ? "Employee updated successfully!"
            : "Employee added successfully!"
        );
      }

      // Clear form only after successful fetch
      setEmployeeData({
        name: "",
        uid: "",
        contact: "",
        email: "",
        address: "",
        dob: "",
        departmentid: "",
        roleid: "",
        salary: "",
        doj: "",
        status: "",
      });

      setShowEplDetailsForm(false);

      await fetchData(); // Ensure latest data is fetched
    } catch (err) {
      console.error("Error saving employee:", err);
    } finally {
      setLoading(false);
    }
  };
  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/employees/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch employee.");
      const data = await response.json();
      setEmployeeData(data);
      setShowEplDetailsForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      const response = await fetch(URI + `/admin/employees/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Employee deleted successfully!");
        // Refresh employee list
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

  // change status record
  const status = async (id) => {
    if (
      !window.confirm("Are you sure you want to change this employee status?")
    )
      return;

    try {
      const response = await fetch(URI + `/admin/employees/status/${id}`, {
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

  // change status record
  const assignLogin = async (e) => {
    e.preventDefault();
    if (
      !window.confirm("Are you sure you want to assign login to this employee?")
    )
      return;

    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/employees/assignlogin/${selectedEmployeeId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedEmployeeId, username, password }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setSelectedEmployeeId(null);
      setUsername("");
      setPassword("");
      setGiveAccess(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRoleData();
    fetchDepartmentData();
  }, []);

  const [range, setRange] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);

  const filteredData = datas.filter((item) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      item.name?.toLowerCase().includes(search) ||
      item.uid?.toLowerCase().includes(search) ||
      item.contact?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.role?.toLowerCase().includes(search) ||
      item.department?.toLowerCase().includes(search);

    // Date filtering
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
    { name: "Date & Time", selector: (row) => row.created_at, width: "200px" },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Adhar No",
      selector: (row) => row.uid,
      sortable: true,
      minWidth: "140px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
      minWidth: "120px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Salary",
      selector: (row) => <FormatPrice price={parseFloat(row.salary)} />,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      minWidth: "130px",
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
      minWidth: "150px",
    },
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
      name: "Assign Login",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.loginstatus === "Active"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FBE9E9] text-[#FF0000]"
          }`}
        >
          {row.loginstatus}
        </span>
      ),
    },
    {
      name: "",
      cell: (row) => <ActionDropdown row={row} />,
    },
  ];

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "status":
          status(id);
          break;
        case "update":
          edit(id);
          break;
        case "delete":
          del(id);
          break;
        case "assignlogin":
          setSelectedEmployeeId(id);
          setGiveAccess(true);
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
          <option value="status">Status</option>
          <option value="update">Update</option>
          <option value="assignlogin">Assign Login</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  return (
    <div
      className={`employee overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      {!showEplDetailsForm ? (
        <>
          <div className="employee-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white md:rounded-[24px]">
            <div className="w-full flex items-center justify-between md:justify-end gap-1 sm:gap-3">
              <p className="block md:hidden text-lg font-semibold">Employees</p>
              <div className="flex xl:hidden flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
                <DownloadCSV data={filteredData} filename={"Employee.csv"} />
                <AddButton label={"Add"} func={setShowEplDetailsForm} />
              </div>
            </div>
            <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
              <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
                <CiSearch />
                <input
                  type="text"
                  placeholder="Search Employee"
                  className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
                <div className="flex flex-wrap items-center justify-end gap-3 px-2">
                  <EmployeeFilter />
                  <div className="block">
                    <CustomDateRangePicker range={range} setRange={setRange} />
                  </div>
                </div>
                <div className="hidden xl:flex flex-wrap items-center justify-end gap-2 sm:gap-3 px-2">
                  <DownloadCSV data={filteredData} filename={"Employee.csv"} />
                  <AddButton label={"Add"} func={setShowEplDetailsForm} />
                </div>
              </div>
            </div>
            
            <h2 className="text-[16px] font-semibold">Employee List</h2>
            <div className="overflow-scroll scrollbar-hide">
              <DataTable
                className="overflow-scroll scrollbar-hide"
                columns={columns}
                data={filteredData}
                pagination
              />
            </div>
          </div>
        </>
      ) : (
        <div className="z-[61] employeeForm overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] flex fixed">
          <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold">Employee Details</h2>
              <IoMdClose
                onClick={() => {
                  setShowEplDetailsForm(false);
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <form
              onSubmit={add}
              className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2"
            >
              <div className="w-full">
                <input
                  type="hidden"
                  value={newEmployee.id || ""}
                  onChange={(e) =>
                    setEmployeeData({ ...newEmployee, id: e.target.value })
                  }
                />

                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Full Name (As per UID)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setEmployeeData({ ...newEmployee, name: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  UID No.
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter UID No"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.uid}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,12}$/.test(input)) {
                      // Allows only up to 12 digits
                      setEmployeeData({ ...newEmployee, uid: input });
                    }
                  }}
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Contact Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Contact Number"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.contact}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      // Allows only up to 12 digits
                      setEmployeeData({ ...newEmployee, contact: input });
                    }
                  }}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter Mail"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setEmployeeData({ ...newEmployee, email: e.target.value })
                  }
                />
              </div>

              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Complete Address"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.address}
                  onChange={(e) =>
                    setEmployeeData({ ...newEmployee, address: e.target.value })
                  }
                />
              </div>

              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.dob?.split("T")[0]}
                  onChange={(e) => {
                    const selectedDate = e.target.value; // Get full date
                    const formattedDate = selectedDate.split("T")[0]; // Extract only YYYY-MM-DD
                    setEmployeeData({ ...newEmployee, dob: formattedDate });
                  }}
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Department
                </label>
                <select
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  style={{ backgroundImage: "none" }}
                  value={newEmployee.departmentid}
                  onChange={(e) =>
                    setEmployeeData({
                      ...newEmployee,
                      departmentid: e.target.value,
                    })
                  }
                >
                  <option value="">Select Department</option>
                  {departmentData.map((department, index) => (
                    <option key={index} value={department.departmentid}>
                      {department.department}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Role
                </label>
                <select
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  style={{ backgroundImage: "none" }}
                  value={newEmployee.roleid}
                  onChange={(e) =>
                    setEmployeeData({ ...newEmployee, roleid: e.target.value })
                  }
                >
                  <option value="user1">Select Role</option>
                  {roleData.map((role, index) => (
                    <option key={index} value={role.roleid}>
                      {role.role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Salary
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Salary"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.salary}
                  onChange={(e) =>
                    setEmployeeData({ ...newEmployee, salary: e.target.value })
                  }
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Date of Joining
                </label>
                <input
                  type="date"
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newEmployee.doj?.split("T")[0]}
                  onChange={(e) => {
                    const selectedDate = e.target.value; // Get full date
                    const formattedDate = selectedDate.split("T")[0]; // Extract only YYYY-MM-DD
                    setEmployeeData({ ...newEmployee, doj: formattedDate });
                  }}
                />
              </div>

              <div className="flex mt-8 md:mt-6 justify-end gap-6">
                <button
                  onClick={() => {
                    setShowEplDetailsForm(false);
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
      )}
      {/* Give Access Form */}
      <div
        className={` ${
          !giveAccess && "hidden"
        } z-[61] overflow-scroll scrollbar-hide flex fixed`}
      >
        <div className="w-[330px] h-[450px] sm:w-[600px] sm:h-[400px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[300px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Give Access</h2>
            <IoMdClose
              onClick={() => {
                setGiveAccess(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form
            onSubmit={assignLogin}
            className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2"
          >
            <input
              type="hidden"
              value={selectedEmployeeId || ""}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            />
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                User Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter UserName"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter Password"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                onClick={() => {
                  setGiveAccess(false);
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Give Access
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Employee;
