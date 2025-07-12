import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import localPropertyImage from "../../assets/property/propertyPicture.svg";
import reparvLogo from "../../assets/reparvLogo.svg";
import { useAuth } from "../../store/auth";
import Loader from "../Loader";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function SiteVisitPopup() {
  const {
    URI,
    user,
    setLoading,
    setShowSiteVisitPopup,
    propertyCategory,
    setShowSuccess,
  } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const rentMinBudgetOptions = [
    5000, 10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000,
  ];
  const rentMaxBudgetOptions = [
    10000, 15000, 20000, 30000, 40000, 50000, 75000, 100000, 125000,
  ];

  const saleMinBudgetOptions = [
    1000000, 2500000, 5000000, 7500000, 10000000, 20000000, 30000000, 40000000,
  ];
  const saleMaxBudgetOptions = [
    2500000, 5000000, 7500000, 10000000, 20000000, 30000000, 40000000, 50000000,
  ];

  const isRental = ["RentalFlat", "RentalShop", "RentalOffice"].includes(
    propertyCategory
  );

  const minOptions = isRental ? rentMinBudgetOptions : saleMinBudgetOptions;
  const maxOptions = isRental ? rentMaxBudgetOptions : saleMaxBudgetOptions;


  //Inquiry Form Data
  const [formData, setFormData] = useState({
    propertyid: id,
    fullname: "",
    phone: "",
    state: "",
    city: "",
    minbudget: "",
    maxbudget: "",
    salesPersonName: user.name,
    salesPersonContact: user.contact,
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

  useEffect(() => {
    fetchStates();
    setFormData({ ...formData, propertyid: id });
  }, []);

  useEffect(() => {
    if (formData.state != "") {
      fetchCities();
    }
  }, [formData.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${URI}/sales/enquiry/add`, {
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
        setShowSuccess(true);
        setShowSiteVisitPopup(false);
      }

      // Clear form after success
      setFormData({
        ...formData,
        propertyid: id,
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

  return (
    <div className="w-full max-w-[750px] relative flex flex-col md:flex-row bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl overflow-hidden shadow-xl ">
      {/* Form Section */}
      <div className="w-full flex flex-col gap-3 justify-center p-6 relative">
        {/* Close Button */}
        <div className="w-full flex items-center justify-between">
          <img src={reparvLogo} alt="Reparv Logo" className="h-8" />
          <RxCross2
            onClick={() => {
              setShowSiteVisitPopup(false);
            }}
            className="w-5 h-5 text-xl text-right rounded-full bg-[#FAFAFA] text-black cursor-pointer hover:text-[#076300] active:scale-95"
          />
        </div>
        <h2 className="text-base font-semibold">
          Conveniently Book a Property Visit
        </h2>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#00000066] ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullName"
                placeholder="Enter Full Name"
                value={formData.fullname}
                onChange={(e) => {
                  setFormData({ ...formData, fullname: e.target.value });
                }}
                className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0"
                required
              />
            </div>
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#00000066] ">
              <label htmlFor="fullName" className="ml-1 text-xs">
                Enter Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    // Allows only up to 10 digits
                    setFormData({ ...formData, phone: input });
                  }
                }}
                className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0"
                required
              />
            </div>
            {/* State Select Input */}
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#00000066] ">
              <label htmlFor="state" className="ml-1 text-xs">
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
              <label htmlFor="city" className="ml-1 text-xs">
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
            {/* Min Budget */}
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#00000066]">
              <label htmlFor="minbudget" className="ml-1 text-xs">
                Min Budget
              </label>
              <select
                name="minbudget"
                id="minbudget"
                value={formData.minbudget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minbudget: parseInt(e.target.value),
                    maxbudget: "",
                  })
                }
                className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0 appearance-none bg-white"
                style={{ backgroundImage: "none" }}
                required
              >
                <option value="">Select Min Budget</option>
                {minOptions.map((value) => (
                  <option key={value} value={value}>
                    ₹{value.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Budget */}
            <div className="flex flex-col gap-1 text-sm font-semibold text-[#00000066]">
              <label htmlFor="maxbudget" className="ml-1 text-xs">
                Max Budget
              </label>
              <select
                name="maxbudget"
                id="maxbudget"
                value={formData.maxbudget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    maxbudget: parseInt(e.target.value),
                  })
                }
                className="w-full font-medium p-3 border border-[#00000033] rounded-md focus:outline-0 appearance-none bg-white"
                style={{ backgroundImage: "none" }}
                required
              >
                <option value="">Select Max Budget</option>
                {maxOptions
                  .filter(
                    (value) => !formData.minbudget || value > formData.minbudget
                  )
                  .map((value) => (
                    <option key={value} value={value}>
                      ₹{value.toLocaleString("en-IN")}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-[#0BB501] text-white py-2 rounded-md hover:scale-105 active:scale-100 transition cursor-pointer"
            >
              Book Site Visit Now
            </button>
          </div>
          <p className="text-xs text-center mt-2 text-[#00000066]">
            By registering, you’ll get a call from our agent.
          </p>
        </form>
      </div>
    </div>
  );
}
