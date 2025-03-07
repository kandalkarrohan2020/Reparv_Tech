import React from "react";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import ActionSelect from "../components/ActionSelect";
import CustomDateRangePicker from "../components/CustomDateRangePicker";
import FilterData from "../components/FilterData";
import { useAuth } from "../store/auth";
import AddButton from "../components/AddButton";
import { IoMdClose } from "react-icons/io";
import DataTable from "react-data-table-component";


const Properties = () => {
  const { setShowPropertyForm, showPropertyForm, action, URI } = useAuth();
  const [datas, setDatas] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProperty, setPropertyData] = useState({
    propertytypeid: "",
    project: "",
    address: "",
    location: "",
    rerano: "",
    area: "",
    sqft_price: "",
    extra: "",
   
  });
    

  //Fetch Property type
  const fetchPropertyType = async () => {
    try {
      const response = await fetch(URI+"/admin/propertytypes", {
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
  const fetchDatas = async () => {
    try {
      const response = await fetch(URI+"/admin/properties", {
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

  //Add or update record
  const add2 = async (e) => {
    e.preventDefault();
    
    const endpoint = newProperty.propertyid ? `edit/${newProperty.propertyid}` : "add";
    try {
        const response = await fetch(URI+`/admin/properties/${endpoint}`, {
        method: action === "update" ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProperty),
      });
      
      if (!response.ok) throw new Error("Failed to save property.");
      
      if( newProperty.propertyid){
        alert(`Property updated successfully!`);
      }else if(response.status === 202){
        alert(`Property already Exit!!`);
      }else{
        alert(`Property added successfully!`);
      }
      
      setPropertyData({
        propertytype: "",
        propertyname: "",
        location: "",
        price: "",
        description: "",
        status: ""
    });     
      setShowPropertyForm(false);
      fetchDatas();
    } catch (err) {
      console.error("Error saving :", err);
    }
  };
  
  const add = async (e) => {
    e.preventDefault();
  
    const endpoint = newProperty.propertyid ? `edit/${newProperty.propertyid}` : "add";
  
    try {
      const response = await fetch(`${URI}/admin/properties/${endpoint}`, {
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
        alert(newProperty.propertyid ? "Property updated successfully!" : "Property added successfully!");
      }
  
      // Clear form only after a successful response
      setPropertyData({
        propertytype: "",
        propertyname: "",
        location: "",
        price: "",
        description: "",
        status: "",
      });
  
      setShowPropertyForm(false);
      
      await fetchDatas(); // Ensure latest data is fetched
  
    } catch (err) {
      console.error("Error saving property:", err);
    }
  };
  //fetch data on form
  const edit = async (id) => {
    try {
      const response = await fetch(URI+`/admin/properties/${id}`, {
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
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      const response = await fetch(URI+`/admin/properties/delete/${id}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      if (response.ok) {
        alert("Property deleted successfully!");
        // Refresh employee list
        fetchDatas();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  // change status record
  const status = async (id) => {
    if (!window.confirm("Are you sure you want to change this property status?")) return;
    
    try {
      const response = await fetch(URI+`/admin/properties/status/${id}`, {
        method: "PUT",
      });
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      fetchDatas();
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  // change status record
  const approve = async (id) => {
    if (!window.confirm("Are you sure you want to approve this property?")) return;
    
    try {
      const response = await fetch(URI+`/admin/properties/approve/${id}`, {
        method: "PUT",
      });
      const data = await response.json();
      console.log(response);
      if (response.ok) {
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.message}`);
      }
      fetchDatas();
    } catch (error) {
      console.error("Error deleting :", error);
    }
  };

  useEffect(() => {
    fetchDatas();
    fetchPropertyType();
  }, []);
  

  const filteredData = datas.filter((item) =>
    item.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.rerano.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase()) 
  
  );
  const columns = [
    { name: "SN", selector: (row, index) => index + 1, sortable: true },
    { name: "Project", selector: (row) => row.project, sortable: true },
    { name: "Type", selector: (row) => row.propertytype, sortable: true },
    { name: "Builder", selector: (row) => row.company_name, sortable: true },
    { name: "Address", selector: (row) => row.address, sortable: true },
    { name: "Location", selector: (row) => row.location,sortable: true },
    { name: "Rera No.", selector: (row) => row.rerano,sortable: true },
    { name: "Area", selector: (row) => row.area,sortable: true },
    { name: "Price (Sq feet)", selector: (row) => row.sqft_price,sortable: true },
    { name: "Status", 
      cell: (row) => (
        <span className={`px-2 py-1 rounded-md ${row.status === "Active" ? "bg-[#EAFBF1] text-[#0BB501]" : "bg-[#FBE9E9] text-[#FF0000]"}`}>
          {row.status}
        </span>
      )},
      { name: "Approve", 
        cell: (row) => (
          <span className={`px-2 py-1 rounded-md ${row.approve === "Approved" ? "bg-[#EAFBF1] text-[#0BB501]" : "bg-[#FBE9E9] text-[#FF0000]"}`}>
            {row.approve}
          </span>
        )},
    { 
      name: "", 
      cell: (row) => 
        <ActionSelect 
          statusAction={() =>status(row.propertyid)}
          editAction={() =>edit(row.propertyid)}  // Dynamic edit route
          approveAction={() =>approve(row.propertyid)}
          deleteAction={() => del(row.propertyid)} // Delete function
          uploadAction={() => upload(row.propertyid)} // Delete function
        />
      
      
    }
  ];

  return (
    <>
      {!showPropertyForm ? (
        <>
          <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
            <div className="properties-table w-full h-[578px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
              {/* <p className="block md:hidden text-lg font-semibold">Properties</p>  */}
              <div className="searchBarContainer w-full flex flex-col sm:flex-row items-center justify-between gap-3">
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
                    <AddButton
                      label={"Add "}
                      func={setShowPropertyForm}
                    />
                  </div>
                </div>
              </div>
              <h2 className="text-[16px] font-semibold">Properties List</h2>
              <div className="overflow-scroll scrollbar-hide">
                <DataTable columns={columns} data={filteredData} pagination />
              </div>
            </div>
           
          </div>
        </>
      ) : (
        <div className="z-[61] property-form overflow-scroll scrollbar-hide w-[400px] h-[600px] md:w-[700px] md:h-[650px] flex fixed">
          <div className="w-[330px] sm:w-[600px] sm:h-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[650px] bg-white py-8 pb-16 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold">Property Details</h2>
              <IoMdClose
                onClick={() => {
                    setShowPropertyForm(false);
                }}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <form onSubmit={add} className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2">
              <input 
                type="hidden"
                value={newProperty.propertyid || ""}
                onChange={(e) => setPropertyData({ ...newProperty, propertyid: e.target.value })}
              />
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Property Type
                </label>
                <select
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
                  style={{ backgroundImage: "none" }}
                  value={newProperty.propertytypeid} 
                  onChange={(e) => setPropertyData({ ...newProperty, propertytypeid: e.target.value })}

                > 
                  <option value="">Select Property Type</option>
                  {propertyTypeData
                    .filter(propertyType => propertyType.status === "Active") // ✅ Only active types
                    .map((propertyType, index) => (
                      <option key={index} value={propertyType.propertytypeid}>
                        {propertyType.propertytype}
                      </option>
                  ))}
                </select>
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Project
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProperty.project}
                  onChange={(e) => setPropertyData({ ...newProperty, project: e.target.value })}
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProperty.address}
                  onChange={(e) => setPropertyData({ ...newProperty, address: e.target.value })}
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProperty.location}
                  onChange={(e) => setPropertyData({ ...newProperty, location: e.target.value })}
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Rera No.
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProperty.rerano}
                  onChange={(e) => setPropertyData({ ...newProperty, rerano: e.target.value })}
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Area
                </label>
                <input
                  type="number"
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProperty.area}
                  onChange={(e) => setPropertyData({ ...newProperty, area: e.target.value })}
                />
              </div>
              <div className="w-full">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Square Feet Price
                </label>
                <input
                  type="number"
                  placeholder="Enter Property Price"
                  className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProperty.sqft_price}
                  onChange={(e) => setPropertyData({ ...newProperty, sqft_price: e.target.value })}
                />
              </div>
              <div className="w-full ">
                <label className="block text-sm leading-4 text-[#00000066] font-medium">
                  Extra
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newProperty.extra}
                  onChange={(e) => setPropertyData({ ...newProperty, extra: e.target.value })}
                />
              </div>
                          
              
              <div className="flex mt-8 md:mt-6 justify-end gap-6">
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
                  {action}
                </button>
            </div>
            </form>
           
          </div>
        </div>
      )}
    </>
  );
};

export default Properties;
