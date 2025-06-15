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
import { useLocation } from "react-router-dom";
import propertyPicture from "../assets/propertyPicture.svg";

const Properties = () => {
  const location = useLocation();
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
    showSeoForm,
    setShowSeoForm,
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
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [builderData, setBuilderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyImages, setPropertyImages] = useState([]);
  const [file, setFile] = useState(null);
  const [newAddInfo, setNewAddInfo] = useState({
    propertyid: "",
  });
  const [seoTittle, setSeoTittle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [newProperty, setPropertyData] = useState({
    builderid: "",
    propertyCategory: "",
    propertyApprovedBy: "",
    propertyName: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
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
    locationFeature: "",
    sizeAreaFeature: "",
    parkingFeature: "",
    terraceFeature: "",
    ageOfPropertyFeature: "",
    furnishingFeature: "",
    amenitiesFeature: "",
    propertyStatusFeature: "",
    floorNumberFeature: "",
    smartHomeFeature: "",
    securityBenefit: "",
    primeLocationBenefit: "",
    rentalIncomeBenefit: "",
    qualityBenefit: "",
    capitalAppreciationBenefit: "",
    ecofriendlyBenefit: "",
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
      const response = await fetch(
        `${URI}/admin/cities/${newProperty?.state}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch cities.");
      const data = await response.json();
      console.log(data);
      setCities(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
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
          credentials: "include", //  Ensures cookies are sent
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

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
        method: "GET",
        credentials: "include", //  Ensures cookies are sent
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

  //fetch data on form
  const showSEO = async (id) => {
    try {
      const response = await fetch(URI + `/admin/properties/${id}`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setSeoTittle(data.seoTittle);
      setSeoDescription(data.seoDescription);
      setShowSeoForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  // Add Or Update SEO Details Tittle , Description
  const addSeoDetails = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        URI + `/admin/properties/seo/${propertyKey}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ seoTittle, seoDescription }),
        }
      );
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      setShowSeoForm(false);
      setSeoTittle("");
      setSeoDescription("");
      await fetchData();
    } catch (error) {
      console.error("Error adding Seo Details reason:", error);
    } finally {
      setLoading(false);
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
        credentials: "include", // Ensures cookies are sent
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

  // Add Additional Info as a CSV File
  const addCsv = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("csv", file);
    formData.append("propertyid", propertyKey);

    try {
      const response = await fetch(
        `${URI}/admin/properties/additionalinfo/csv/add`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.error("Server responded with an error:", data);
        alert(data.message || "CSV upload failed due to a server error.");
        return;
      }

      alert(data.message || "CSV uploaded successfully.");
      setShowAdditionalInfoForm(false);
      setFile(null); // Clear selected file
    } catch (error) {
      console.error("Upload error:", error);
      alert("An unexpected error occurred while uploading the CSV file.");
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
    fetchStates();
    fetchBuilder();
  }, []);

  useEffect(() => {
    if (newProperty.state != "") {
      fetchCities();
    }
  }, [newProperty.state]);

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
        let imageSrc = propertyPicture;

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
                window.open(
                  "https://www.reparv.in/property-info/" + row.propertyid,
                  "_blank"
                );
              }}
              className="w-full h-[90%] object-cover cursor-pointer"
            />
          </div>
        );
      },
      width: "130px",
    },
    { name: "Date & Time", selector: (row) => row.updated_at, width: "200px" },
    {
      name: "Property Name",
      selector: (row) => row.propertyName,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Builder",
      selector: (row) => row.company_name,
      sortable: true,
      minWidth: "150px",
    },
    {
      name: "Property Lister",
      cell: (row) => (
        <div className="flex flex-col gap-[2px]">
          <span>{row.fullname}</span>
          <span> {row.contact}</span>
          <span> {row.partnerCity}</span>
        </div>
      ),
      omit: false,
      sortable: true,
      minWidth: "180px",
    },
    {
      name: "Category",
      selector: (row) => row.propertyCategory,
      width: "150px",
    },
    {
      name: "State",
      selector: (row) => row.state,
      sortable: true,
      minWidth: "200px",
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
      width: "150px",
    },
    { name: "Pin Code", selector: (row) => row.pincode, width: "120px" },
    { name: "Location", selector: (row) => row.location, width: "150px" },
    { name: "Address", selector: (row) => row.address, width: "250px" },
    { name: "Rera No.", selector: (row) => row.reraRegistered, width: "150px" },
    {
      name: "Area",
      selector: (row) => row.builtUpArea,
      sortable: true,
      width: "120px",
    },
    {
      name: "Price",
      selector: (row) => row.totalOfferPrice,
      sortable: true,
      width: "150px",
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
      width: "120px",
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
      width: "120px",
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
          window.open(
            "https://www.reparv.in/property-info/" + propertyid,
            "_blank"
          );
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
        case "SEO":
          setPropertyKey(propertyid);
          showSEO(propertyid);
          break;
        case "rejectReason":
          setPropertyKey(propertyid);
          setShowRejectReasonForm(true);
          break;
        case "additionalinfo":
          setPropertyKey(propertyid);
          setShowAdditionalInfoForm(true);
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
          {row.propertyCategory === "NewFlat" ||
          row.propertyCategory === "NewPlot" ||
          row.propertyCategory === "CommercialFlat" ||
          row.propertyCategory === "CommercialPlot" ? (
            <option value="additionalinfo">Additional Info</option>
          ) : (
            <></>
          )}
          <option value="SEO">SEO Details</option>
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
            <option value="Guest User">Guest User</option>
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
        states={states}
        cities={cities}
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
        } z-[61] overflow-scroll scrollbar-hide w-[400px] min-h-[250px] max:h-[75vh] md:w-[450px] fixed`}
      >
        <div className="w-[350px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">
              Additional Information
            </h2>
            <IoMdClose
              onClick={() => {
                setShowAdditionalInfoForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addCsv}>
            <div className="w-full grid gap-4 place-items-center grid-cols-1">
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

              <div className="w-full mt-2">
                <input
                  type="file"
                  required
                  accept=".csv"
                  multiple
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="csvFile"
                />
                <label
                  htmlFor="csvFile"
                  className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
                >
                  <span className="m-3 p-2 overflow-hidden text-[16px] font-medium text-[#00000066]">
                    {file ? file.name : "Upload File"}
                  </span>
                  <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                    Browse
                  </div>
                </label>
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-center gap-6">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Add CSV File
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      {/* ADD SEO Details */}
      <div
        className={` ${
          !showSeoForm && "hidden"
        } z-[61] overflow-scroll scrollbar-hide flex fixed`}
      >
        <div className="w-[330px] h-[55vh] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">SEO Details</h2>
            <IoMdClose
              onClick={() => {
                setShowSeoForm(false);
                setSeoTittle("");
                setSeoDescription("");
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form onSubmit={addSeoDetails}>
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
                  placeholder="Enter Tittle"
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={seoTittle}
                  onChange={(e) => setSeoTittle(e.target.value)}
                />
              </div>
              <div className={`w-full `}>
                <textarea
                  rows={4}
                  cols={40}
                  placeholder="Enter Description"
                  required
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowSeoForm(false);
                  setSeoTittle("");
                  setSeoDescription("");
                }}
                className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
              >
                Add SEO Details
              </button>
              <Loader></Loader>
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
    </div>
  );
};

export default Properties;
