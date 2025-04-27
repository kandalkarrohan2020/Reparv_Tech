import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import AddButton from "../components/AddButton";
import FilterData from "../components/FilterData";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../components/Loader";

const SalesPerson = () => {
  const {
    showSalesForm,
    setShowSalesForm,
    URI,
    giveAccess,
    setGiveAccess,
    setLoading,
    showSalesPerson,
    setShowSalesPerson,
  } = useAuth();

  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [salesPersonId, setSalesPersonId] = useState(null);
  const [salesPerson, setSalesPerson] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newSalesPerson, setNewSalesPerson] = useState({
    fullname: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    experience: "",
    rerano: "",
    adharno: "",
    panno: "",
  });

  // Adhar Image Upload
  const [adharImage, setAdharImage] = useState(null);

  const adharImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAdharImage(file);
    }
  };

  const removeAdharImage = () => {
    setAdharImage(null);
  };

  // Pan Image Upload
  const [panImage, setPanImage] = useState(null);

  const panImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPanImage(file);
    }
  };

  const removePanImage = () => {
    setPanImage(null);
  };

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/salespersons", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch salespersons.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const add = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(newSalesPerson).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (adharImage) formData.append("adharImage", adharImage);
    if (panImage) formData.append("panImage", panImage);

    const endpoint = newSalesPerson.salespersonsid
      ? `edit/${newSalesPerson.salespersonsid}`
      : "add";

    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/salespersons/${endpoint}`, {
        method: newSalesPerson.salespersonsid ? "PUT" : "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status === 409) {
        alert("Sales Person already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        alert(
          newSalesPerson.salespersonsid
            ? "Sales Person updated successfully!"
            : "Sales Person added successfully!"
        );

        setNewSalesPerson({
          fullname: "",
          contact: "",
          email: "",
          address: "",
          city: "",
          experience: "",
          rerano: "",
          adharno: "",
          panno: "",
        });

        setShowSalesForm(false);
        await fetchData();
      }
    } catch (err) {
      console.error("Error saving Sales Person:", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/salespersons/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Sales Persons.");
      const data = await response.json();
      console.log(data);
      setNewSalesPerson(data);
      setShowSalesForm(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //fetch data on form
  const viewSalesPerson = async (id) => {
    try {
      const response = await fetch(URI + `/admin/salespersons/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Sales Persons.");
      const data = await response.json();
      console.log(data);
      setSalesPerson(data);
      setShowSalesPerson(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Sales Person?"))
      return;

    try {
      const response = await fetch(URI + `/admin/salespersons/delete/${id}`, {
        method: "DELETE",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Sales Person deleted successfully!");
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting Sales Person:", error);
    } finally {
      setLoading(false);
    }
  };

  // change status record
  const status = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to change this Sales person status?"
      )
    )
      return;

    try {
      const response = await fetch(URI + `/admin/salespersons/status/${id}`, {
        method: "PUT",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
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

  // Assign login record
  const assignLogin = async (e) => {
    e.preventDefault();
    if (
      !window.confirm(
        "Are you sure you want to assign login to this Sales Person?"
      )
    )
      return;

    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/salespersons/assignlogin/${salesPersonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // ✅ Ensures cookies are sent
          body: JSON.stringify({ salesPersonId, username, password }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setSalesPersonId(null);
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
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adhar?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { name: "SN", selector: (row, index) => index + 1, width: "50px" },
    {
      name: "Full Name",
      selector: (row) => row.fullname,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "150px",
    },
    { name: "Experience", selector: (row) => row.experience, sortable: true },
    {
      name: "RERA No",
      selector: (row) => row.rerano,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Adhar No",
      selector: (row) => row.adharno,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "PAN No",
      selector: (row) => row.panno,
      sortable: true,
      minWidth: "150px",
    },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    {
      name: "Payment Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.paymentstatus === "Success"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FBE9E9] text-[#FF0000]"
          }`}
        >
          {row.paymentstatus}
        </span>
      ), minWidth: "150px"
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
        case "view":
          viewSalesPerson(id);
          break;
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
          setSalesPersonId(id);
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
            handleActionSelect(action, row.salespersonsid);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View</option>
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
      className={`sales Persons overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className="sales-table w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <p className="block md:hidden text-lg font-semibold">Sales Persons</p>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="ssearch-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Sales Person"
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
            <AddButton label={"Add"} func={setShowSalesForm} />
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Sales Person List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="overflow-scroll scrollbar-hide"
            columns={columns}
            data={filteredData}
            pagination
          />
        </div>
      </div>

      <div
        className={`${
          showSalesForm ? "flex" : "hidden"
        } z-[61] sales-form overflow-scroll scrollbar-hide w-[400px] md:w-[700px] h-[70vh] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Sales Person</h2>
            <IoMdClose
              onClick={() => {
                setShowSalesForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form
            onSubmit={add}
            className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2"
          >
            <input
              type="hidden"
              value={newSalesPerson.salespersonsid || ""}
              onChange={(e) => {
                setNewSalesPerson({
                  ...newSalesPerson,
                  salespersonsid: e.target.value,
                });
              }}
            />
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter Full Name"
                value={newSalesPerson.fullname}
                onChange={(e) => {
                  setNewSalesPerson({
                    ...newSalesPerson,
                    fullname: e.target.value,
                  });
                }}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Contact Number
              </label>
              <input
                type="text"
                required
                placeholder="Enter Contact Number"
                value={newSalesPerson.contact}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    // Allows only up to 10 digits
                    setNewSalesPerson({ ...newSalesPerson, contact: input });
                  }
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter Email"
                value={newSalesPerson.email}
                onChange={(e) => {
                  setNewSalesPerson({
                    ...newSalesPerson,
                    email: e.target.value,
                  });
                }}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Address
              </label>
              <input
                type="text"
                required
                placeholder="Enter Address"
                value={newSalesPerson.address}
                onChange={(e) => {
                  setNewSalesPerson({
                    ...newSalesPerson,
                    address: e.target.value,
                  });
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                City
              </label>
              <input
                type="text"
                required
                placeholder="Enter City"
                value={newSalesPerson.city}
                onChange={(e) => {
                  setNewSalesPerson({
                    ...newSalesPerson,
                    city: e.target.value,
                  });
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Experience
              </label>
              <input
                type="text"
                required
                placeholder="Enter Experience"
                value={newSalesPerson.experience}
                onChange={(e) => {
                  setNewSalesPerson({
                    ...newSalesPerson,
                    experience: e.target.value,
                  });
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                RERA Number
              </label>
              <input
                type="text"
                placeholder="Enter Rera Number"
                value={newSalesPerson.rerano}
                onChange={(e) => {
                  const input = e.target.value.toUpperCase(); // Convert to uppercase
                  if (/^[A-Z0-9]{0,10}$/.test(input)) {
                    setNewSalesPerson({ ...newSalesPerson, rerano: input });
                  }
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Adhar Card Number
              </label>
              <input
                type="text"
                required
                placeholder="Enter Adhar Number"
                value={newSalesPerson.adharno}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,12}$/.test(input)) {
                    // Allows only up to 12 digits
                    setNewSalesPerson({ ...newSalesPerson, adharno: input });
                  }
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Pan Card Number
              </label>
              <input
                type="text"
                required
                placeholder="Enter Pan Number"
                value={newSalesPerson.panno}
                onChange={(e) => {
                  const input = e.target.value.toUpperCase(); // Convert to uppercase
                  if (/^[A-Z0-9]{0,10}$/.test(input)) {
                    setNewSalesPerson({ ...newSalesPerson, panno: input });
                  }
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Adhar Image Upload */}
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Upload AdharCard Image
              </label>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={adharImageChange}
                  className="hidden"
                  id="adharImageUpload"
                />
                <label
                  htmlFor="adharImageUpload"
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

              {/* Preview Section */}
              {adharImage && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(adharImage)}
                    alt="Uploaded preview"
                    className="w-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeAdharImage}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {/* PAN Image Upload */}
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Upload PanCard Image
              </label>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={panImageChange}
                  className="hidden"
                  id="panImageUpload"
                />
                <label
                  htmlFor="panImageUpload"
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

              {/* Preview Section */}
              {panImage && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(panImage)}
                    alt="Uploaded preview"
                    className="w-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removePanImage}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className="flex h-10 mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowSalesForm(false);
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
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>

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
              value={salesPersonId || ""}
              onChange={(e) => {
                setSalesPersonId(e.target.value);
              }}
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
            <div className="flex h-10 mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
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

      {/* Show Sales Person details */}
      <div
        className={`${
          showSalesPerson ? "flex" : "hidden"
        } z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Sales Person Details</h2>
            <IoMdClose
              onClick={() => {
                setShowSalesPerson(false);
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
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.fullname}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Contact
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.contact}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Email
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.email}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                City
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.city}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Address
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.address}
                readOnly
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Adhar No
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.adharno}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Pancard No
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.panno}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                RERA No
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.rerano}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Experience
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.experience}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Payment Status
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.paymentstatus}
                readOnly
              />
            </div>
            <div
              className={`${salesPerson.paymentid === null ? "hidden" : "block"}`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Payment ID
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.paymentid}
                readOnly
              />
            </div>
            <div className={`${salesPerson.amount === null ? "hidden" : "block"}`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Registration Amount
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.amount}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Status
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.status}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Login Status
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesPerson.loginstatus}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Adhaar Image
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}${salesPerson.adharimage}`}
                alt=""
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                PanCard Image
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}${salesPerson.panimage}`}
                alt=""
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SalesPerson;
