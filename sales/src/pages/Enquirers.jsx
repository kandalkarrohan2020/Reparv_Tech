import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../store/auth";

const Enquirers = () => {
  const {
    URI,
    showEnquiryStatusForm,
    setShowEnquiryStatusForm,
    showPropertyInfo,
    setShowPropertyInfo,
  } = useAuth();

  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [enquiryId, setEnquiryId] = useState("");
  const [property, setProperty] = useState({});
  const [enquiryStatus, setEnquiryStatus] = useState("");
  const [followUpRemark, setFollowUpRemark] = useState("");
  const [cancelledRemark, setCancelledRemark] = useState("");
  const [visitRemark, setVisitRemark] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [token, setToken] = useState({
    paymenttype: "",
    dealamount: "",
    remark: "",
  });

  //Single Image Upload
  const [selectedImage, setSelectedImage] = useState(null);

  const singleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const removeSingleImage = () => {
    setSelectedImage(null);
  };

  // **Fetch Data from API**
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/sales/enquirers", {
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

  // change status record
  const changeEnquiryStatus = async (e) => {
    e.preventDefault();

    if (enquiryStatus === "Visit Scheduled") {
      if (!visitDate || !visitRemark) {
        return alert("All Fields Are Required!");
      }

      try {
        const response = await fetch(
          `${URI}/sales/enquirers/visitscheduled/${enquiryId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ visitDate, visitRemark }),
          }
        );
        const data = await response.json();
        console.log(response);
        if (response.ok) {
          alert(`Success: ${data.message}`);
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error while Add Visit Scheduled:", error);
      }
    }

    if (enquiryStatus === "Token") {
      if (!token.dealamount || !token.paymenttype || !token.remark) {
        return alert("All Fields Are Required!");
      }
      const formData = new FormData();
      formData.append("paymenttype", token.paymenttype);
      formData.append("remark", token.remark);
      formData.append("dealamount", token.dealamount);
      if (selectedImage) {
        formData.append("paymentimage", selectedImage);
      }

      try {
        const response = await fetch(
          `${URI}/sales/enquirers/token/${enquiryId}`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert(`Success: ${data.message}`);
          setToken({
            paymenttype: "",
            dealamount: "",
            remark: "",
          })
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error while Add Token:", error);
      }
    }

    if (enquiryStatus === "Follow Up") {
      if (!followUpRemark) {
        return alert("All Fields Are Required!");
      }
      try {
        const response = await fetch(
          `${URI}/sales/enquirers/followup/${enquiryId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ followUpRemark }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert(`Success: ${data.message}`);
          setFollowUpRemark("");
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error while Add Follow Up Remark:", error);
      }
    }

    if (enquiryStatus === "Cancelled") {
      if (!cancelledRemark) {
        return alert("All Fields Are Required!");
      }
      try {
        const response = await fetch(
          `${URI}/sales/enquirers/cancelled/${enquiryId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ cancelledRemark }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          alert(`Success: ${data.message}`);
          setCancelledRemark("");
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error("Error while Add Cancelled Remark:", error);
      }
    }

    if (
      !window.confirm(
        "Are you sure you want to change into this Enquiry status?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${URI}/sales/enquirers/status/${enquiryId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ enquiryStatus }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
        setShowEnquiryStatusForm(false);
        fetchData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const showProperty = async (id) => {
    try {
      const response = await fetch(URI + `/sales/properties/${id}`, {
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
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    {
      name: "Intrested Property",
      cell: (row) => (
        <div
          className={`w-full h-14 overflow-hidden flex items-center justify-center`}
        >
          <img
            src={`${URI}${row.image}`}
            alt="Image"
            className="w-full h-[90%] object- cursor-pointer"
            onClick={() => {
              showProperty(row.propertyid);
            }}
          />
        </div>
      ),
    },
    { name: "Customer", selector: (row) => row.customer, sortable: true },
    { name: "Contact", selector: (row) => row.contact, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Budget", selector: (row) => row.budget, sortable: true },

    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.status === "New"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.status === "Visit Scheduled"
              ? "bg-[#E9F2FF] text-[#0068FF]"
              : row.status === "Token"
              ? "bg-[#FFF8DD] text-[#FFCA00]"
              : row.status === "Cancelled"
              ? "bg-[#FFEAEA] text-[#ff2323]"
              : row.status === "Follow Up"
              ? "bg-[#F4F0FB] text-[#5D00FF]"
              : "text-[#000000]"
          }`}
        >
          {row.status}
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

    const handleActionSelect = (action, id) => {
      switch (action) {
        case "status":
          setEnquiryId(id);
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
            handleActionSelect(action, row.enquirersid);
          }}
        >
          <option value="" disabled>
            Change Status
          </option>
          <option value="status">Status</option>
        </select>
      </div>
    );
  };

  return (
    <div className="enquirers overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="enquirers-table w-full h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        {/* <p className="block md:hidden text-lg font-semibold">Enquirers</p> */}
        <div className="searchBarContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full sm:w-1/2 min-w-[150px] max:w-[289px] md:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start md:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Builder"
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
        <h2 className="text-[16px] font-semibold">Enquirer List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable className="scrollbar-hide" columns={columns} data={filteredData} pagination />
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
            <h2 className="text-[16px] font-semibold">Change Enquiry Status</h2>
            <IoMdClose
              onClick={() => {
                setShowEnquiryStatusForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2">
            <input
              type="hidden"
              value={enquiryId || ""}
              onChange={(e) => setEnquiryId(e.target.value)}
            />

            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Enquiry Status
              </label>
              <select
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                style={{ backgroundImage: "none" }}
                value={enquiryStatus}
                onChange={(e) => {
                  setEnquiryStatus(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Enquiry Status
                </option>
                <option value="New">New</option>
                <option value="Visit Scheduled">Visit Scheduled</option>
                <option value="Token">Token</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div
              className={`${
                enquiryStatus === "Visit Scheduled" ? "block" : "hidden"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Meeting Date
              </label>
              <input
                type="date"
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={visitDate}
                onChange={(e) => {
                  const selectedDate = e.target.value; // Get full date
                  const formattedDate = selectedDate.split("T")[0]; // Extract only YYYY-MM-DD
                  setVisitDate(formattedDate);
                }}
              />
            </div>
            <div
              className={`${
                enquiryStatus === "Visit Scheduled" ? "block" : "hidden"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Enquiry Remark
              </label>
              <textarea
                rows={2}
                cols={40}
                placeholder="Enter Remark"
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={visitRemark}
                onChange={(e) => {
                  setVisitRemark(e.target.value);
                }}
              />
            </div>
            <div
              className={`${
                enquiryStatus === "Token" ? "block" : "hidden"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Payment Type
              </label>
              <input
                type="text"
                required
                placeholder="Enter Paymet Type"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={token.paymenttype}
                onChange={(e) =>
                  setToken({ ...token, paymenttype: e.target.value })
                }
              />
            </div>
            <div
              className={`${
                enquiryStatus === "Token" ? "block" : "hidden"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Enquiry Remark
              </label>
              <textarea
                rows={2}
                cols={40}
                placeholder="Enter Remark"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={token.remark}
                onChange={(e) => {
                  setToken({ ...token, remark: e.target.value });
                }}
              />
            </div>

            <div
              className={`${
                enquiryStatus === "Token" ? "block" : "hidden"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Deal In Amount
              </label>
              <input
                type="number"
                required
                placeholder="Enter Amount"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={token.dealamount}
                onChange={(e) =>
                  setToken({ ...token, dealamount: e.target.value })
                }
              />
            </div>
            <div
              className={`${
                enquiryStatus === "Token" ? "block" : "hidden"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Upload Property Image
              </label>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={singleImageChange}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
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
              {selectedImage && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded preview"
                    className="w-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeSingleImage}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div
              className={`${
                enquiryStatus === "Follow Up" || enquiryStatus === "Cancelled"
                  ? "block"
                  : "hidden"
              } w-full `}
            ></div>
            <div
              className={`${
                enquiryStatus === "Follow Up" ? "block" : "hidden"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Enquiry Remark
              </label>
              <textarea
                rows={2}
                cols={40}
                placeholder="Enter Remark"
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={followUpRemark}
                onChange={(e) => {
                  setFollowUpRemark(e.target.value);
                }}
              />
            </div>
            <div
              className={`${
                enquiryStatus === "Cancelled" ? "block" : "hidden"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Enquiry Remark
              </label>
              <textarea
                rows={2}
                cols={40}
                placeholder="Enter Remark"
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={cancelledRemark}
                onChange={(e) => {
                  setCancelledRemark(e.target.value);
                }}
              />
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
                onClick={changeEnquiryStatus}
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Set Status
              </button>
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
    </div>
  );
};

export default Enquirers;
