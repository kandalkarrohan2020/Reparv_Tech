import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../store/auth";
import Loader from "../components/Loader";

const Enquirers = () => {
  const {
    URI,
    showEnquiryStatusForm,
    setShowEnquiryStatusForm,
    showPropertyInfo,
    setShowPropertyInfo,
    setLoading,
    showEnquiry,
    setShowEnquiry,
  } = useAuth();

  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [enquiryId, setEnquiryId] = useState("");
  const [territoryId, setTerritoryId] = useState("");
  const [enquiry, setEnquiry] = useState({});
  const [property, setProperty] = useState({});
  const [followUpRemark, setFollowUpRemark] = useState("");

  const [token, setToken] = useState({
    paymenttype: "",
    dealamount: "",
    remark: "",
  });

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/territory-partner/enquirers", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch enquirers.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const acceptEnquiry = async (id, teid) => {
    try {
      const response = await fetch(
        `${URI}/territory-partner/enquirers/accept/${id}`,
        {
          method: "PUT",
          credentials: "include", // ✅ Send cookies (important for auth)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teid }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept enquiry.");
      }
      fetchData();
    } catch (error) {
      console.error("Error accepting enquiry:", error);
    }
  };

  const rejectEnquiry = async (id, teid) => {
    try {
      const response = await fetch(
        `${URI}/territory-partner/enquirers/reject/${id}`,
        {
          method: "PUT",
          credentials: "include", // ✅ Send cookies (important for auth)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teid }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to accept enquiry.");
      }
      fetchData();
    } catch (error) {
      console.error("Error accepting enquiry:", error);
    }
  };

  // change status record
  const changeEnquiryStatus = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        `${URI}/territory-partner/enquirers/followup/${enquiryId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ followUpRemark, territoryId }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(`Success: ${data.message}`);
        setFollowUpRemark("");
        setShowEnquiryStatusForm(false);
      } else {
        alert(`Error: ${data.message}`);
      }

    } catch (error) {
      console.error("Error while Add Follow Up Remark:", error);
    } finally {
      setLoading(false);
    }
  };

  const showProperty = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setProperty(data);
      setShowPropertyInfo(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const viewEnquiry = async (id) => {
    try {
      const response = await fetch(URI + `/territory-partner/enquirers/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch enquiry.");
      const data = await response.json();
      setEnquiry(data);
      setShowEnquiry(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Intrested Property",
      cell: (row) => (
        <div
          className={`w-[140px] h-16 overflow-hidden flex items-center justify-center`}
        >
          <img
            src={`${URI}${JSON.parse(row.frontView)[0]}`}
            alt="Image"
            className="w-full h-[90%] object- cursor-pointer"
            onClick={() => {
              showProperty(row.propertyid);
            }}
          />
        </div>
      ),
      width: "160px",
    },
    { name: "Visit Date", selector: (row) => row.visitDate, sortable: true },
    { name: "Customer", selector: (row) => row.customer, sortable: true },
    { name: "Contact", selector: (row) => row.contact, sortable: true },
    
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.territoryStatus === "New"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.territoryStatus === "Accepted"
              ? "bg-[#E9F2FF] text-[#0068FF]"
              : row.territoryStatus === "Rejected"
              ? "bg-[#FFEAEA] text-[#ff2323]"
              : "text-[#000000]"
          }`}
        >
          {row.territoryStatus}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} />,
    },
  ];

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, id, teid) => {
      switch (action) {
        case "view":
          viewEnquiry(id);
          break;
        case "accept":
          acceptEnquiry(id, teid);
          break;
        case "reject":
          rejectEnquiry(id, teid);
          break;
        case "status":
          setEnquiryId(id);
          setTerritoryId(teid);
          setShowEnquiryStatusForm(true);
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
            handleActionSelect(action, row.enquirersid, row.teid);
          }}
        >
          <option value="" disabled>
            Action
          </option>
          <option value="view">View</option>
          {row.territoryStatus === "New" && <option value="accept">Accept</option>}
          {row.territoryStatus === "New" && <option value="reject">Reject</option>}
          <option value="status">Follow Up</option>
        </select>
      </div>
    );
  };

  return (
    <div className="enquirers overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="enquirers-table w-full h-[80vh] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        {/* <p className="block md:hidden text-lg font-semibold">Enquirers</p> */}
        <div className="searchBarContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Enquiry"
              className="search-input md:w-[250px] h-[36px] text-sm text-black bg-transparent border-none outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="rightTableHead w-full sm:w-1/2 min-w-[307px] sm:h-[36px] flex justify-end items-center">
            <div className="flex flex-wrap items-center justify-end gap-3 px-2">
              <FilterData />
              <CustomDateRangePicker />
            </div>
          </div>
        </div>
        <h2 className="text-[16px] font-semibold">Enquiry List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            columns={columns}
            data={filteredData}
            pagination
          />
        </div>
      </div>

      {/* Change Enquiry Status Form */}
      <div
        className={` ${
          !showEnquiryStatusForm && "hidden"
        } z-[61] overflow-scroll scrollbar-hide flex fixed`}
      >
        <div className="w-[330px] h-[350px] sm:w-[600px] sm:h-[300px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[300px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Enquiry Follow Up Remark
            </h2>
            <IoMdClose
              onClick={() => {
                setShowEnquiryStatusForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={changeEnquiryStatus}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-1">
              <input
                type="hidden"
                value={enquiryId || ""}
                onChange={(e) => setEnquiryId(e.target.value)}
              />

              <div className={`w-full `}>
                <textarea
                  rows={2}
                  cols={40}
                  placeholder="Enter Follow Up Remark"
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={followUpRemark}
                  onChange={(e) => {
                    setFollowUpRemark(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowEnquiryStatusForm(false);
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Set Status
              </button>
              <Loader></Loader>
            </div>
          </form>
        </div>
      </div>

      {/* Show Property Info */}
      <div
        className={`${
          showPropertyInfo ? "flex" : "hidden"
        } z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Property Details</h2>
            <IoMdClose
              onClick={() => {
                setShowPropertyInfo(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Builder/Company
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.company_name}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Property Type
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.propertytypeid}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Property Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.property_name}
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
                value={property.address}
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
                value={property.city}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Location
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.location}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Rera No.
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.rerano}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Area
              </label>
              <input
                type="number"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.area}
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Square Feet Price
              </label>
              <input
                type="number"
                disabled
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.sqft_price}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Extra
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.extra}
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
                value={property.status}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Approve Status
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.approve}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>

      {/* Show Enquiry Info */}
      <div
        className={`${
          showEnquiry ? "flex" : "hidden"
        } z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Enquiry Details</h2>
            <IoMdClose
              onClick={() => {
                setShowEnquiry(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Customer Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={enquiry.customer}
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
                value={enquiry.contact}
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
                value={enquiry.email}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                budget
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={enquiry.budget}
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
                value={enquiry.city}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Location
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={enquiry.location}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Message
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={enquiry.message}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Visit Date
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={enquiry.visitDate}
                readOnly
              />
            </div>
            <div className={`${enquiry.followup ? "block" : "hidden"} w-full `}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Follow Up
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={enquiry.followup}
                readOnly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Enquirers;
