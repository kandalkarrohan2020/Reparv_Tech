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

const Properties = () => {
  const {
    setShowPropertyForm,
    showPropertyForm,
    showUploadImagesForm,
    setShowUploadImagesForm,
    URI,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [builderData, setBuilderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      const response = await fetch(URI + "/employee/builders/active", {
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

  //Fetch Property type
  const fetchPropertyType = async () => {
    try {
      const response = await fetch(URI + "/employee/propertytypes/active", {
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

  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/employee/properties", {
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
    if (selectedImage) {
      formData.append("image", selectedImage); // Attach the image file
    }
  
    const endpoint = newProperty.propertyid
      ? `edit/${newProperty.propertyid}`
      : "add";
  
    try {
      const response = await fetch(`${URI}/employee/properties/${endpoint}`, {
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
    }
  };

  //Add or update record
  const add2 = async (e) => {
    e.preventDefault();

    const endpoint = newProperty.propertyid
      ? `edit/${newProperty.propertyid}`
      : "add";

    try {
      const response = await fetch(`${URI}/employee/properties/${endpoint}`, {
        method: newProperty.propertyid ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProperty),
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

      // Clear form only after a successful response
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
    }
  };

  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI + `/employee/properties/${id}`, {
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

  // Delete record
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      const response = await fetch(URI + `/employee/properties/delete/${id}`, {
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
    }
  };

  // change status record
  const status = async (id) => {
    if (
      !window.confirm("Are you sure you want to change this property status?")
    )
      return;

    try {
      const response = await fetch(URI + `/employee/properties/status/${id}`, {
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
      const response = await fetch(URI + `/employee/properties/approve/${id}`, {
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

  useEffect(() => {
    fetchData();
    fetchPropertyType();
    fetchBuilder();
  }, []);

  const filteredData = datas.filter(
    (item) =>
      item.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rerano.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    { name: "Image", cell: (row) => (
      <div
        className={`h-12 overflow-hidden`}
      >
       <img src={`${URI}${row.image}`} alt="Image" className="h-full"/>
      </div>
    ), },
    { name: "Builder", selector: (row) => row.company_name, sortable: true },
    { name: "Type", selector: (row) => row.propertytype, sortable: true },
    { name: "Name", selector: (row) => row.property_name, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "city", selector: (row) => row.city, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Rera No.", selector: (row) => row.rerano, sortable: true },
    { name: "Area", selector: (row) => row.area, sortable: true },
    { name: "Price Sqft", selector: (row) => row.sqft_price, sortable: true },
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
              : "bg-[#FBE9E9] text-[#FF0000]"
          }`}
        >
          {row.approve}
        </span>
      ),
    },
    {
      name: "",
      cell: (row) => <ActionDropdown row={row} />,
    },
  ];

  //Property Image Uploader
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const uploadImages = () => {
    console.log("Upload Images");
  };

  const ActionDropdown = ({ row }) => {
    const [selectedAction, setSelectedAction] = useState("");

    const handleActionSelect = (action, propertyid) => {
      switch (action) {
        case "status":
          status(propertyid);
          break;
        case "update":
          edit(propertyid);
          break;
        case "delete":
          del(propertyid);
          break;
        case "add_images":
          setShowUploadImagesForm(true);
          break;
        case "approve":
          approve(propertyid);
          break;
        case "additionalinfo":
          additionalInfo(propertyid);
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
          <option value="status">Status</option>
          <option value="update">Update</option>
          <option value="add_images">Add Images</option>
          <option value="additionalinfo">Additional Info</option>
          <option value="approve">Approve</option>
          <option value="delete">Delete</option>
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
          <DataTable columns={columns} data={filteredData} pagination />
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
                {propertyTypeData
                  .filter((propertyType) => propertyType.status === "Active") // ✅ Only active types
                  .map((propertyType, index) => (
                    <option key={index} value={propertyType.propertytypeid}>
                      {propertyType.propertytype}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Property Name
              </label>
              <input
                type="text"
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
                onChange={(e) =>
                  setPropertyData({ ...newProperty, rerano: e.target.value })
                }
              />
            </div>
            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Area
              </label>
              <input
                type="number"
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
                    src={(URL.createObjectURL(selectedImage))}
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

            <div className="flex h-10 mt-8 md:mt-6 justify-end gap-6">
              <button
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
        <div className="w-[330px] sm:w-[500px] overflow-scroll scrollbar-hide bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">Upload Images</h2>
            <IoMdClose
              onClick={() => {
                setShowUploadImagesForm(false);
              }}
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <form
            onSubmit={uploadImages}
            className="w-full grid gap-4 place-items-center grid-cols-1"
          >
            <div className="w-full">
              <div className="w-full mt-2">
                <input
                  type="file"
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Properties;
