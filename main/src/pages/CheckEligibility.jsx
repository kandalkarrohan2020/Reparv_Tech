import { useState, useEffect } from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { useAuth } from "../store/auth";
function CheckEligibility() {
  const { URI } = useAuth();
  const [activeTab, setActiveTab] = useState("Job");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  //Inquiry Form Data
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    state: "",
    city: "",
    minbudget: "",
    maxbudget: "",
  });

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
      const response = await fetch(`${URI}/admin/cities/${formData?.state}`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${URI}/frontend/enquiry/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        setSuccessScreen({
          show: true,
          label: "Thank You For Registering!",
          description: "Our Representative will call you shortly",
        });
        setShowSiteVisitPopup(false);
      }

      // Clear form after success
      setFormData({
        ...formData,
        propertyid: propertyId,
        fullname: "",
        phone: "",
        state: "",
        city: "",
        minbudget: "",
        maxbudget: "",
      });
    } catch (err) {
      console.error("Error Booking Property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (formData.state != "") {
      fetchCities();
    }
  }, [formData.state]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex gap-2 items-center justify-center mb-6 text-base font-medium text-gray-900">
        <IoSpeedometerOutline />{" "}
        <span className="text-sm">Get FREE CIBIL score with your offer!</span>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-4 md:gap-10 justify-start md:justify-center mb-6">
        <button
          className={`md:w-[400px] px-8 py-1 border rounded-md font-semibold ${
            activeTab === "Job"
              ? "bg-[#0ab50192] text-black"
              : "bg-white text-gray-500"
          }`}
          onClick={() => setActiveTab("Job")}
        >
          Job
        </button>
        <button
          className={`md:w-[400px] px-8 py-1 border rounded-md font-semibold ${
            activeTab === "Business"
              ? "bg-[#0ab50192] text-black"
              : "bg-white text-gray-500"
          }`}
          onClick={() => setActiveTab("Business")}
        >
          Business
        </button>
      </div>
      {/* Form */}
      <form>
        <h2 className="text-xl font-semibold mb-1">
          Let’s get started with your EMI offer
        </h2>
        <p className="text-[#067700] font-semibold text-sm mb-4">
          Step 1 : Personal details
        </p>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf]">
            <label className="ml-1 text-xs">Full Name* (As per pan card)</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
            <label className="ml-1 text-xs">Date of Birth (D.O.B.)</label>
            <input
              type="text"
              placeholder="Enter Date of Birth"
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0"
            />
          </div>

          <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
            <label className="ml-1 text-xs">Contact No.</label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0"
            />
          </div>

          {/* State Select Input */}
          <div className="flex flex-col gap-1 text-sm font-semibold text-[#00000066]">
            <label htmlFor="state" className="ml-1 text-xs text-[#000000bf]">
              Select State
            </label>
            <select
              name="state"
              id="state"
              required
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0 appearance-none"
              style={{ backgroundImage: "none" }}
              value={formData.state}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  state: e.target.value,
                })
              }
            >
              <option value="">Select Your State</option>
              {states?.map((state, index) => (
                <option key={index} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>

          {/* City Select Input */}
          <div className="flex flex-col gap-1 text-sm font-semibold text-[#00000066] ">
            <label htmlFor="city" className="ml-1 text-xs text-[#000000bf]">
              Select City
            </label>
            <select
              name="city"
              id="city"
              required
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0 appearance-none"
              style={{ backgroundImage: "none" }}
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            >
              <option value="">Select Your City</option>
              {cities?.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
            <label className="ml-1 text-xs">PIN Code</label>
            <input
              type="text"
              placeholder="Enter PIN Code"
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0 "
            />
          </div>

          <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf] ">
            <label className="ml-1 text-xs">Aadhaar Number</label>
            <input
              type="text"
              placeholder="Enter Aadhaar Number"
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0 "
            />
          </div>

          <div className="flex flex-col gap-1 text-sm font-semibold text-[#000000bf]">
            <label className="ml-1 text-xs">PAN Number</label>
            <input
              type="text"
              placeholder="Enter PAN Number"
              className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0 "
            />
          </div>
        </div>

        <p className="text-[#067700] font-semibold text-sm my-4">
          Step 2 : Income details
        </p>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        </div>
      </form>
    </div>
  );
}

export default CheckEligibility;
