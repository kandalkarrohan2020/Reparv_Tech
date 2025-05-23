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
import { RiArrowDropDownLine } from "react-icons/ri";
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
    showRejectReasonForm,
    setShowRejectReasonForm,
    URI,
    loading,
    setLoading,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [property, setProperty] = useState({});
  const [propertyKey, setPropertyKey] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [builderData, setBuilderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyImages, setPropertyImages] = useState([]);
  const [newAddInfo, setNewAddInfo] = useState({
    propertyinfoid: "",
    propertyid: "",
    wing: "",
    floor: "",
    flatno: "",
    direction: "",
    ageofconstruction: "",
    carpetarea: "",
    superbuiltup: "",
    salesprice: "",
    description: "",
    ownercontact: "",
  });
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

  const [selectedPartner, setSelectedPartner] = useState(
    "Select Property Lister"
  );

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
      const response = await fetch(URI + "/admin/builders/active", {
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
    setLoading(true);
    try {
      const response = await fetch(
        `${URI}/admin/properties/get/${selectedPartner}`,
        {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    } finally {
      setLoading(false);
    }
  };

  const view = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
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

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
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

  // Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;

    try {
      const response = await fetch(URI + `/admin/properties/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Property deleted successfully!");
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
      !window.confirm("Are you sure you want to change this property status?")
    )
      return;

    try {
      const response = await fetch(URI + `/admin/properties/status/${id}`, {
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
  const approve = async (id) => {
    if (!window.confirm("Are you sure you want to approve this property?"))
      return;

    try {
      const response = await fetch(URI + `/admin/properties/approve/${id}`, {
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

  // Add Property Reject Reason
  const addRejectReason = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/properties/reject/${propertyKey}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rejectReason }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setShowRejectReasonForm(false);
      setRejectReason("");
      await fetchData();
    } catch (error) {
      console.error("Error adding reject reason:", error);
    } finally {
      setLoading(false);
    }
  };

  //Property Image Uploader
  const [images, setImages] = useState([]);
  const [propertyId, setPropertyId] = useState(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const fetchImages = async (id) => {
    try {
      const response = await fetch(`${URI}/admin/properties/images/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Images.");
      const data = await response.json();
      setPropertyImages(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // delete Image from Database
  const deleteImages = async (id, propertyid) => {
    try {
      const response = await fetch(
        `${URI}/admin/properties/images/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }
      await fetchImages(propertyid);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const openImages = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setPropertyId(data.propertyid);
      setShowUploadImagesForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const addImages = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyid", propertyId);
    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("images[]", image);
      });
    }

    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/properties/addimages`, {
        method: "POST",
        credentials: "include",
        body: formData, // FormData allows file uploads
      });

      if (response.status === 409) {
        alert("Property already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        setLoading(false);
        alert("Images Uploaded Successfully!");
      }

      // Reset after upload
      setImages([]);
      setShowUploadImagesForm(false);
      await fetchData(); // Refresh data
    } catch (err) {
      console.error("Error saving property:", err);
    } finally {
      setLoading(false);
    }
  };

  //additional info
  const openAdditionalInfo = async (id) => {
    try {
      const response = await fetch(
        URI + `/admin/properties/propertyinfo/${id}`,
        {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();

      setNewAddInfo(data);
      setShowAdditionalInfoForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  const additionalInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyid", newAddInfo.propertyid);
    formData.append("wing", newAddInfo.wing);
    formData.append("floor", newAddInfo.floor);
    formData.append("flatno", newAddInfo.flatno);
    formData.append("direction", newAddInfo.direction);
    formData.append("ageofconstruction", newAddInfo.ageofconstruction);
    formData.append("carpetarea", newAddInfo.carpetarea);
    formData.append("superbuiltup", newAddInfo.superbuiltup);
    formData.append("salesprice", newAddInfo.salesprice);
    formData.append("description", newAddInfo.description);
    formData.append("ownercontact", newAddInfo.ownercontact);

    if (selectedOwnerAdharImage) {
      formData.append("owneradhar", selectedOwnerAdharImage);
    }
    if (selectedOwnerPanImage) {
      formData.append("ownerpan", selectedOwnerPanImage);
    }
    if (selectedScheduledPropertyImage) {
      formData.append("schedule", selectedScheduledPropertyImage);
    }
    if (selectedSignedDocumentImage) {
      formData.append("signed", selectedSignedDocumentImage);
    }
    if (selectedSatBaraImage) {
      formData.append("satbara", selectedSatBaraImage);
    }
    if (selectedEBillImage) {
      formData.append("ebill", selectedEBillImage);
    }

    const endpoint = newAddInfo.propertyinfoid
      ? `editadditionalinfo/${newAddInfo.propertyinfoid}`
      : "additionalinfoadd";

    try {
      setLoading(true);
      const response = await fetch(`${URI}/admin/properties/${endpoint}`, {
        method: newAddInfo.propertyinfoid ? "PUT" : "POST",
        credentials: "include",
        body: formData,
      });

      if (response.status === 409) {
        alert("Additional Info already exists!");
      } else if (!response.ok) {
        throw new Error(
          `Failed to save Additional Info. Status: ${response.status}`
        );
      } else {
        alert(
          newAddInfo.propertyinfoid
            ? "Additional Info updated successfully!"
            : "Additional Info added successfully!"
        );
      }
      // Clear form only after a successful response
      setNewAddInfo({
        propertyid: "",
        wing: "",
        floor: "",
        flatno: "",
        direction: "",
        ageofconstruction: "",
        carpetarea: "",
        superbuiltup: "",
        salesprice: "",
        description: "",
        ownercontact: "",
      });

      setShowAdditionalInfoForm(false);

      await fetchData();
    } catch (err) {
      console.error("Error saving property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedPartner]);

  useEffect(() => {
    fetchData();
    fetchBuilder();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
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
              onClick={() => {
                window.open("https://www.reparv.in/property-info/"+row.propertyid, "_blank");
              }}
              className="w-full h-[90%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      width: "130px",
    },
    { name: "Builder", selector: (row) => row.company_name, sortable: true },
    {
      name: "Property Lister",
      cell: (row) => (
        <div className="flex flex-col gap-[2px] p-2">
          <span>{row.fullname}</span>
          <span> {row.contact}</span>
          <span> {row.partnerCity}</span>
        </div>
      ),
      omit: false,
      sortable: true,
      minWidth: "180px",
    },
    { name: "Category", selector: (row) => row.propertyCategory, sortable: true },
    { name: "Name", selector: (row) => row.propertyName, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Rera No.", selector: (row) => row.reraRegistered, sortable: true },
    { name: "Area", selector: (row) => row.builtUpArea, sortable: true },
    { name: "Price", selector: (row) => row.totalOfferPrice, sortable: true },
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
      name: "Actions",
      cell: (row) => <ActionDropdown row={row} />,
    },
  ];

  const hasPropertyLister = datas.some((row) => !!row.fullname);

  const finalColumns = columns.map((col) => {
    if (col.name === "Property Lister")
      return { ...col, omit: !hasPropertyLister };
    return col;
  });

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, propertyid, propertyType) => {
      switch (action) {
        case "view":
          view(propertyid);
          break;
        case "status":
          status(propertyid);
          break;
        case "update":
          edit(propertyid);
          break;
        case "delete":
          del(propertyid);
          break;
        case "approve":
          approve(propertyid);
          break;
        case "rejectReason":
          setPropertyKey(propertyid);
          setShowRejectReasonForm(true);
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
            handleActionSelect(action, row.propertyid, row.propertytypeid);
          }}
        >
          <option value="" disabled>
            Select Action
          </option>
          <option value="view">View</option>
          <option value="status">Status</option>
          <option value="update">Update</option>
          <option value="approve">Approve</option>
          <option value="rejectReason">Reject Reason</option>
          <option value="delete">Delete</option>
        </select>
      </div>
    );
  };

  return (
    <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="properties-table w-full h-[80vh] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
        <div className="w-full sm:min-w-[220px] sm:max-w-[230px] relative inline-block">
          <div className="flex gap-2 items-center justify-between bg-white border border-[#00000033] text-sm font-semibold  text-black rounded-lg py-1 px-3 focus:outline-none focus:ring-2 focus:ring-[#076300]">
            <span>{selectedPartner || "Select Partner"}</span>
            <RiArrowDropDownLine className="w-6 h-6 text-[#000000B2]" />
          </div>
          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            value={selectedPartner}
            onChange={(e) => {
              const action = e.target.value;
              setSelectedPartner(action);
            }}
          >
            <option value="Select Property Lister">
              Select Property Lister
            </option>
            <option value="Reparv Employee">Reparv Employee</option>
            <option value="Onboarding Partner">Onboarding Partner</option>
            <option value="Project Partner">Project Partner</option>
          </select>
        </div>
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
            columns={finalColumns}
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

      {/* Upload Images Form */}
      <div
        className={` ${
          showUploadImagesForm ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide fixed`}
      >
        <div className="w-[330px] sm:w-[500px] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Upload Images ( 600px / 360px )
            </h2>
            <IoMdClose
              onClick={() => {
                setShowUploadImagesForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <div className={`grid grid-cols-3 gap-2 mt-2`}>
            {propertyImages?.map((image, index) => {
              const imageUrl = `${URI}/uploads/${image.image}`;
              return (
                <div key={image.imageid} className="relative">
                  <img
                    src={imageUrl}
                    alt="Uploaded preview"
                    className={`w-full h-24 object-cover rounded-lg border ${
                      index === 0
                        ? "border-4 border-blue-500"
                        : "border-gray-300"
                    }`}
                  />
                  <button
                    onClick={() => {
                      deleteImages(image.imageid, image.propertyid);
                      if (propertyImages.length === 1) {
                        setPropertyImages([]);
                      }
                    }}
                    className="absolute w-6 h-6 top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
          <form
            onSubmit={addImages}
            className="w-full grid gap-4 place-items-center grid-cols-1"
          >
            <input
              type="hidden"
              value={propertyId || ""}
              onChange={(e) => {
                setPropertyId(e.target.value);
              }}
            />
            <div className="w-full">
              <div className="w-full mt-2">
                <input
                  type="file"
                  required
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="images"
                />
                <label
                  htmlFor="images"
                  className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                >
                  <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                    Upload Images
                  </span>
                  <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                    Browse
                  </div>
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {images.map((image, index) => {
                  const imageUrl = URL.createObjectURL(image);
                  return (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className={`w-full h-24 object-cover rounded-lg border ${
                          index === 0
                            ? "border-4 border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Upload Images
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      <div
        className={`${
          showAdditionalInfoForm ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide w-[400px] h-[75vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Additional Info</h2>
            <IoMdClose
              onClick={() => {
                setShowAdditionalInfoForm(false);
                // Clear form only after a successful response
                setNewAddInfo({
                  propertyid: "",
                  wing: "",
                  floor: "",
                  flatno: "",
                  direction: "",
                  ageofconstruction: "",
                  carpetarea: "",
                  superbuiltup: "",
                  salesprice: "",
                  description: "",
                  ownercontact: "",
                });
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={additionalInfo}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2">
              <input
                type="hidden"
                value={newAddInfo.propertyid || ""}
                onChange={(e) =>
                  setNewAddInfo({
                    ...newAddInfo,
                    propertyid: e.target.value,
                  })
                }
              />

              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Wing
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Wing"
                  value={newAddInfo.wing}
                  onChange={(e) =>
                    setNewAddInfo({ ...newAddInfo, wing: e.target.value })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Floor
                </label>
                <input
                  type="text"
                  placeholder="Enter Floor"
                  value={newAddInfo.floor}
                  onChange={(e) =>
                    setNewAddInfo({ ...newAddInfo, floor: e.target.value })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Flat No.
                </label>
                <input
                  type="number"
                  placeholder="Enter Flat No"
                  value={newAddInfo.flatno}
                  onChange={(e) =>
                    setNewAddInfo({ ...newAddInfo, flatno: e.target.value })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Direction
                </label>
                <input
                  type="text"
                  placeholder="Enter Direction"
                  value={newAddInfo.direction}
                  onChange={(e) =>
                    setNewAddInfo({ ...newAddInfo, direction: e.target.value })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Age of Construction
                </label>
                <input
                  type="number"
                  placeholder="Enter Construction Age"
                  value={newAddInfo.ageofconstruction}
                  onChange={(e) =>
                    setNewAddInfo({
                      ...newAddInfo,
                      ageofconstruction: e.target.value,
                    })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Carpet Area
                </label>
                <input
                  type="number"
                  placeholder="Enter Carpet Area"
                  value={newAddInfo.carpetarea}
                  onChange={(e) =>
                    setNewAddInfo({ ...newAddInfo, carpetarea: e.target.value })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Super Builtup
                </label>
                <input
                  type="number"
                  placeholder="Enter Builtup"
                  value={newAddInfo.superbuiltup}
                  onChange={(e) =>
                    setNewAddInfo({
                      ...newAddInfo,
                      superbuiltup: e.target.value,
                    })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Sales Price
                </label>
                <input
                  type="number"
                  placeholder="Enter Sales Price"
                  value={newAddInfo.salesprice}
                  onChange={(e) =>
                    setNewAddInfo({ ...newAddInfo, salesprice: e.target.value })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  value={newAddInfo.description}
                  onChange={(e) =>
                    setNewAddInfo({
                      ...newAddInfo,
                      description: e.target.value,
                    })
                  }
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div
                className={`${
                  propertyType === "Resale" ? "block" : "hidden"
                } w-full`}
              >
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Owner Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Contact Number"
                  value={newAddInfo.ownercontact}
                  onChange={(e) => {
                    const input = e.target.value;
                    if (/^\d{0,10}$/.test(input)) {
                      // Allows only up to 10 digits
                      setNewAddInfo({ ...newAddInfo, ownercontact: input });
                    }
                  }}
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div
                className={`${
                  propertyType === "Resale" ? "block" : "hidden"
                } w-full`}
              >
                <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                  Upload Owner Adhar
                </label>
                <div className="w-full mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={ownerAdharImageChange}
                    className="hidden"
                    id="ownerAdharImage"
                  />
                  <label
                    htmlFor="ownerAdharImage"
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
                {selectedOwnerAdharImage && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(selectedOwnerAdharImage)}
                      alt="Uploaded preview"
                      className="w-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeOwnerAdharImage}
                      className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div
                className={`${
                  propertyType === "Resale" ? "block" : "hidden"
                } w-full`}
              >
                <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                  Upload PanCard of Owner
                </label>
                <div className="w-full mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={ownerPanImageChange}
                    className="hidden"
                    id="ownerPanImage"
                  />
                  <label
                    htmlFor="ownerPanImage"
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
                {selectedOwnerPanImage && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(selectedOwnerPanImage)}
                      alt="Uploaded preview"
                      className="w-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeOwnerPanImage}
                      className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div
                className={`${
                  propertyType === "Resale" ? "block" : "hidden"
                } w-full`}
              >
                <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                  Upload Photo of Scheduled Property
                </label>
                <div className="w-full mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={scheduledPropertyImageChange}
                    className="hidden"
                    id="scheduledPropertyImageUpload"
                  />
                  <label
                    htmlFor="scheduledPropertyImageUpload"
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
                {selectedScheduledPropertyImage && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(selectedScheduledPropertyImage)}
                      alt="Uploaded preview"
                      className="w-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeScheduledPropertyImage}
                      className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <div
                className={`${
                  propertyType === "Resale" ? "block" : "hidden"
                } w-full`}
              >
                <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                  Upload Photo of Signed Documents
                </label>
                <div className="w-full mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={signedDocumentImageChange}
                    className="hidden"
                    id="signedDocumentImageUpload"
                  />
                  <label
                    htmlFor="signedDocumentImageUpload"
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
                {selectedSignedDocumentImage && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(selectedSignedDocumentImage)}
                      alt="Uploaded preview"
                      className="w-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeSignedDocumentImage}
                      className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <div
                className={`${
                  propertyType === "Resale" ? "block" : "hidden"
                } w-full`}
              >
                <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                  Upload Latest 7/12 | Property Card
                </label>
                <div className="w-full mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={satBaraImageChange}
                    className="hidden"
                    id="satBaraImageUpload"
                  />
                  <label
                    htmlFor="satBaraImageUpload"
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
                {selectedSatBaraImage && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(selectedSatBaraImage)}
                      alt="Uploaded preview"
                      className="w-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeSatBaraImage}
                      className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <div
                className={`${
                  propertyType === "Resale" ? "block" : "hidden"
                } w-full`}
              >
                <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                  Upload Latest Electricity Bill.
                </label>
                <div className="w-full mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={eBillImageChange}
                    className="hidden"
                    id="eBillImageChange"
                  />
                  <label
                    htmlFor="eBillImageChange"
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
                {selectedEBillImage && (
                  <div className="relative mt-2">
                    <img
                      src={URL.createObjectURL(selectedEBillImage)}
                      alt="Uploaded preview"
                      className="w-full object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={removeEBillImage}
                      className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowAdditionalInfoForm(false);
                  setNewAddInfo({
                    propertyid: "",
                    wing: "",
                    floor: "",
                    flatno: "",
                    direction: "",
                    ageofconstruction: "",
                    carpetarea: "",
                    superbuiltup: "",
                    salesprice: "",
                    description: "",
                    ownercontact: "",
                  });
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Add Info
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      {/* ADD Reject Reason Form */}
      <div
        className={` ${
          !showRejectReasonForm && "hidden"
        } z-[61] overflow-scroll scrollbar-hide flex fixed`}
      >
        <div className="w-[330px] h-[350px] sm:w-[600px] sm:h-[300px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[300px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Property Reject Reason
            </h2>
            <IoMdClose
              onClick={() => {
                setShowRejectReasonForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addRejectReason}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-1">
              <input
                type="hidden"
                value={propertyKey || ""}
                onChange={(e) => setPropertyKey(e.target.value)}
              />

              <div className={`w-full `}>
                <textarea
                  rows={2}
                  cols={40}
                  placeholder="Enter Reason"
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={rejectReason}
                  onChange={(e) => {
                    setRejectReason(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowRejectReasonForm(false);
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Add Reason
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
                value={property.propertyCategory}
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
                value={property.propertyName}
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
                Distance From City Center
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.distanceFromCityCenter}
                readOnly
              />
            </div>
            <div className={`${property.reraRegistered ? "block" : "hidden"}`}>
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Rera No.
              </label>
              <input
                type="text"
                disabled
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.reraRegistered}
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
                value={property.builtUpArea}
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Total Sales Price
              </label>
              <input
                type="number"
                disabled
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.totalSalesPrice}
                readOnly
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Total Offer Price
              </label>
              <input
                type="number"
                disabled
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={property.totalOfferPrice}
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
