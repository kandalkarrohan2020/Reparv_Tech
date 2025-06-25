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
import PartnerFilter from "../components/PartnerFilter";
import { RxCross2 } from "react-icons/rx";
import { MdDone } from "react-icons/md";

const ProjectPartner = () => {
  const {
    showPartnerForm,
    setShowPartnerForm,
    URI,
    setLoading,
    giveAccess,
    setGiveAccess,
    showPaymentIdForm,
    setShowPaymentIdForm,
    showPartner,
    setShowPartner,
    showFollowUpList,
    setShowFollowUpList,
    partnerPaymentStatus,
    setPartnerPaymentStatus,
  } = useAuth();

  const [datas, setDatas] = useState([]);
  const [paymentStatusCounts, setPaymentStatusCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [partnerId, setPartnerId] = useState(null);
  const [partner, setPartner] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [newPartner, setNewPartner] = useState({
    fullname: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    intrest: "",
  });

  const [payment, setPayment] = useState({
    amount: "",
    paymentid: "",
  });

  const [followUp, setFollowUp] = useState("");
  const [followUpList, setFollowUpList] = useState([]);

  // Follow Up Add Variables with Enabled Disabled Functionality
  const [customFollowUp, setCustomFollowUp] = useState("");
  const [selectedFollowUp, setSelectedFollowUp] = useState("");

  const handleSelectChange = (e) => {
    const value = e.target.value.trim();
    setSelectedFollowUp(value);
    setFollowUp(value);
    if (value) {
      setCustomFollowUp("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCustomFollowUp(value);
    setFollowUp(value.trim());
    if (value.trim()) {
      setSelectedFollowUp("");
    }
  };

  // **Fetch States from API**
  const fetchStates = async () => {
    try {
      const response = await fetch(URI + "/admin/states", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch States.");
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // **Fetch States from API**
  const fetchCities = async () => {
    try {
      const response = await fetch(`${URI}/admin/cities/${newPartner?.state}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch cities.");
      const data = await response.json();
      console.log(data);
      setCities(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/projectpartner/${partnerPaymentStatus}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch Project Partner.");

      const result = await response.json();
      console.log("Fetched Project Partner Data:", result);

      // Set the table data
      if (result?.data) {
        setDatas(result.data);
      } else {
        setDatas([]); // fallback if no data
      }

      // Set payment status counts if available
      if (result?.paymentStatusCounts) {
        setPaymentStatusCounts(result.paymentStatusCounts);
      } else {
        setPaymentStatusCounts({}); // fallback to empty
      }
    } catch (err) {
      console.error("Error fetching project partner data:", err);
    }
  };

  const add = async (e) => {
    e.preventDefault();

    const endpoint = newPartner.id ? `edit/${newPartner.id}` : "add";

    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/projectpartner/${endpoint}`, {
        method: newPartner.id ? "PUT" : "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPartner),
      });

      if (response.status === 409) {
        alert("partner all ready exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save partner. Status: ${response.status}`);
      } else {
        alert(
          newPartner.id
            ? "Project Partner updated successfully!"
            : "Project Partner added successfully!"
        );

        setNewPartner({
          fullname: "",
          contact: "",
          email: "",
          state: "",
          city: "",
          intrest: "",
        });

        setShowPartnerForm(false);
        await fetchData();
      }
    } catch (err) {
      console.error("Error saving Project Partner:", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/projectpartner/get/${id}`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Project Partner.");
      const data = await response.json();
      console.log(data);
      setNewPartner(data);
      setShowPartnerForm(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //fetch data on form
  const viewPartner = async (id) => {
    try {
      const response = await fetch(URI + `/admin/projectpartner/get/${id}`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Project Partner.");
      const data = await response.json();
      console.log(data);
      setPartner(data);
      setShowPartner(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  //Delete record
  const del = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this Project Partner?")
    )
      return;

    try {
      setLoading(true);
      const response = await fetch(URI + `/admin/projectpartner/delete/${id}`, {
        method: "DELETE",
        credentials: "include", //  Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("Partner deleted successfully!");
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting Project Partner:", error);
    } finally {
      setLoading(false);
    }
  };

  // change status record
  const status = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to change this Project Partner status?"
      )
    )
      return;

    try {
      const response = await fetch(URI + `/admin/projectpartner/status/${id}`, {
        method: "PUT",
        credentials: "include", //  Ensures cookies are sent
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

  // Update Payment ID
  const updatePaymentId = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/projectpartner/update/paymentid/${partnerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payment),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setPartnerId(null);

      setShowPaymentIdForm(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting :", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Follow Up List
  const fetchFollowUpList = async (id) => {
    try {
      const response = await fetch(
        URI + `/admin/projectpartner/followup/list/${id}`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch follow up list.");
      const data = await response.json();
      setFollowUpList(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // ADD Follow Up
  const addFollowUp = async (e) => {
    e.preventDefault();

    // Use customFollowUp if available, else use selectedFollowUp
    const finalFollowUp = customFollowUp.trim() || selectedFollowUp.trim();

    // Prevent submission if both are empty
    if (!finalFollowUp) {
      alert("Please enter or select a follow-up reason.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${URI}/admin/projectpartner/followup/add/${partnerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ followUp: finalFollowUp }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(`Success: ${data.message}`);
        setFollowUp("");
        setCustomFollowUp("");
        setSelectedFollowUp("");
        setPartnerPaymentStatus("Follow Up");
        await fetchData();
        fetchFollowUpList(partnerId);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding FollowUp:", error);
    } finally {
      setLoading(false);
    }
  };

  // Assign login record
  const assignLogin = async (e) => {
    e.preventDefault();
    if (
      !window.confirm(
        "Are you sure you want to assign login to this Project Partner ?"
      )
    )
      return;

    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/projectpartner/assignlogin/${partnerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", //  Ensures cookies are sent
          body: JSON.stringify({ partnerId, username, password }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setPartnerId(null);
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
    fetchStates();
  }, [partnerPaymentStatus]);

  useEffect(() => {
    if (newPartner.state != "") {
      fetchCities();
    }
  }, [newPartner.state]);

  const filteredData = datas.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.adhar?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "SN",
      cell: (row, index) => (
        <span
          className={`min-w-6 flex items-center justify-center px-2 py-1 rounded-md ${
            row.status === "Active"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : "bg-[#FFEAEA] text-[#ff2323]"
          }`}
        >
          {index + 1}
        </span>
      ),
      width: "80px",
    },
    {
      name: "Follow Up",
      cell: (row) => {
        const followUpColorMap = {
          CNR1: "bg-red-100 text-red-600",
          CNR2: "bg-red-100 text-red-600",
          CNR3: "bg-red-100 text-red-600",
          CNR4: "bg-red-100 text-red-600",
          "Switch Off": "bg-red-100 text-red-700",
          "Call Busy": "bg-yellow-100 text-yellow-600",
          "Call Back": "bg-yellow-100 text-yellow-600",
          "Not Responding (After Follow Up)": "bg-yellow-100 text-yellow-600",
          "Call Cut / Disconnected": "bg-orange-100 text-orange-600",
          "Invalid Number": "bg-red-100 text-red-700",
          "Wrong Number": "bg-red-100 text-red-700",
          "Form Filled By Mistake": "bg-blue-100 text-blue-600",
          "Repeat Lead": "bg-gray-100 text-gray-600",
          "Lead Clash": "bg-purple-100 text-purple-500",
          "Details Shared": "bg-green-100 text-green-600",
          "Not Interested": "bg-pink-100 text-pink-600",
          "Not Interested (After Details Shared & Explanation)":
            "bg-orange-100 text-orange-600",
          Interested: "bg-green-100 text-green-700",
          "Documents Collected": "bg-green-200 text-green-800",
          "Payment Done": "bg-green-300 text-green-900",
          // fallback/default:
          Success: "bg-[#EAFBF1] text-[#0BB501]",
          "Follow Up": "bg-[#E9F2FF] text-[#0068FF]",
        };

        const styleClass =
          followUpColorMap[row.followUp] || "bg-[#efefef] text-[#000000]";

        return (
          <span className={`px-2 py-1 rounded-md ${styleClass}`}>
            {row.followUp || "—"}
          </span>
        );
      },
      omit: false,
      minWidth: "200px",
    },
    { name: "Date & Time", selector: (row) => row.created_at, width: "200px" },
    {
      name: "Full Name",
      cell: (row) => (
        <div className={`flex gap-1 items-center justify-center`}>
          <div
            className={`px-[2px] py-[2px] rounded-md flex items-center justify-center ${
              row.loginstatus === "Active"
                ? "bg-[#EAFBF1] text-[#0BB501]"
                : "bg-[#FBE9E9] text-[#FF0000]"
            }`}
          >
            {row.loginstatus === "Active" ? <MdDone /> : <RxCross2 />}
          </div>
          {row.fullname}
        </div>
      ),
       width: "250px",
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
      width: "150px",
    },
    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} />,
      width: "120px",
    },
  ];

  const hasFollowUp = datas.some((row) => !!row.followUp);

  const finalColumns = columns.map((col) => {
    if (col.name === "Follow Up") return { ...col, omit: !hasFollowUp };
    return col;
  });

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "view":
          viewPartner(id);
          break;
        case "status":
          status(id);
          break;
        case "update":
          edit(id);
          break;
        case "payment":
          setPartnerId(id);
          setShowPaymentIdForm(true);
          break;
        case "followup":
          setPartnerId(id);
          fetchFollowUpList(id);
          setShowFollowUpList(true);
          break;
        case "delete":
          del(id);
          break;
        case "assignlogin":
          setPartnerId(id);
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
          <option value="view">View</option>
          <option value="status">Status</option>
          <option value="update">Update</option>
          <option value="payment">Payment</option>
          <option value="followup">Follow Up</option>
          <option value="assignlogin">Assign Login</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  return (
    <div
      className={`overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start`}
    >
      <div className=" w-full h-[80vh] flex flex-col px-4 md:px-6 py-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <p className="block md:hidden text-lg font-semibold">Project Partner</p>
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="ssearch-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Partner"
              className="search-input w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full lg:w-[70%] sm:h-[36px] gap-2 flex flex-wrap justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <PartnerFilter counts={paymentStatusCounts} />
              <CustomDateRangePicker />
            </div>
            <AddButton label={"Add"} func={setShowPartnerForm} />
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Project Partner List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="overflow-scroll scrollbar-hide"
            columns={finalColumns}
            data={filteredData}
            pagination
          />
        </div>
      </div>

      <div
        className={`${
          showPartnerForm ? "flex" : "hidden"
        } z-[61] sales-form overflow-scroll scrollbar-hide w-[400px] md:w-[700px] max-h-[70vh] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-10 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Project Partner</h2>
            <IoMdClose
              onClick={() => {
                setShowPartnerForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={add}>
            <div className="grid gap-6 md:gap-4 grid-cols-1 ">
              <input
                type="hidden"
                value={newPartner.id || ""}
                onChange={(e) => {
                  setNewPartner({ ...newPartner, id: e.target.value });
                }}
              />
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Full Name{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Full Name"
                  value={newPartner.fullname}
                  onChange={(e) => {
                    setNewPartner({
                      ...newPartner,
                      fullname: e.target.value,
                    });
                  }}
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Contact Number{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Contact Number"
                  value={newPartner.contact}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      // Allows only up to 10 digits
                      setNewPartner({
                        ...newPartner,
                        contact: e.target.value,
                      });
                    }
                  }}
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Email{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter Email"
                  value={newPartner.email}
                  onChange={(e) => {
                    setNewPartner({
                      ...newPartner,
                      email: e.target.value,
                    });
                  }}
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* State Select Input */}
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Select State <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  style={{ backgroundImage: "none" }}
                  value={newPartner.state}
                  onChange={(e) =>
                    setNewPartner({ ...newPartner, state: e.target.value })
                  }
                >
                  <option value="">Select Your State</option>
                  {states?.map((state, index) => (
                    <option key={index} value={state.state}>
                      {state.state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Select Input */}
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Select City <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  style={{ backgroundImage: "none" }}
                  value={newPartner.city}
                  onChange={(e) =>
                    setNewPartner({
                      ...newPartner,
                      city: e.target.value,
                    })
                  }
                >
                  <option value="">Select Your City</option>
                  {cities?.map((city, index) => (
                    <option key={index} value={city.city}>
                      {city.city}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Why are You Intrested ?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="Enter Your Intrest to Join Reparv"
                  value={newPartner.intrest}
                  onChange={(e) => {
                    setNewPartner({
                      ...newPartner,
                      intrest: e.target.value,
                    });
                  }}
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex h-10 mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowPartnerForm(false);
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

      {/* Update Payment Id Form */}
      <div
        className={` ${
          !showPaymentIdForm && "hidden"
        }  z-[61] overflow-scroll scrollbar-hide flex fixed`}
      >
        <div className="w-[330px] h-[380px] sm:w-[600px] sm:h-[400px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[300px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Payment Details</h2>
            <IoMdClose
              onClick={() => {
                setShowPaymentIdForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={updatePaymentId}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2">
              <input
                type="hidden"
                value={partnerId || ""}
                onChange={(e) => {
                  setPartnerId(e.target.value);
                }}
              />
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Payment Amount
                </label>
                <input
                  type="number"
                  required
                  placeholder="Enter Amount"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={payment.amount}
                  onChange={(e) => {
                    setPayment({ ...payment, amount: e.target.value });
                  }}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Payment ID
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Payment ID"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={payment.paymentid}
                  onChange={(e) => {
                    setPayment({ ...payment, paymentid: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="flex h-10 mt-8 md:mt-6 justify-center sm:justify-end gap-6">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Update Payment ID
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>

      {/* Update Payment Id Form */}
      <div
        className={` ${
          !showFollowUpList && "hidden"
        }  z-[61] overflow-scroll scrollbar-hide flex fixed`}
      >
        <div className="w-[330px] sm:w-[600px]  overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] max-h-[75vh] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Partner Follow Up</h2>
            <IoMdClose
              onClick={() => {
                setShowFollowUpList(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addFollowUp}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1">
              {/* Dropdown */}
              <select
                value={selectedFollowUp}
                onChange={handleSelectChange}
                disabled={customFollowUp.length > 0}
                className={`w-full p-4 border rounded-[4px] text-[16px] font-medium 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none
                            ${
                              customFollowUp.length > 0
                                ? "bg-gray-200 cursor-not-allowed"
                                : ""
                            }`}
              >
                <option value="">Select Follow Up</option>
                <option className="text-red-600">CNR1</option>
                <option className="text-red-600">CNR2</option>
                <option className="text-red-600">CNR3</option>
                <option className="text-red-600">CNR4</option>
                <option className="text-red-700">Switch Off</option>
                <option className="text-yellow-600">Call Busy</option>
                <option className="text-yellow-600">Call Back</option>
                <option className="text-yellow-600">
                  Not Responding (After Follow Up)
                </option>
                <option className="text-orange-600">
                  Call Cut / Disconnected
                </option>
                <option className="text-red-700">Invalid Number</option>
                <option className="text-red-700">Wrong Number</option>
                <option className="text-blue-600">
                  Form Filled By Mistake
                </option>
                <option className="text-gray-600">Repeat Lead</option>
                <option className="text-purple-500">Lead Clash</option>
                <option className="text-green-600">Details Shared</option>
                <option className="text-pink-600">Not Interested</option>
                <option className="text-orange-600">
                  Not Interested (After Details Shared & Explanation)
                </option>
                <option className="text-green-700">Interested</option>
                <option className="text-green-800">Documents Collected</option>
                <option className="text-green-900">Payment Done</option>
              </select>

              {/* Input Field */}
              <input
                type="text"
                placeholder="Enter Custom Follow Up"
                value={customFollowUp}
                onChange={handleInputChange}
                disabled={selectedFollowUp.length > 0}
                className={`w-full p-4 border border-[#00000033] rounded-[4px] text-[16px] font-medium
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           ${
                             selectedFollowUp.length > 0
                               ? "bg-gray-200 cursor-not-allowed"
                               : ""
                           }`}
              />
            </div>
            <div className="flex h-10 mt-8 md:mt-4 justify-center sm:justify-end gap-6">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Add Follow Up
              </button>
              <Loader></Loader>
            </div>
          </form>
          {/* Show Follow Up List */}
          <div className="w-full mt-4">
            <div className="mt-2 flex flex-col gap-2">
              {followUpList.length > 0 ? (
                followUpList.map((followUp, index) => (
                  <div key={index} className="w-full">
                    <label className="block mt-2 text-sm leading-4 text-[#00000066] font-medium">
                      <span className={`px-2 py-1 rounded-md`}>
                        {followUp?.created_at}
                      </span>
                    </label>
                    <input
                      type="text"
                      disabled
                      className="w-full mt-[6px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={followUp.followUp}
                      readOnly
                    />
                  </div>
                ))
              ) : (
                <input
                  type="text"
                  disabled
                  className="w-full text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value="No Follow Up Found"
                  readOnly
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Give Access Form */}
      <div
        className={` ${
          !giveAccess && "hidden"
        }  z-[61] overflow-scroll scrollbar-hide flex fixed`}
      >
        <div className="w-[330px] h-[380px] sm:w-[600px] sm:h-[400px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[300px] bg-white py-8 pb-10 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Give Access</h2>
            <IoMdClose
              onClick={() => {
                setGiveAccess(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={assignLogin}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2">
              <input
                type="hidden"
                value={partnerId || ""}
                onChange={(e) => {
                  setPartnerId(e.target.value);
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
            </div>
            <div className="flex h-10 mt-8 md:mt-6 justify-center sm:justify-end gap-6">
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

      {/* Show Project Partner details */}
      <div
        className={`${
          showPartner ? "flex" : "hidden"
        } z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Project Partner Details
            </h2>
            <IoMdClose
              onClick={() => {
                setShowPartner(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <div className="w-full ">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Why Intrested to Join Reparv
            </label>
            <input
              type="text"
              disabled
              className="w-full my-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={partner.intrest}
              readOnly
            />
          </div>
          <form className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Status
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.status}
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
                value={partner.loginstatus}
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
                value={partner.paymentstatus}
                readOnly
              />
            </div>
            <div
              className={`${partner.paymentid === null ? "hidden" : "block"}`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Payment ID
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.paymentid}
                readOnly
              />
            </div>
            <div className={`${partner.amount === null ? "hidden" : "block"}`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Registration Amount
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.amount}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Full Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.fullname}
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
                value={partner.contact}
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
                value={partner.email}
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
                value={partner.experience}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Bank Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.bankname}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Account Holder Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.accountholdername}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Account Number
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.accountnumber}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                IFSC Code
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.ifsc}
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
                value={partner.address}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                State
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.state}
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
                value={partner.city}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Pin-Code
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.pincode}
                readOnly
              />
            </div>

            <div></div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Adhar No
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.adharno}
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
                value={partner.panno}
                readOnly
              />
            </div>
            <div className={`w-full ${partner.rerano ? "block" : "hidden"}`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                RERA No
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={partner.rerano}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Adhaar Image
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}${partner.adharimage}`}
                alt=""
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                PanCard Image
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}${partner.panimage}`}
                alt=""
              />
            </div>

            <div className={`w-full ${partner.reraImage ? "block" : "hidden"}`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Rera Image
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}${partner.reraimage}`}
                alt=""
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectPartner;
