//import ThankYouComponent from "@/layout/thankyouComponent";
import { handlePayment } from "@/utils/payment";
import ThankYouComponent from "../layout/thankyouComponent";
import axios from "axios";
import { useAuth } from "@/store/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TerritoryJoinFormSection() {
  const { URI } = useAuth();
  const adharInputRef = useRef(null);
  const panInputRef = useRef(null);

  const [currentData, setCurrentData] = useState({
    fullName: "",
    contact: "",
    city: "",
    address: "",
    email: "",
    experience: "",
    rerano: "",
    adharno: "",
    panimg: "",
    adharimg: "",
    panno: "",
  });

  // States for error and success messages
  const [error, setError] = useState("");
  //const [adharError, setAdharError] = useState("");
  //const [panError, setPanError] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [success, setSuccess] = useState("");
  const [thankYou, setThanYou] = useState(false);
  const navigate = useNavigate();

  // Handle input change for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCurrentData({
      ...currentData,
      [name]: value, // Update the respective field based on the name attribute
    });
  };

  // Validation function for the form
  const validateForm = () => {
    const {
      fullName,
      contact,
      city,
      email,
    } = currentData;

    if (
      !fullName ||
      !contact ||
      !city ||
      !email
    ) {
      setError("All fields are required.");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contact)) {
      setContactError("Contact number should be exactly 10 digits.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clear all errors once
    setError("");
    setSuccess("");
    setContactError("");
    setEmailError("");
  
    // Validate form
    if (!validateForm()) {
      return;
    }
  
    const data = {
      ...currentData,
      isSales: true,
    };
  
    const formData = new FormData();
    formData.append("fullname", currentData.fullName);
    formData.append("contact", currentData.contact);
    formData.append("email", currentData.email);
    formData.append("address", currentData.address);
    formData.append("city", currentData.city);
    formData.append("experience", currentData.experience);
    formData.append("rerano", currentData.rerano);
    formData.append("adharno", currentData.adharno);
    formData.append("panno", currentData.panno);
  
    if (currentData.adharimg) {
      formData.append("adharImage", currentData.adharimg);
    }
    if (currentData.panimg) {
      formData.append("panImage", currentData.panimg);
    }
  
    try {
      const response = await fetch(`${URI}/admin/territorypartner/add`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      if (response.ok && response.status === 201) {
        const res = await response.json();
        alert("Data Send Succesfully!");
  
        try {
          await handlePayment(
            currentData,
            "Territory Partner",
            "https://territory.reparv.in",
            4999,
            res.Id,
            "territorypartner",
            "id"
          );
  
          // Payment Successful → Now reset form
          setCurrentData({
            fullName: "",
            contact: "",
            city: "",
            address: "",
            email: "",
            experience: "",
            rerano: "",
            adharno: "",
            panno: "",
            adharimg: "",
            panimg: "",
          });
  
          // Optionally redirect or show success
          // navigate("/admin/overview");
        } catch (paymentError) {
          console.error("❌ Payment Error:", paymentError.message);
          alert("Payment Failed. Please contact support.");
        }
        
      } else {
        const errorRes = await response.json();
        console.error("❌ Server Error:", errorRes);
        alert(errorRes.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("❌ Network Error:", err.message);
      alert("Network Error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <div
        id="territory_partner_join"
        className=" absolute  flex flex-col w-full item-center p-2 lg:items-center gap-[32px] lg:h-[557px]  lg:top-[3453px] top-[4300px] md:top-[5450px]"
      >
        {/* Form title */}
        <div className="flex mx-auto  flex-col lg:justify-center items-center p-0 gap-4 lg:w-[307px] h-[152px]">
          <div className="w-full lg:w-[747px] h-[35px] lg:h-[48px] text-center font-semibold text-[#004170] text-[28px] lg:text-[40px] leading-[40px] lg:leading-[48px]">
            Become A Territory Partner
          </div>

          <div className=" lg:w-[534px] mt-5 lg:mt-0 md:mt-0 sm:mt-0 h-[40px] md:h-[30px] lg:h-[28px] text-[#999999] text-[16px] font-medium leading-[24px] text-center">
            Take the first step towards a successful partnership with Reparv
          </div>

          {/* blue line */}
          <div className="lg:flex w-[100px] h-0 border-2  border-[#004170]"></div>
        </div>

        {/* Register form */}

        <div className="flex sm:mx-auto flex-col lg:flex-row items-start p-2 lg:p-0 w-full lg:w-[996px] md:h-[500px] lg:h-[500px]">
          {/* banner for desktop screen */}
          <div className=" hidden lg:flex flex-col items-start p-8 gap-8 w-[293px] h-[500px] bg-[#065B9C] rounded-lg">
            <div className="flex flex-col items-start p-0 gap-6 w-[229px] h-[178px]">
              <div className="font-inter font-bold text-2xl leading-[29px] text-white">
                Partner with Excellence
              </div>
              <div className="font-inter font-normal text-xl leading-6 text-[#FFFFFFB3]">
                Fill out the form to start your journey as a Territory Partner
                with Reparv.
              </div>
            </div>

            <div className="flex flex-col items-start p-0 gap-6 w-[229px] h-[210px]">
              <div className="flex flex-row items-start p-0 gap-3 w-[223px] h-[38px]">
                <div className="flex gap-2 font-inter font-medium text-lg leading-5 text-white">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z"
                      fill="#D3BD74"
                    />
                  </svg>{" "}
                  Comprehensive training and support
                </div>
              </div>

              <div className="flex flex-row items-start p-0 gap-3 w-[229px] h-[38px]">
                <div className="flex gap-2 font-inter font-medium text-lg leading-5 text-white">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z"
                      fill="#D3BD74"
                    />
                  </svg>{" "}
                  Advanced marketing resources
                </div>
              </div>

              <div className="flex flex-row items-start p-0 gap-3 w-[239px] h-[24px]">
                <div className="flex gap-2 font-inter font-medium text-lg leading-5 text-white">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z"
                      fill="#D3BD74"
                    />
                  </svg>{" "}
                  Exclusive territory rights
                </div>
              </div>

              <div className="flex flex-row items-start p-0 gap-3 w-[229px] h-[38px]">
                <div className="flex gap-2 font-inter font-medium text-lg leading-5 text-white">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.0833 2 14.1083 2.15833 15.075 2.475C16.0417 2.79167 16.9333 3.23333 17.75 3.8L16.3 5.275C15.6667 4.875 14.9917 4.5625 14.275 4.3375C13.5583 4.1125 12.8 4 12 4C9.78333 4 7.89583 4.77917 6.3375 6.3375C4.77917 7.89583 4 9.78333 4 12C4 14.2167 4.77917 16.1042 6.3375 17.6625C7.89583 19.2208 9.78333 20 12 20C14.2167 20 16.1042 19.2208 17.6625 17.6625C19.2208 16.1042 20 14.2167 20 12C20 11.7 19.9833 11.4 19.95 11.1C19.9167 10.8 19.8667 10.5083 19.8 10.225L21.425 8.6C21.6083 9.13333 21.75 9.68333 21.85 10.25C21.95 10.8167 22 11.4 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM10.6 16.6L6.35 12.35L7.75 10.95L10.6 13.8L20.6 3.775L22 5.175L10.6 16.6Z"
                      fill="#D3BD74"
                    />
                  </svg>{" "}
                  Competitive commission structure
                </div>
              </div>
            </div>
          </div>

          <div className="flex mx-auto   flex-col  lg:mx-0 items-start  mt-[10px] lg:mt-0 p-4 gap-6 md:w-[600px]  lg:w-[703px]  lg:h-[500px] bg-white border-l border-t border-b border-[#e5e5e5] shadow-lg rounded-r-lg">
            <div className="font-inter mx-auto md:mx-auto font-medium text-2xl text-[#026FBE]">
              Register Your Interest
            </div>
            <form
              onSubmit={handleSubmit}
              className="mx-auto  w-full sm:mx-0 sm:w-full md:w-full md:p-10 md:mx-auto "
            >
              <div className="flex flex-col  items-start p-0 md:mx-auto lg:mx-0 gap-5 w-full md:w-full sm:w-full   lg:w-[631px]  lg:h-[468px]">
                <div className="flex flex-col lg:flex-row  items-start p-0 gap-7  w-full  lg:w-[631px] h-[200px] lg:h-[84px]">
                  <div className="flex flex-col items-start  p-0 gap-4  lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      Full Name*
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={currentData.fullName}
                      onChange={handleInputChange}
                      className="rounded-lg w-full  lg:w-[300.5px] md:w-[500px]  h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Full Name"
                    />
                  </div>

                  <div
                    className="flex flex-col w-full items-start p-0 gap-4 
                  lg:w-[300.5px] md:w-[500px] h-[84px]"
                  >
                    <label className="font-inter font-medium text-sm text-black">
                      Contact Number*
                    </label>

                    <input
                      type="number"
                      name="contact"
                      value={currentData.contact}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Contact Number"
                    />
                    {contactError && (
                      <p className="text-red-500 text-xs mt-[-15px] ml-[20px]">
                        {contactError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start p-0 gap-7 w-full lg:w-[631px] h-[200px] lg:h-[84px]">
                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      Email Address*
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={currentData.email}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Your Email"
                    />
                    {emailError && (
                      <p className="text-red-500 text-xs mt-[-15px] ml-[20px]">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      city*
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={currentData.city}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Your city"
                    />
                  </div>
                </div>
                {/*
                <div className="flex flex-col lg:flex-row items-start p-0 gap-7 w-full lg:w-[631px] h-[200px] lg:h-[84px]">
                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      Address
                    </label>

                    <input
                      type="text"
                      name="address"
                      value={currentData.address}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Address"
                    />
                  </div>

                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      Experience
                    </label>

                    <input
                      type="text"
                      name="experience"
                      value={currentData.experience}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Experience"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start p-0 gap-7 w-full lg:w-[631px] h-[200px] lg:h-[84px]">
                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      Adhar Card Number
                    </label>
                    <input
                      type="number"
                      name="adharno"
                      value={currentData.adharno}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Adhar Number"
                    />{" "}
                    {adharError && (
                      <p className="text-red-500 text-xs mt-[-15px] ml-[20px]">
                        {adharError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start p-0 gap-2 lg:w-[300.5px] md:w-[500px] w-full">
                    <label className="font-inter font-medium text-sm text-black">
                      RERA Number (optional)
                    </label>

                    <input
                      type="text"
                      name="rerano"
                      value={currentData.rerano}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border border-gray-300 text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter RERA Number"
                      pattern="[A-Za-z0-9]{12}"
                      maxLength={12}
                      minLength={12}
                      title="RERA number must be exactly 12 alphanumeric characters."
                    />
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row items-start p-0 gap-7 w-full lg:w-[631px] h-[200px] lg:h-[84px]">
                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      PAN Card Number
                    </label>

                    <input
                      type="text"
                      name="panno"
                      value={currentData.panno}
                      onChange={handleInputChange}
                      className="rounded-lg w-full lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                      placeholder="Enter Pan Number"
                    />
                    {panError && (
                      <p className="text-red-500 text-xs mt-[-15px] ml-[20px]">
                        {panError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      Upload PanCard Image
                    </label>

                    <label
                      htmlFor="pan"
                      className="flex items-center w-full h-full border border-gray-300 rounded-md overflow-hidden"
                    >
                      <div className="flex-grow px-4 text-gray-900  text-sm flex items-center">
                        <>
                          {" "}
                          {currentData.panimg?.name === "" ? (
                            "Upload Image"
                          ) : (
                            <>{currentData.panimg?.name}</>
                          )}
                        </>
                      </div>

                     
                      <div className="bg-gray-600 text-white px-5 py-3  h-full  text-sm cursor-pointer hover:text-gray-900 hover:bg-gray-400">
                        Browse
                      </div>
                    </label>

                    <input
                      id="pan"
                      type="file"
                      name="panimg"
                      accept="image/*"
                      ref={panInputRef}
                      onChange={(e) =>
                        setCurrentData({
                          ...currentData,
                          panimg: e.target.files[0],
                        })
                      }
                      className="hidden rounded-lg w-full  h-[20px] mt-0 p-6 border "
                    />
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-start p-0 gap-7 w-full lg:w-[631px]  lg:h-[84px]">
                  <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                    <label className="font-inter font-medium text-sm text-black">
                      Upload AdharCard Image
                    </label>

                    <label
                      htmlFor="adhar"
                      className="flex items-center w-full h-full border border-gray-300 rounded-md overflow-hidden"
                    >
                      <div className="flex-grow px-4 text-gray-900  text-sm flex items-center">
                        {currentData.adharimg.name === null ? (
                          "Upload Image"
                        ) : (
                          <>{currentData.adharimg?.name}</>
                        )}
                      </div>

                      
                      <div className="bg-gray-600 text-white px-5 py-3  h-full  text-sm cursor-pointer hover:text-gray-900 hover:bg-gray-400">
                        Browse
                      </div>
                    </label>
                    <input
                      type="file"
                      id="adhar"
                      accept="image/*"
                      name="adharimg"
                      ref={adharInputRef}
                      onChange={(e) =>
                        setCurrentData({
                          ...currentData,
                          adharimg: e.target.files[0],
                        })
                      }
                      className="rounded-lg hidden  "
                    />
                  </div> 
                </div>
*/}
                <div className="flex mt-5  mx-auto lg:ml-0 lg:mt-0 flex-row justify-center items-center gap-12 lg:w-[631px] ">
                  <button
                    type="submit"
                    className="flex lg:ml-0 hover:bg-blue-400 justify-center  items-center  px-8 gap-[67px]  lg:w-[251px] h-[42px] bg-[#026FBE] text-white rounded-md"
                  >
                    <p className=" font-inter  font-semibold text-lg text-white">
                      Submit
                    </p>
                  </button>
                </div>

                {/* Error and Success Messages */}
                <div className="flex w-full lg:w-[500px] text-[11px] lg:text-[15px]">
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
                <div className="text-center text-sm text-[#404040]">
                  By registering, you'll proceed to the payment page to complete
                  the registration process
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Thank You PopUp */}
        <ThankYouComponent show={thankYou} />
      </div>
    </>
  );
}
