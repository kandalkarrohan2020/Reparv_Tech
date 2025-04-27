import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import student from "/src/assets/student.png";
import axios from "axios";
// import { useAuth } from "@/store/auth";
import Cookies from "js-cookie";
import ThankYouComponent from "../layout/thankyouComponent";
import { handlePayment } from "@/utils/payment";

export default function JoinFormSection() {
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
  const [adharError, setAdharError] = useState("");
  const [panError, setPanError] = useState("");
  const [contactError, setContactError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
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
      experience,
      address,
      rerano,
      adharno,
      panno,
      panimg,
      adharimg,
    } = currentData;

    if (
      !fullName ||
      !contact ||
      !city ||
      !email ||
      !address ||
      !experience ||
      !panno ||
      !panimg ||
      !adharno ||
      !adharimg
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

    const adharRegex = /^\d{12}$/;
    if (!adharRegex.test(adharno)) {
      setAdharError("Aadhaar number should be exactly 12 digits.");
      return false;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(panno)) {
      setPanError("Invalid Format(e.g., ABCDE1234F).");
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setAdharError("");
    setContactError("");
    setPanError("");
    setEmailError("");

    // Validate the form
    if (validateForm()) {
      // If validation passes, show a success message and log the data
      setSuccess("");
      //   setThanYou(true);
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
      formData.append("adharImage", currentData.adharimg);
      formData.append("panImage", currentData.panimg);

      try {
        const response = await fetch(
          `http://localhost:4000/admin/onboardingpartner/add`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        if (response.status === 200) {
          const res = await response.json();
          alert(res.id);
          await handlePayment(
            currentData,
            "Onboarding Partner",
            1000,
            "/admin/onboardingpartner",
            navigate,
            res.id,
            "onboardingpartner",
            "partnerid"
          );
        }
      } catch (error) {
        alert("Failed to submit the form. See console for details.");

        console.error("Error:", error);
      }

      // Reset file inputs
      adharInputRef.current.value = null;
      panInputRef.current.value = null;
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
        panimg: "",
        adharimg: "",
      });
      //   setTimeout(() => {
      //     navigate("/admin/onboardingpartner");
      //     setThanYou(false);
      //   }, 2000);
    }
  };
  return (
    <>
      <div
        id="onboardingjoin"
        className="absolute w-full mx-auto p-3 lg:p-0 justify-center w-full  top-[6244px] md:top-[6250px] lg:top-[4207px] flex flex-col items-center gap-[32px] p-0"
      >
        <div className="flex flex-col items-center justify-center gap-3 w-full mx-auto h-[120px]">
          <div className="flex flex-col  sm:mx-auto items-start  justify-center w-full   p-2 ">
            {/* Text Container */}
            <div className="flex  justify-center w-full flex-col mx-auto   gap-[16px] lg:w-[1134px] h-[104px]">
              {/*Title */}
              <h1 className="mx-auto w-full lg:w-[1134px] h-[48px] font-inter font-semibold text-[28px] lg:text-[40px] leading-[48px] text-center text-[#1E1E1E]">
                Ready to Join Us?
              </h1>
              {/* Paragraph */}
              <p className="lg:w-[500px] mx-auto md:w-[600px] md:h-[24px] h-[124px] font-inter font-medium text-[12px] md:text-[15px] lg:text-[16px] leading-[150%] text-center text-[rgba(0,0,0,0.4)]">
                Fill out the form below to register as an Onboarding Partner.
              </p>
              {/* green line */}
              <div className="mx-auto md:mt-10 lg:mt-5 justify-center w-[100px] h-[0px] border-[2px] border-[#1E1E1E] "></div>
            </div>
            {/* Form Section */}
            <div className="flex mx-auto   flex-col   items-start   mt-[10px] lg:mt-10 md:mt-10 p-4 lg:p-8 gap-6 w-full md:w-[600px] lg:w-[763px] lg:h-[850px]  bg-white border-l border-t border-b border-[#e5e5e5] shadow-lg rounded-r-lg">
              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full  sm:mx-0 sm:w-full md:p-10 md:mx-auto  md:w-full"
              >
                <div className="flex flex-col  items-start p-0 md:mx-auto lg:mx-0 gap-5 w-full   sm:w-full   lg:w-[631px]  lg:h-[468px]">
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
                        placeholder="Enter Adhard Number"
                      />
                      {adharError && (
                        <p className="text-red-500 text-xs mt-[-15px] ml-[20px]">
                          {adharError}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-start p-0 gap-4 lg:w-[300.5px] md:w-[500px]  w-full h-[84px]">
                      <label className="font-inter font-medium text-sm text-black">
                        RERA Number
                      </label>

                      <input
                        type="number"
                        name="rerano"
                        value={currentData.rerano}
                        onChange={handleInputChange}
                        className="rounded-lg w-full lg:w-[300.5px] md:w-[500px] h-[20px] p-6 border  text-[14px] font-medium leading-[20px] text-black"
                        placeholder="Enter Your Email"
                      />
                    </div>
                  </div>
                  {/* Years of Experience selected field */}
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

                        {/* Browse Button */}
                        <div className="bg-gray-600 text-white px-5 py-3  h-full  text-sm cursor-pointer hover:text-gray-900 hover:bg-gray-400">
                          Browse
                        </div>
                      </label>

                      <input
                        type="file"
                        id="pan"
                        name="panimg"
                        accept="image/*"
                        ref={panInputRef}
                        onChange={(e) =>
                          setCurrentData({
                            ...currentData,
                            panimg: e.target.files[0],
                          })
                        }
                        className="hidden"
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
                          <>
                            {" "}
                            {currentData.adharimg?.name === "" ? (
                              "Upload Image"
                            ) : (
                              <>{currentData.adharimg?.name}</>
                            )}
                          </>
                        </div>

                        {/* Browse Button */}
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
                        className="hidden "
                      />
                    </div>
                  </div>

                  <div className="flex mt-5   lg:ml-0 lg:mt-0 md:mt-0 flex-row justify-center items-center mx-auto gap-12 lg:w-[631px] ">
                    <button
                      type="submit"
                      className="flex lg:ml-0 hover:bg-gray-600 justify-center sm:w-[300px] md:w-[300px]   items-center  px-8 gap-[67px]  lg:w-[251px] h-[42px]  bg-[#1E1E1E] text-white rounded-md"
                    >
                      <p className=" font-inter  font-semibold text-lg text-white ">
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
                    By registering, you'll proceed to the payment page to
                    complete the registration process
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Thank You PopUp */}
        <ThankYouComponent show={thankYou} />
      </div>
    </>
  );
}
