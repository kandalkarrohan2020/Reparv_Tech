import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { handlePayment } from "../../utils/payment.js";

function RegisterForm() {
  const { URI, setSuccessScreen } = useAuth();
  const registrationPrice = 599;
  const [newPartner, setNewPartner] = useState({
    fullname: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    intrest: "",
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
      const response = await fetch(`${URI}/admin/salespersons/add`, {
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
          description: `Pay Rs ${registrationPrice} for Join as a Sales Partner`,
        });

        try {
          await handlePayment(
            newPartner,
            "Sales Partner",
            "https://sales.reparv.in",
            registrationPrice,
            res.Id,
            "salespersons",
            "salespersonsid",
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
    <div className="registerForm w-full flex flex-col gap-5 items-center justify-center bg-[#032500] rounded-2xl p-5 sm:px-20">
      <h2 className="text-white text-base sm:text-2xl font-medium">
        Fill the Gaps and Register Now
      </h2>
      <form
        action=""
        onSubmit={handleSubmit}
        className="w-full flex gap-4 flex-col items-center justify-center"
      >
        <div className="w-full flex flex-col lg:flex-row  gap-3 sm:gap-4 items-center justify-between">
          <div className="w-full lg:w-[286px] ">
            <input
              type="text"
              required
              placeholder="Your Name"
              value={newPartner.fullname}
              onChange={(e) => {
                setNewPartner({
                  ...newPartner,
                  fullname: e.target.value,
                });
              }}
              className="w-full bg-white text-sm sm:text-[16px] font-medium px-4 py-3 sm:p-4 border border-[#00000033] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BB501] "
            />
          </div>
          <div className="w-full lg:w-[286px] ">
            <input
              type="text"
              required
              placeholder="Your Phone Number"
              value={newPartner.contact}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d{0,10}$/.test(input)) {
                  // Allows only up to 10 digits
                  setNewPartner({
                    ...newPartner,
                    contact: e.target.value,
                  });
                }
              }}
              className="w-full bg-white text-sm sm:text-[16px] font-medium px-4 py-3 sm:p-4 border border-[#00000033] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BB501] "
            />
          </div>
          <div className="w-full lg:w-[286px]">
            <input
              type="email"
              required
              placeholder="Your Email"
              value={newPartner.email}
              onChange={(e) => {
                setNewPartner({
                  ...newPartner,
                  email: e.target.value,
                });
              }}
              className="w-full bg-white text-sm sm:text-[16px] font-medium px-4 py-3 sm:p-4 border border-[#00000033] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BB501] "
            />
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row  gap-3 sm:gap-4 items-center justify-between">
          {/* State Select Input */}
          <div className="w-full lg:w-[286px] ">
            <select
              required
              className="w-full appearance-none bg-white text-sm sm:text-[16px] font-medium px-4 py-3 sm:p-4 border border-[#00000033] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BB501] "
              style={{ backgroundImage: "none" }}
              value={newPartner.state}
              onChange={(e) =>
                setNewPartner({ ...newPartner, state: e.target.value })
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
          <div className="w-full lg:w-[286px] ">
            <select
              required
              className="w-full bg-white appearance-none text-sm sm:text-[16px] font-medium px-4 py-3 sm:p-4 border border-[#00000033] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BB501] "
              style={{ backgroundImage: "none" }}
              value={newPartner.city}
              onChange={(e) =>
                setNewPartner({
                  ...newPartner,
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
          <div className="w-full lg:w-[286px] ">
            <input
              type="text"
              required
              minLength={25}
              placeholder="Why are You Intrested ?"
              value={newPartner.intrest}
              onChange={(e) => {
                setNewPartner({
                  ...newPartner,
                  intrest: e.target.value,
                });
              }}
              className="w-full bg-white text-sm sm:text-[16px] font-medium px-4 py-3 sm:p-4 border border-[#00000033] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0BB501] "
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-[450px] text-base sm:text-xl font-semibold sm:max-w-[400px] h-11 sm:h-13 text-white bg-[#0BB501] rounded-lg cursor-pointer active:scale-95 "
        >
          Register Now
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
