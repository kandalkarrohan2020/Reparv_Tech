import { useState, useEffect } from "react";
import Loader from "../Loader";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../store/auth";

export default function KYC() {
  const {
    URI,
    user,
    setLoading,
    showKYC,
    setShowKYC,
    setShowSiteVisitPopup,
    propertyImage,
    setShowSuccess,
  } = useAuth();

  const [userData, setUserData] = useState({
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

  const [imageFiles, setImageFiles] = useState({
    adharImage: null,
    panImage: null,
  });

  const handleImageChange = (event, category) => {
    const file = event.target.files[0];
    if (!file) return;

    setImageFiles((prev) => ({
      ...prev,
      [category]: file,
    }));
  };

  const removeImage = (category) => {
    setImageFiles((prev) => ({
      ...prev,
      [category]: null,
    }));
  };

  //fetch data on form
  const showDetails = async () => {
    try {
      const response = await fetch(URI + `/admin/salespersons`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Sales Persons.");
      const data = await response.json();
      console.log(data);
      setUserData(data);
      setShowKYC(true);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (adharImage) formData.append("adharImage", adharImage);
    if (panImage) formData.append("panImage", panImage);
    if (reraImage) formData.append("reraImage", reraImage);

    try {
      setLoading(true);
      const response = await fetch(
        `${URI}/admin/salespersons/edit/${userData.salespersonsid}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (response.status === 409) {
        alert("Sales Person already exists!");
      } else if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        alert("Data SuccessFully Send For KYC!");

        userData({
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

        setShowKYC(false);
      }
    } catch (err) {
      console.error("Error saving Sales Person:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showDetails();
  }, []);

  return (
    
      <div className="w-full sm:w-[600px] lg:w-[700px] xl:w-[1000px] bg-white py-8 px-4 sm:px-8 border border-[#cfcfcf33] rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">KYC Details</h2>
          <IoMdClose
            onClick={() => {
              setShowKYC(false);
            }}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-full p-1 h-[80vh] sm:max-h-[60vh] pb-10 overflow-scroll scrollbar-hide">
          <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
            <input
              type="hidden"
              value={userData.salespersonsid || ""}
              onChange={(e) =>
                setUserData({ ...userData, salespersonsid: e.target.value })
              }
            />

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Bank Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter Bank Name"
                value={userData.bankname}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    bankname: e.target.value,
                  });
                }}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Account Holder Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter Account Holder Name"
                value={userData.accountholdername}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    accountholdername: e.target.value,
                  });
                }}
                className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Account Number
              </label>
              <input
                type="text"
                required
                placeholder="Enter Account Number"
                value={userData.contact}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    // Allows only up to 10 digits
                    setUserData({ ...userData, contact: input });
                  }
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="w-full ">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                IFSC Code of Your Bank
              </label>
              <input
                type="text"
                required
                placeholder="Enter IFSC Code"
                value={userData.ifsc}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    ifsc: e.target.value,
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
                value={userData.address}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    address: e.target.value,
                  });
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                State
              </label>
              <input
                type="text"
                required
                placeholder="Enter Your State"
                value={userData.state}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    state: e.target.value,
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
                value={userData.city}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    city: e.target.value,
                  });
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium">
                Pin-Code
              </label>
              <input
                type="text"
                required
                placeholder="Enter Pin-Code"
                value={userData.pincode}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    pincode: e.target.value,
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
                value={userData.experience}
                onChange={(e) => {
                  setNewSalesPerson({
                    ...userData,
                    experience: e.target.value,
                  });
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
                value={userData.adharno}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,12}$/.test(input)) {
                    // Allows only up to 12 digits
                    setUserData({ ...userData, adharno: input });
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
                value={userData.panno}
                onChange={(e) => {
                  const input = e.target.value.toUpperCase(); // Convert to uppercase
                  if (/^[A-Z0-9]{0,10}$/.test(input)) {
                    setUserData({ ...userData, panno: input });
                  }
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
                value={userData.rerano}
                onChange={(e) => {
                  const input = e.target.value.toUpperCase(); // Convert to uppercase
                  if (/^[A-Z0-9]{0,10}$/.test(input)) {
                    setUserData({ ...userData, rerano: input });
                  }
                }}
                className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Aadhaar Image Upload */}
            <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Upload Aadhaar Card Image
              </label>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "adharImage")}
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
              {imageFiles.adharImage && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(imageFiles.adharImage)}
                    alt="Aadhaar Preview"
                    className="w-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("adharImage")}
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
                Upload PAN Card Image
              </label>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "panImage")}
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
              {imageFiles.panImage && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(imageFiles.panImage)}
                    alt="PAN Preview"
                    className="w-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("panImage")}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

          {/* Aadhaar Image Upload */}
          <div className="w-full">
              <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
                Upload Rera Image
              </label>
              <div className="w-full mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, "reraImage")}
                  className="hidden"
                  id="reraImageUpload"
                />
                <label
                  htmlFor="reraImageUpload"
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
              </div>

              {/* Preview Section */}
              {imageFiles.reraImage && (
                <div className="relative mt-2">
                  <img
                    src={URL.createObjectURL(imageFiles.reraImage)}
                    alt="Rera Preview"
                    className="w-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage("reraImage")}
                    className="absolute top-1 right-1 bg-red-500 text-white text-sm px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

          <div className="w-full flex mt-8 md:mt-6 justify-end gap-6">
            <button
              type="button"
              onClick={() => {
                setShowKYC(false);
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
            <Loader />
          </div>
        </form>
      </div>
    
  );
}
