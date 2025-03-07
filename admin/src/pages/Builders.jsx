import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import FilterData from "../components/FilterData";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";

const Builders = () => {
  const {
    showBuilderForm,
    setShowBuilderForm,
    action,
    giveAccess,
    setGiveAccess,
    URI,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuilderId, setSelectedBuilderId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBuilder, setBuilderData] = useState({
    builderid: "",
    company_name: "",
    contact_person: "",
    contact: "",
    email: "",
    office_address: "",
    dor: "",
    website: "",
    notes: "",
  });
  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/builders", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch builders.");
      const data = await response.json();

      setDatas(data);
    } catch (err) {
      console.error("Error fetching builders:", err);
    }
  };

  //Add or update record
  const add2 = async (e) => {
    e.preventDefault();

    const endpoint = newBuilder.builderid
      ? `edit/${newBuilder.builderid}`
      : "add";
    try {
      const response = await fetch(URI + `/admin/builders/${endpoint}`, {
        method: action === "Add" ? "POST" : "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBuilder),
      });

      if (!response.ok) throw new Error("Failed to save builders.");

      if (newBuilder.builderid) {
        alert("Builder updated successfully!");
      } else if (response.status === 202) {
        alert("Builder already Exit!!");
      } else {
        alert("Builder added successfully!");
      }

      setBuilderData({
        company_name: "",
        contact_person: "",
        contact: "",
        email: "",
        office_address: "",
        registration_no: "",
        dor: "",
        website: "",
        notes: "",
      });
      setShowBuilderForm(false);
      fetchData();
    } catch (err) {
      console.error("Error saving Builder:", err);
    }
  };

  const add = async (e) => {
    e.preventDefault();
  
    const endpoint = newBuilder.builderid ? `edit/${newBuilder.builderid}` : "add";
  
    try {
      const response = await fetch(`${URI}/admin/builders/${endpoint}`, {
        method: newBuilder.builderid ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBuilder),
      });
  
      if (response.status === 409) {
        alert("Builder already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save builder. Status: ${response.status}`);
      } else {
        alert(newBuilder.builderid ? "Builder updated successfully!" : "Builder added successfully!");
      }
  
      // Clear form only after successful fetch
      setBuilderData({
        company_name: "",
        contact_person: "",
        contact: "",
        email: "",
        office_address: "",
        registration_no: "",
        dor: "",
        website: "",
        notes: "",
      });
  
      setShowBuilderForm(false);
  
      await fetchData(); // Ensure latest data is fetched
  
    } catch (err) {
      console.error("Error saving builder:", err);
    }
  };

  //fetch data on form
  const edit = async (builderid) => {
    try {
      const response = await fetch(URI + `/admin/builders/${builderid}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch builders.");
      const data = await response.json();
      setBuilderData(data);
      setShowBuilderForm(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //Delete record
  const del = async (builderid) => {
    if (!window.confirm("Are you sure you want to delete this builder?"))
      return;

    try {
      const response = await fetch(
        URI + `/admin/builders/delete/${builderid}`,
        {
          method: "DELETE",
          credentials: "include", // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Builder deleted successfully!");
        // Refresh Builder list
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting Builder:", error);
    }
  };

  // change status record
  const status = async (builderid) => {
    if (!window.confirm("Are you sure you want to change this builder status?"))
      return;

    try {
      const response = await fetch(
        URI + `/admin/builders/status/${builderid}`,
        {
          method: "PUT",
          credentials: "include", // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  // Assign login record
  const assignLogin = async (e) => {
    e.preventDefault();
    if (
      !window.confirm("Are you sure you want to assign login to this builder?")
    )
      return;

    try {
      const response = await fetch(
        URI + `/admin/builders/assignlogin/${selectedBuilderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Ensures cookies are sent
          body: JSON.stringify({ selectedBuilderId, username, password }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setSelectedBuilderId(null);
      setUsername("");
      setPassword("");
      setGiveAccess(false);
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
      item.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.office_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.registration_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    {
      name: "Company Name",
      selector: (row) => row.company_name,
      sortable: true,
    },
    { name: "Contact Person", selector: (row) => row.contact_person },
    { name: "Contact", selector: (row) => row.contact },
    { name: "Email", selector: (row) => row.email },
    { name: "Office address", selector: (row) => row.office_address },
    { name: "Registration No", selector: (row) => row.registration_no },
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
      name: "Login Status",
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
      cell: (row) => <ActionDropdown row={row} onAction={handleActionSelect} />,
    },
  ];

  const ActionDropdown = ({ row, onAction }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleAction = (action) => {
      setIsOpen(false);
      onAction(action, row.builderid);
    };

    return (
      <div className="relative inline-block w-[120px]">
        <div
          className="flex items-center justify-between p-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[12px]">Action</span>
          <FiMoreVertical className="text-gray-500" />
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="py-1">
              <button
                className="block w-full px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                onClick={() => handleAction("status")}
              >
                Status
              </button>

              <button
                className="block w-full px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                onClick={() => handleAction("update")}
              >
                Update
              </button>
              <button
                className="block w-full px-2 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                onClick={() => handleAction("assignlogin")}
              >
                Assign Login
              </button>
              <button
                className="block w-full px-2 py-2 text-sm text-left hover:bg-gray-100 text-red-600"
                onClick={() => handleAction("delete")}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleActionSelect = (action, builderid) => {
    switch (action) {
      case "status":
        status(builderid);
        break;
      case "update":
        edit(builderid);
        break;
      case "delete":
        del(builderid);
        break;
      case "assignlogin":
        setSelectedBuilderId(builderid);
        setGiveAccess(true);
        break;
      default:
        console.log("Invalid action");
    }
  };

  return (
    <div
      className={`builders overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      {!showBuilderForm ? (
        <>
          <div className="builder-table w-full h-[550px] sm:h-[578px] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
            <p className="block md:hidden text-lg font-semibold">Builders</p>
            <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
              <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
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
                  <FilterData />
                  <CustomDateRangePicker />
                </div>
                <AddButton label={"Add"} func={setShowBuilderForm} />
              </div>
            </div>
            <h2 className="text-[16px] font-semibold">Builders List</h2>
            <div className="overflow-scroll scrollbar-hide">
              <DataTable columns={columns} data={filteredData} pagination />
            </div>
          </div>
        </>
      ) : (
        <div className="z-[61] builder-form overflow-scroll scrollbar-hide w-[400px] h-[600px] md:w-[700px] md:h-[650px] flex fixed">
          <div className="w-[330px] sm:w-[600px] sm:h-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[650px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold">Builders</h2>
              <IoMdClose
                onClick={() => {
                  setShowBuilderForm(false);
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <form
              onSubmit={add}
              className="grid gap-4 grid-cols-1 lg:grid-cols-2"
            >
              <input
                type="hidden"
                value={newBuilder.builderid || ""}
                onChange={(e) =>
                  setBuilderData({ ...newBuilder, builderid: e.target.value })
                }
              />
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Project Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.company_name}
                  onChange={(e) =>
                    setBuilderData({
                      ...newBuilder,
                      company_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Contact Person
                </label>
                <input
                  type="text"
                  placeholder="Enter Owner Name"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.contact_person}
                  onChange={(e) =>
                    setBuilderData({
                      ...newBuilder,
                      contact_person: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Contact Number
                </label>
                <input
                  type="number"
                  placeholder="Enter Address"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.contact}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      // Allows only up to 12 digits
                      setBuilderData({ ...newBuilder, contact: input });
                    }
                  }}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.email}
                  onChange={(e) =>
                    setBuilderData({ ...newBuilder, email: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Office Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Office Address"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.office_address}
                  onChange={(e) =>
                    setBuilderData({
                      ...newBuilder,
                      office_address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Registration No.
                </label>
                <input
                  type="text"
                  placeholder="Enter Registration No."
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.registration_no}
                  onChange={(e) =>
                    setBuilderData({
                      ...newBuilder,
                      registration_no: e.target.value,
                    })
                  }
                />
              </div>

              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Date Of Registration
                </label>
                <input
                  type="date"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.dor}
                  onChange={(e) => {
                    const selectedDate = e.target.value; // Get full date
                    const formattedDate = selectedDate.split("T")[0]; // Extract only YYYY-MM-DD
                    setBuilderData({ ...newBuilder, dor: formattedDate });
                  }}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Website
                </label>
                <input
                  type="text"
                  placeholder="Enter website"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.website}
                  onChange={(e) =>
                    setBuilderData({ ...newBuilder, website: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Notes
                </label>
                <input
                  type="text"
                  placeholder="Enter notes"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newBuilder.notes}
                  onChange={(e) =>
                    setBuilderData({ ...newBuilder, notes: e.target.value })
                  }
                />
              </div>
              <div className="flex mt-8 md:mt-6 justify-end gap-6">
                <button
                  onClick={() => {
                    setShowBuilderForm(false);
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
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Give Access Form */}
      <div
        className={` ${
          !giveAccess && "hidden"
        }  z-[61] overflow-scroll scrollbar-hide flex fixed`}
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
              value={selectedBuilderId || ""}
              onChange={(e) => setSelectedBuilderId(e.target.value)}
            />
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                User Name
              </label>
              <input
                type="text"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Builders;
