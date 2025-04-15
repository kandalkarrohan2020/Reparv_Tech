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

const Properties = () => {
  const {
    setShowPropertyForm,
    showPropertyForm,
    showUploadImagesForm,
    setShowUploadImagesForm,
    showAdditionalInfoForm,
    setShowAdditionalInfoForm,
    showPropertyInfo, setShowPropertyInfo,
    URI,
    setLoading,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [builderData, setBuilderData] = useState([]);
  const [property, setProperty] = useState({});
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
  });
  const [newProperty, setPropertyData] = useState({
    image: "",
    builderid: "",
    propertytypeid: "",
    property_name: "",
    address: "",
    city: "",
    location: "",
    rerano: "",
    area: "",
    sqft_price: "",
    extra: "",
    videourl: "",
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

  //Fetch Builder
  const fetchBuilder = async () => {
    try {
      const response = await fetch(URI + "/partner/builders/active", {
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
      const response = await fetch(URI + "/partner/properties", {
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

  const add = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("builderid", newProperty.builderid);
    formData.append("propertytypeid", newProperty.propertytypeid);
    formData.append("property_name", newProperty.property_name);
    formData.append("address", newProperty.address);
    formData.append("city", newProperty.city);
    formData.append("location", newProperty.location);
    formData.append("rerano", newProperty.rerano);
    formData.append("area", newProperty.area);
    formData.append("sqft_price", newProperty.sqft_price);
    formData.append("extra", newProperty.extra);
    formData.append("videourl", newProperty.videourl);
    if (selectedImage) {
      formData.append("image", selectedImage); // Attach the image file
    }

    const endpoint = newProperty.propertyid
      ? `edit/${newProperty.propertyid}`
      : "add";

    try {
      setLoading(true);
      const response = await fetch(`${URI}/partner/properties/${endpoint}`, {
        method: newProperty.propertyid ? "PUT" : "POST",
        credentials: "include",
        body: formData, // Use FormData instead of JSON
      });

      if (response.status === 409) {
        alert("Property already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        alert(
          newProperty.propertyid
            ? "Property updated successfully!"
            : "Property added successfully!"
        );
      }

      // Clear form after successful response
      setPropertyData({
        builderid: "",
        propertytypeid: "",
        property_name: "",
        address: "",
        city: "",
        location: "",
        rerano: "",
        area: "",
        sqft_price: "",
        extra: "",
      });

      setShowPropertyForm(false);
      await fetchData(); // Ensure latest data is fetched
    } catch (err) {
      console.error("Error saving property:", err);
    } finally {
      setLoading(false);
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/partner/properties/${id}`, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch property.");
      const data = await response.json();
      setPropertyData(data);
      setShowPropertyForm(true);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  //fetch data on form
  const viewProperty = async (id) => {
    try {
      const response = await fetch(URI + `/partner/properties/${id}`, {
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
      const response = await fetch(`${URI}/partner/properties/images/${id}`, {
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
        `${URI}/partner/properties/images/delete/${id}`,
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
      const response = await fetch(URI + `/partner/properties/${id}`, {
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
      const response = await fetch(`${URI}/partner/properties/addimages`, {
        method: "POST",
        credentials: "include",
        body: formData, // FormData allows file uploads
      });

      if (response.status === 409) {
        alert("Property already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
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
        URI + `/partner/properties/propertyinfo/${id}`,
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

    const endpoint = newAddInfo.propertyinfoid
      ? `editadditionalinfo/${newAddInfo.propertyinfoid}`
      : "additionalinfoadd";

    try {
      setLoading(true);
      const response = await fetch(`${URI}/partner/properties/${endpoint}`, {
        method: newAddInfo.propertyinfoid ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddInfo),
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
      });

      setShowAdditionalInfoForm(false);

      await fetchData(); // Ensure latest data is fetched
    } catch (err) {
      console.error("Error saving property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBuilder();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rerano.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: false, width:"50px" },
    {
      name: "Image",
      cell: (row) => (
        <div
          className={`w-full h-14 overflow-hidden flex items-center justify-center`}
        >
          <img
            src={`${URI}${row.image}`}
            alt="Image"
            onClick={()=>viewProperty(row.propertyid)}
            className="w-full h-[90%] object-cover"
          />
        </div>
      ),
    },
    { name: "Name", selector: (row) => row.property_name, sortable: true },
    { name: "Builder", selector: (row) => row.company_name, sortable: true, minWidth:"100px" },
    { name: "Type", selector: (row) => row.propertytypeid, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "city", selector: (row) => row.city, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Rera No.", selector: (row) => row.rerano, sortable: true, minWidth:"130px"},
    { name: "Area", selector: (row) => row.area, sortable: true },
    { name: "Price Sqft", selector: (row) => row.sqft_price, sortable: true },
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
        case "add_images":
          openImages(propertyid);
          fetchImages(propertyid);
          break;
        case "additionalinfo":
          openAdditionalInfo(propertyid);
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
          <option value="add_images">Add Images</option>
          <option value="additionalinfo">Additional Info</option>
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

      <div
        className={`${
          showPropertyForm ? "flex" : "hidden"
        } z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[70vh] md:w-[700px] fixed`}
      >
        <div className="w-[330px] sm:w-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Property Details</h2>
            <IoMdClose
              onClick={() => {
                setShowPropertyForm(false);
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
              value={newProperty.propertyid || ""}
              onChange={(e) =>
                setPropertyData({
                  ...newProperty,
                  propertyid: e.target.value,
                })
              }
            />
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Builder/Company
              </label>
              <select
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                style={{ backgroundImage: "none" }}
                value={newProperty.builderid}
                onChange={(e) =>
                  setPropertyData({
                    ...newProperty,
                    builderid: e.target.value,
                  })
                }
              >
                <option value="">Select Builder/Company</option>
                {builderData
                  .filter((builder) => builder.status === "Active") // ✅ Only active types
                  .map((builder, index) => (
                    <option key={index} value={builder.builderid}>
                      {builder.company_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Property Type
              </label>
              <select
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                style={{ backgroundImage: "none" }}
                value={newProperty.propertytypeid}
                onChange={(e) =>
                  setPropertyData({
                    ...newProperty,
                    propertytypeid: e.target.value,
                  })
                }
              >
               <option value="">Select Property Type</option>
                <option value="Flat">New Flat</option>
                <option value="Plot">New Plot</option>
                <option value="Rental">Rental</option>
                <option value="Resale">Resale</option>
                <option value="RowHouse">Row House</option>
                <option value="Lease">Lease</option>
                <option value="FarmHouse">Farm House</option> 
              </select>
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Property Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter Property Name"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.property_name}
                onChange={(e) =>
                  setPropertyData({
                    ...newProperty,
                    property_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Address
              </label>
              <input
                type="text"
                required
                placeholder="Enter Address"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.address}
                onChange={(e) =>
                  setPropertyData({ ...newProperty, address: e.target.value })
                }
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                City
              </label>
              <input
                type="text"
                required
                placeholder="Enter City"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.city}
                onChange={(e) =>
                  setPropertyData({
                    ...newProperty,
                    city: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Location
              </label>
              <input
                type="text"
                required
                placeholder="Enter Location"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.location}
                onChange={(e) =>
                  setPropertyData({
                    ...newProperty,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Rera No.
              </label>
              <input
                type="text"
                placeholder="Enter Rera No."
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.rerano}
                onChange={(e) => {
                  const input = e.target.value.toUpperCase(); // Convert to uppercase
                  if (/^[A-Z0-9]{0,10}$/.test(input)) {
                    setPropertyData({ ...newProperty, rerano: input });
                  }
                }}
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Area
              </label>
              <input
                type="number"
                required
                placeholder="Enter Area in Sq.ft"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.area}
                onChange={(e) =>
                  setPropertyData({ ...newProperty, area: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Square Feet Price
              </label>
              <input
                type="number"
                required
                placeholder="Enter Price Per Sqft"
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.sqft_price}
                onChange={(e) =>
                  setPropertyData({
                    ...newProperty,
                    sqft_price: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Extra
              </label>
              <input
                type="text"
                placeholder="Enter Extra Details"
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.extra}
                onChange={(e) =>
                  setPropertyData({ ...newProperty, extra: e.target.value })
                }
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Video Link
              </label>
              <input
                type="text"
                placeholder="Enter Video Link"
                required
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newProperty.videourl}
                onChange={(e) =>
                  setPropertyData({ ...newProperty, videourl: e.target.value })
                }
              />
            </div>
            <div className="w-full">
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
            <div></div>
            <div className="flex h-10 mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowPropertyForm(false);
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

      {/* Upload Images Form */}
      <div
        className={` ${
          showUploadImagesForm ? "flex" : "hidden"
        } z-[61] overflow-scroll scrollbar-hide fixed`}
      >
        <div className="w-[330px] sm:w-[500px] max-h-[700px] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Upload Images</h2>
            <IoMdClose
              onClick={() => {
                setShowUploadImagesForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <div className={`${propertyImages.length === 0? "hidden" : "grid"} grid grid-cols-3 gap-2 mt-2`}>
            {
              propertyImages?.map((image, index) => {
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
                        if(propertyImages.length === 1){
                          if (propertyImages.length === 1) {
                            setPropertyImages([]);
                          }
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
                        className="absolute w-6 h-6 top-1 right-1 bg-red-500 text-white text-xs p-1 rounded-full"
                      >
                        ✕
                      </button>
                      {index === 0 && (
                        <p className="text-xs text-blue-500 text-center mt-1">
                          Main Image
                        </p>
                      )}
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
              <Loader></Loader>
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
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form
            onSubmit={additionalInfo}
            className="w-full grid gap-4 place-items-center grid-cols-1 lg:grid-cols-2"
          >
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
                  setNewAddInfo({ ...newAddInfo, superbuiltup: e.target.value })
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
                  setNewAddInfo({ ...newAddInfo, description: e.target.value })
                }
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex mt-8 md:mt-6 justify-end gap-6">
              <button
                type="button"
                onClick={() => {
                  setShowAdditionalInfoForm(false);
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Properties;
