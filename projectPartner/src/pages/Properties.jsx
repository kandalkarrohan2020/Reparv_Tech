import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useAuth } from "../store/auth";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../components/Loader";
import MultiStepForm from "../components/propertyForm/MultiStepForm";

const Properties = () => {
  const {
    setShowPropertyForm,
    showPropertyForm,
    showUploadImagesForm,
    setShowUploadImagesForm,
    showAdditionalInfoForm,
    setShowAdditionalInfoForm,
    showPropertyInfo,
    setShowPropertyInfo,
    URI,
    setLoading,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [builderData, setBuilderData] = useState([]);
  const [property, setProperty] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  
  const [newProperty, setPropertyData] = useState({
      builderid: "",
      propertyCategory: "",
      propertyApprovedBy: "",
      propertyName: "",
      address: "",
      city: "",
      location: "",
      distanceFromCityCenter: "",
      totalSalesPrice: "",
      totalOfferPrice: "",
      stampDuty: "",
      registrationFee: "",
      gst: "",
      advocateFee: "",
      msebWater: "",
      maintenance: "",
      other: "",
      propertyType: "",
      builtYear: "",
      ownershipType: "",
      builtUpArea: "",
      carpetArea: "",
      parkingAvailability: "",
      totalFloors: "",
      floorNo: "",
      loanAvailability: "",
      propertyFacing: "",
      reraRegistered: "",
      furnishing: "",
      waterSupply: "",
      powerBackup: "",
      locationFeature:"",
      sizeAreaFeature:"",
      parkingFeature:"",
      terraceFeature:"",
      ageOfPropertyFeature:"",
      furnishingFeature:"",
      amenitiesFeature:"",
      propertyStatusFeature:"",
      floorNumberFeature:"",
      smartHomeFeature:"",
      securityBenefit:"",
      primeLocationBenefit:"",
      rentalIncomeBenefit:"",
      qualityBenefit:"",
      capitalAppreciationBenefit:"",
      ecofriendlyBenefit:"",
    });
    const [imageFiles, setImageFiles] = useState({
      frontView: [],
      sideView: [],
      kitchenView: [],
      hallView: [],
      bedroomView: [],
      bathroomView: [],
      balconyView: [],
      nearestLandmark: [],
      developedAmenities: [],
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

  //Single Image Upload
  const [selectedScheduledPropertyImage, setSelectedScheduledPropertyImage] =
    useState(null);

  const scheduledPropertyImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedScheduledPropertyImage(file);
    }
  };

  const removeScheduledPropertyImage = () => {
    setSelectedScheduledPropertyImage(null);
  };

  //Single Image Upload
  const [selectedSignedDocumentImage, setSelectedSignedDocumentImage] =
    useState(null);

  const signedDocumentImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedSignedDocumentImage(file);
    }
  };

  const removeSignedDocumentImage = () => {
    setSelectedSignedDocumentImage(null);
  };

  //Single Image Upload
  const [selectedSatBaraImage, setSelectedSatBaraImage] = useState(null);

  const satBaraImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedSatBaraImage(file);
    }
  };

  const removeSatBaraImage = () => {
    setSelectedSatBaraImage(null);
  };

  //Single Image Upload
  const [selectedOwnerAdharImage, setSelectedOwnerAdharImage] = useState(null);

  const ownerAdharImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedOwnerAdharImage(file);
    }
  };

  const removeOwnerAdharImage = () => {
    setSelectedOwnerAdharImage(null);
  };

  //Single Image Upload
  const [selectedOwnerPanImage, setSelectedOwnerPanImage] = useState(null);

  const ownerPanImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedOwnerPanImage(file);
    }
  };

  const removeOwnerPanImage = () => {
    setSelectedOwnerPanImage(null);
  };

  //Single Image Upload
  const [selectedEBillImage, setSelectedEBillImage] = useState(null);

  const eBillImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedEBillImage(file);
    }
  };

  const removeEBillImage = () => {
    setSelectedEBillImage(null);
  };

  //Fetch Builder
  const fetchBuilder = async () => {
    try {
      const response = await fetch(URI + "/project-partner/builders/active", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch builders.");
      const data = await response.json();
      setBuilderData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  /*Fetch Property type
  const fetchPropertyType = async () => {
    try {
      const response = await fetch(URI + "/admin/propertytypes/active", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setPropertyTypeData(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };
  */

  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/project-partner/properties", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };


  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/project-partner/properties/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setPropertyData(data);
      console.log(data);

      setShowPropertyForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const viewProperty = async (id) => {
    try {
      const response = await fetch(URI + `/project-partner/properties/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setProperty(data);
      setShowPropertyInfo(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBuilder();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const columns = [
    {
      name: "SN",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "50px",
    },
    {
      name: "Image",
      cell: (row) => {
        let imageSrc = "default.jpg";

        try {
          const parsed = JSON.parse(row.frontView);
          if (Array.isArray(parsed) && parsed[0]) {
            imageSrc = `${URI}${parsed[0]}`;
          }
        } catch (e) {
          console.warn("Invalid or null frontView:", row.frontView);
        }

        return (
          <div className="w-[130px] h-14 overflow-hidden flex items-center justify-center">
            <img
              src={imageSrc}
              alt="Property"
              onClick={() => view(row.propertyid)}
              className="w-full h-[90%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      width: "130px",
    },
    { name: "Name", selector: (row) => row.propertyName, sortable: true },
    {
      name: "Builder",
      selector: (row) => row.company_name,
      sortable: true,
      minWidth: "100px",
    },
    { name: "Category", selector: (row) => row.propertyCategory, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    {
      name: "Rera No.",
      selector: (row) => row.reraRegistered,
      sortable: true,
      minWidth: "130px",
    },
    { name: "Area", selector: (row) => row.builtUpArea, sortable: true },
    { name: "Total Price", selector: (row) => row.totalOfferPrice, sortable: true },
    {
      name: "Approve",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row.approve === "Approved"
              ? "bg-[#EAFBF1] text-[#0BB501]"
              : row.approve === "Rejected"
              ? "bg-[#FBE9E9] text-[#FF0000]"
              : "bg-[#E9F2FF] text-[#0068FF]"
          }`}
        >
          {row.approve}
        </span>
      ),
      minWidth: "150px",
    },
    {
      name: "Reject Reason",
      selector: (row) => row.rejectreason || "-- No Reason --",
      minWidth: "150px",
    },
    {
      name: "Action",
      cell: (row) => <ActionDropdown row={row} />,
    },
  ];

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, propertyid) => {
      switch (action) {
        case "view":
          viewProperty(propertyid);
          break;
        case "update":
          edit(propertyid);
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
            handleActionSelect(action, row.propertyid);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View</option>
          <option value="update">Update</option>
        </select>
      </div>
    );
  };

  return (
    <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="properties-table w-full h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="searchBarContainer w-full flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="search-bar w-full lg:w-[30%] min-w-[150px] max:w-[289px] xl:w-[289px] h-[36px] flex gap-[10px] rounded-[12px] p-[10px] items-center justify-start lg:justify-between bg-[#0000000A]">
            <CiSearch />
            <input
              type="text"
              placeholder="Search Property"
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
            <AddButton label={"Add "} func={setShowPropertyForm} />
          </div>
        </div>

        <h2 className="text-[16px] font-semibold">Properties List</h2>
        <div className="overflow-scroll scrollbar-hide">
          <DataTable
            className="scrollbar-hide"
            columns={columns}
            data={filteredData}
            pagination
          />
        </div>
      </div>

      {/* Add Property Multi Step Form */}
      <MultiStepForm
        fetchData={fetchData}
        newProperty={newProperty}
        setPropertyData={setPropertyData}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        builderData={builderData}
      />

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
            <div
              className={`${
                property.partnerid === null ? "hidden" : "block"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                OnBoarding Partner Name
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.fullname}
                readOnly
              />
            </div>
            <div
              className={`${
                property.partnerid === null ? "hidden" : "block"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                OnBoarding Partner Contact
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.contact}
                readOnly
              />
            </div>
            <div
              className={`${
                property.partnerid === null ? "hidden" : "block"
              } w-full`}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                OnBoarding Partner Email
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.email}
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
            <div
              className={`${
                property.wing == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Wing
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.wing}
                readOnly
              />
            </div>
            <div
              className={`${
                property.floor == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Floor
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.floor}
                readOnly
              />
            </div>
            <div
              className={`${
                property.flatno == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Flat No
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.flatno}
                readOnly
              />
            </div>
            <div
              className={`${
                property.direction == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Direction
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.direction}
                readOnly
              />
            </div>
            <div
              className={`${
                property.ageofconstruction == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Age of Construction
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.ageofconstruction}
                readOnly
              />
            </div>
            <div
              className={`${
                property.carpetarea == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Carpet Area
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.carpetarea}
                readOnly
              />
            </div>
            <div
              className={`${
                property.superbuiltup == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Super Builtup
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.superbuiltup}
                readOnly
              />
            </div>
            <div
              className={`${
                property.salesprice == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Sales Price
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.salesprice}
                readOnly
              />
            </div>
            <div
              className={`${
                property.ownercontact == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Owner Contact Number
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.ownercontact}
                readOnly
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Property Image
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}${property.image}`}
                alt=""
              />
            </div>

            <div
              className={`${
                property.owneradhar == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Owner Adhar
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}/uploads/${property.owneradhar}`}
                alt=""
              />
            </div>

            <div
              className={`${
                property.ownerpan == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Owner Pan
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}/uploads/${property.ownerpan}`}
                alt=""
              />
            </div>

            <div
              className={`${
                property.schedule == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Property Schedule
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}/uploads/${property.schedule}`}
                alt=""
              />
            </div>

            <div
              className={`${
                property.signed == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Signed Documents
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}/uploads/${property.signed}`}
                alt=""
              />
            </div>

            <div
              className={`${
                property.satbara == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Latest 7/12
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}/uploads/${property.satbara}`}
                alt=""
              />
            </div>

            <div
              className={`${
                property.ebill == null ? "hidden" : "block"
              } w-full `}
            >
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Electricity Bill
              </label>
              <img
                className="w-full mt-[10px] border border-[#00000033] rounded-[4px] object-cover"
                src={`${URI}/uploads/${property.ebill}`}
                alt=""
              />
            </div>
          </form>

          <div
            className={`${
              property.description == null ? "hidden" : "block"
            } w-full mt-3`}
          >
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Description
            </label>
            <textarea
              rows={3}
              disabled
              readOnly
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-[#f9f9f9]"
              value={property.description}
            />
          </div>
          <div
            className={`${
              property.rejectreason == null ? "hidden" : "block"
            } w-full mt-3`}
          >
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Property Reject Reason
            </label>
            <textarea
              rows={3}
              disabled
              readOnly
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-[#f9f9f9]"
              value={property.rejectreason}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
