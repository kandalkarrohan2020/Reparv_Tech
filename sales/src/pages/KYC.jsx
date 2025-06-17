import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

export default function KYC() {
  const navigate = useNavigate();
  const {
    URI,
    user,
    setLoading,
  } = useAuth();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [userData, setUserData] = useState({
    fullname: "",
    contact: "",
    email: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    experience: "",
    adharno: "",
    panno: "",
    rerano: "",
    ifsc: "",
    bankname: "",
    accountnumber: "",
    accountholdername: "",
  });

  const [imageFiles, setImageFiles] = useState({
    adharImage: null,
    panImage: null,
    reraImage: null,
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
      const response = await fetch(`${URI}/admin/cities/${userData?.state}`, {
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

  //fetch data on form
  const showDetails = async () => {
    try {
      const response = await fetch(URI + `/admin/salespersons/${user.id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Sales Persons.");
      const data = await response.json();
      setUserData(data);
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
    if (imageFiles.adharImage)
      formData.append("adharImage", imageFiles.adharImage);
    if (imageFiles.panImage) formData.append("panImage", imageFiles.panImage);
    if (imageFiles.reraImage)
      formData.append("reraImage", imageFiles.reraImage);

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
        alert("Login Again!");
        navigate("/", { replace: true });
        setUserData({
          fullname: "",
          contact: "",
          email: "",
          address: "",
          state: "",
          city: "",
          pincode: "",
          experience: "",
          adharno: "",
          panno: "",
          rerano: "",
          ifsc: "",
          bankname: "",
          accountnumber: "",
          accountholdername: "",
        });
      }
    } catch (err) {
      console.error("Error saving Sales Person:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showDetails();
    fetchStates();
  }, []);

  useEffect(() => {
    if (userData.state != "") {
      fetchCities();
    }
  }, [userData.state]);

  return (
    <div className="w-full h-screen bg-white py-8 px-4 sm:px-8 border border-[#cfcfcf33] rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">
          Enter Details to Start Your Journey
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full p-1 pb-10 max-h-[85vh] overflow-scroll scrollbar-hide"
      >
        <h2 className="text-[15px] font-semibold mb-2">Step: 1 Bank Details</h2>
        <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-4">
          <input
            type="hidden"
            value={userData.salespersonsid || ""}
            onChange={(e) =>
              setUserData({ ...userData, salespersonsid: e.target.value })
            }
          />

          <div className="w-full ">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Bank Name <span className="text-red-600">*</span>
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
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>

          <div className="w-full ">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Account Holder Name <span className="text-red-600">*</span>
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
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Account Number <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="Enter Account Number"
              value={userData.accountnumber}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,17}$/.test(input)) {
                  setUserData({ ...userData, accountnumber: input });
                }
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>

          <div className="w-full ">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              IFSC Code of Your Bank <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter IFSC Code"
              value={userData.ifsc}
              onChange={(e) => {
                const input = e.target.value.toUpperCase(); // Convert to uppercase
                if (/^[A-Z0-9]{0,11}$/.test(input)) {
                  setUserData({ ...userData, ifsc: input });
                }
              }}
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>
        </div>
        <h2 className="text-[15px] font-semibold mb-2">
          Step: 2 Address Details
        </h2>
        <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-4">
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Address <span className="text-red-600">*</span>
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
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
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
              value={userData.state}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  state: e.target.value,
                })
              }
            >
              <option value="">Select Your State</option>
              {states.map((state, index) => (
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
              value={userData.city}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  city: e.target.value,
                })
              }
            >
              <option value="">Select Your City</option>
              {cities.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Pin-Code <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="Enter Pin-Code"
              value={userData.pincode}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,6}$/.test(input)) {
                  setUserData({ ...userData, pincode: input });
                }
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>
        </div>

        <h2 className="flex flex-wrap items-center gap-2 text-[15px] font-semibold pb-4">
          <span>Step: 3 Other Details & Proof of Documents</span>{" "}
          <span className="sm:ml-2 text-red-600 text-xs">
            ( Max Image size 100kb )
          </span>
        </h2>
        <div className="w-full grid gap-4 place-items-center grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mb-4">
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Adhar Card Number <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="Enter Adhar Number"
              value={userData.adharno}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,12}$/.test(input)) {
                  setUserData({ ...userData, adharno: input });
                }
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>

          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Pan Card Number <span className="text-red-600">*</span>
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
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
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
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Experience <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter Experience"
              value={userData.experience}
              onChange={(e) => {
                setUserData({
                  ...userData,
                  experience: e.target.value,
                });
              }}
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
            />
          </div>

          {/* Aadhaar Image Upload */}
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium mb-2">
              Upload Aadhaar Card Image <span className="text-red-600">*</span>
            </label>
            <div className="w-full max-h-[200px] mt-2">
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
              Upload PAN Card Image <span className="text-red-600">*</span>
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

        <div className="w-full flex mt-8 md:mt-8 justify-end gap-6">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="px-6 py-3 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-white bg-[#076300] rounded active:scale-[0.98]"
          >
            Save
          </button>
          <Loader />
        </div>
      </form>
    </div>
  );
}
