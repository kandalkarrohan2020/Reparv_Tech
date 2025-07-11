import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { handlePayment } from "../../utils/payment.js";

const RegistrationForm = () => {
  const { URI, setSuccessScreen } = useAuth();
  const registrationPrice = 14999;
  const [newPartner, setNewPartner] = useState({
    fullname: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    intrest: "",
    refrence: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
      const response = await fetch(`${URI}/admin/cities/${newPartner?.state}`, {
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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptLoaded = await loadRazorpayScript();

    if (!scriptLoaded) {
      alert("Failed to load Razorpay. Please check your internet.");
      return;
    }
    try {
      const response = await fetch(`${URI}/admin/projectpartner/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPartner),
      });

      if (response.ok) {
        const res = await response.json();

        setSuccessScreen({
          show: true,
          label: "Your Data Send SuccessFully",
          description: `Pay Rs ${registrationPrice} for Join as a Project Partner`,
        });

        try {
          await handlePayment(
            newPartner,
            "Project Partner",
            "https://projectpartner.reparv.in",
            registrationPrice,
            res.Id,
            "projectpartner",
            "id",
            setSuccessScreen
          );

          // If payment is successful, reset the form
          setNewPartner({
            fullname: "",
            contact: "",
            email: "",
            state: "",
            city: "",
            intrest: "",
            refrence: "",
          });
        } catch (paymentError) {
          console.error("Payment Error:", paymentError.message);
          alert("Payment failed. Please contact support.");
        }
      } else {
        const errorRes = await response.json();
        console.error("Submission Error:", errorRes);
        alert(errorRes.message || "Failed to Submit Data. Please try again.");
      }
    } catch (err) {
      console.error("Network Error:", err.message);
      alert("Network Error. Please try again later.");
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (newPartner.state != "") {
      fetchCities();
    }
  }, [newPartner.state]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <div className="text-center mb-6">
        <h2 className="text:xl lg:text-3xl font-bold text-black mb-2">
          Ready to Join Us?
        </h2>
        <p className="text-gray-600 text-sm">
          Fill out the form below to register as a Project Partner
        </p>
        <div className="w-20 h-1 bg-[#0BB501] mx-auto mt-3 rounded" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl bg-white p-6 sm:p-10 border border-gray-200 rounded-lg shadow-sm"
      >
        <h3 className="text-base sm:text-xl font-semibold mb-6">
          Register Your Interest
        </h3>

        <div className="w-full flex flex-col lg:flex-row gap-2 sm:gap-4 items-center justify-between mb-2 sm:mb-4">
          <div className="w-full lg:w-[300px]">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={newPartner.fullname}
              onChange={(e) =>
                setNewPartner({ ...newPartner, fullname: e.target.value })
              }
              className="w-full bg-white text-sm sm:text-base font-medium px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="w-full lg:w-[300px]">
            <input
              type="text"
              required
              minLength={10}
              maxLength={10}
              placeholder="Your Phone Number"
              value={newPartner.contact}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,10}$/.test(input)) {
                  setNewPartner({ ...newPartner, contact: input });
                }
              }}
              className="w-full bg-white text-sm sm:text-base font-medium px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-2 sm:gap-4 items-center justify-between mb-2 sm:mb-4">
          <div className="w-full lg:w-[300px]">
            <select
              required
              value={newPartner.state}
              onChange={(e) =>
                setNewPartner({ ...newPartner, state: e.target.value })
              }
              className="w-full bg-white appearance-none text-sm sm:text-base font-medium px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Your State</option>
              {states.map((state, index) => (
                <option key={index} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full lg:w-[300px]">
            <select
              required
              value={newPartner.city}
              onChange={(e) =>
                setNewPartner({ ...newPartner, city: e.target.value })
              }
              className="w-full bg-white appearance-none text-sm sm:text-base font-medium px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Select Your City</option>
              {cities.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full mb-2 sm:mb-4">
          <input
            type="email"
            required
            placeholder="Your Email"
            value={newPartner.email}
            onChange={(e) =>
              setNewPartner({ ...newPartner, email: e.target.value })
            }
            className="w-full bg-white text-sm sm:text-base font-medium px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="w-full mb-5">
          <input
            type="text"
            required
            minLength={3}
            placeholder="Why are You Interested ?"
            value={newPartner.intrest}
            onChange={(e) =>
              setNewPartner({ ...newPartner, intrest: e.target.value })
            }
            className="w-full  bg-white text-sm sm:text-base font-medium px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="w-full mb-5">
          <input
            type="text"
            minLength={10}
            placeholder="Referral Code (optional)"
            value={newPartner.refrence}
            onChange={(e) =>
              setNewPartner({ ...newPartner, refrence: e.target.value })
            }
            className="w-full  bg-white text-sm sm:text-base font-medium px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[200px] text-white bg-[#0BB501] active:scale-95 px-6 py-2 rounded-lg text-base font-semibold transition cursor-pointer"
          >
            Register
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          By registering, you’ll proceed to the payment page to complete the
          registration process
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
