import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import reparvMainLogo from "../../assets/layout/reparvMainLogo.svg";
import calenderIcon from "../../assets/layout/calenderIcon.svg";
import enquirersIcon from "../../assets/layout/enquirersIcon.svg";
import overviewIcon from "../../assets/layout/overviewIcon.svg";
import ticketingIcon from "../../assets/layout/ticketingIcon.svg";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Profile from "../Profile";
import { useAuth } from "../../store/auth";
import LogoutButton from "../LogoutButton";
import { FaUserCircle } from "react-icons/fa";
import SuccessScreen from "../property/SuccessScreen";
import { useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

function Layout() {
  const { id } = useParams();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortBar, setIsShortbar] = useState(false);
  const [heading, setHeading] = useState(localStorage.getItem("head"));
  const {
    showProfile, URI,
    setShowProfile,
    showPropertyForm,
    setShowPropertyForm,
    showUploadImagesForm,
    setShowUploadImagesForm,
    showAdditionalInfoForm,
    setShowAdditionalInfoForm,
    showEnquiryStatusForm,
    setShowEnquiryStatusForm,
    showPropertyInfo,
    setShowPropertyInfo,
    showInquiryForm,
    setShowInquiryForm,
    showEnquiry,
    setShowEnquiry,
    showSuccess,
    setShowSuccess,
    isLoggedIn,
  } = useAuth();

  useEffect(() => {
    setFormData({ ...formData, propertyid: id });
  }, [showInquiryForm]);

  //Inquiry Form Data
  const [formData, setFormData] = useState({
    propertyid: id,
    fullname: "",
    phone: "",
    email: "",
    budget: "",
    city: "",
    location: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URI}/sales/enquiry/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Tell server it's JSON
        },
        body: JSON.stringify(formData), // Convert object to JSON
      });

      if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        setShowSuccess(true);
        setShowInquiryForm(false);
      }

      // Clear form after success
      setFormData({
        ...formData,
        propertyid: id,
        fullname: "",
        phone: "",
        email: "",
        budget: "",
        city: "",
        location: "",
        message: "",
      });
    } catch (err) {
      console.error("Error saving enquiry:", err);
    }
  };

  const overlays = [
    { state: showPropertyForm, setter: setShowPropertyForm },
    { state: showUploadImagesForm, setter: setShowUploadImagesForm },
    { state: showAdditionalInfoForm, setter: setShowAdditionalInfoForm },
    { state: showEnquiryStatusForm, setter: setShowEnquiryStatusForm },
    { state: showEnquiry, setter: setShowEnquiry},
    { state: showPropertyInfo, setter: setShowPropertyInfo },
  ];

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "font-semibold bg-[#E3FFDF] shadow-[0px_1px_0px_0px_rgba(0,_0,_0,_0.1)]"
      : "";
  };

  const getHeading = (label) => {
    setHeading(label);
    localStorage.setItem("head", label);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F5F6]">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-white shadow-sm">
        <img src={reparvMainLogo} alt="Reparv Logo" className="h-10" />
        <div className="ButtonContainer flex gap-4 items-center justify-center">
          <FaUserCircle
            onClick={() => {
              setShowProfile("true");
            }}
            className="w-8 h-8 text-[#076300]"
          />
          <LogoutButton />
          <button
            className="p-2 rounded-md bg-gray-100 text-black hover:text-[#076300] active:scale-95"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen === false ? (
              <IoMenu size={24} />
            ) : (
              <IoMdClose size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar hidden w-full h-[80px] md:flex items-center justify-center border-b-2">
        <div className="navLogo w-[300px] h-[80px] flex items-center justify-center">
          <img
            src={reparvMainLogo}
            alt="Reparv Logo"
            className="w-[100px] mb-2"
          />
        </div>

        <div className="navHeading w-full h-16 flex items-center justify-between text-lg font-semibold">
          <div className="left-heading h-8 flex gap-4 items-center justify-between text-[20px] leading-[19.36px] text-black">
            <IoMenu
              onClick={() => {
                setIsShortbar(!isShortBar);
              }}
              className="w-8 h-8 cursor-pointer active:scale-95"
            />{" "}
            <p>{heading}</p>
          </div>
          <div className="right-heading w-[135px] h-[40px] flex items-center justify-between mr-8">
            <FaUserCircle
              onClick={() => {
                setShowProfile("true");
              }}
              className="w-8 h-8 text-[#076300]"
            />
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="flex overflow-y-scroll scrollbar-hide">
        <div
          className={`w-64 ${
            isShortBar ? "md:w-[95px]" : "md:w-60"
          } h-full fixed overflow-y-scroll scrollbar-hide bg-white shadow-md md:shadow-none md:static top-0 left-0 z-20 md:bg-[#F5F5F6] transition-transform duration-300 transform ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2 p-4 md:gap-2">
            <img
              src={reparvMainLogo}
              alt="Reparv Logo"
              className="md:hidden block"
            />
            {/* Navigation Links */}
            {[
              { to: "/overview", icon: overviewIcon, label: "Overview" },
              { to: "/enquirers", icon: enquirersIcon, label: "Enquirers" },
              { to: "/properties", icon: enquirersIcon, label: "Properties" },
              { to: "/tickets", icon: ticketingIcon, label: "Tickets" },
              { to: "/calender", icon: calenderIcon, label: "Calendar" },
            ].map(({ to, icon, label }) => (
              <NavLink
                onClick={() => {
                  setIsSidebarOpen(false);
                  getHeading(label);
                }}
                key={to}
                to={isLoggedIn === true ? to : "/"}
                className={`flex items-center gap-3 w-full p-3 rounded-[20px] transition-all duration-300 text-black ${getNavLinkClass(
                  to
                )}`}
              >
                <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-[12px] bg-white">
                  <img
                    src={icon}
                    alt={`${label} Icon`}
                    className="md:h-6 md:w-6 w-5 h-5"
                  />
                </div>
                <span
                  className={`text-sm md:text-base ${
                    isShortBar ? "md:hidden" : "block"
                  }`}
                >
                  {label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 p-4 md:pl-0 md:pt-0 overflow-scroll scrollbar-hide"
          onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
        >
          <Outlet />
        </div>
      </div>
      {showProfile && <Profile />}

      {overlays.map(({ state, setter }, index) =>
        state ? (
          <div
            key={index}
            className="w-full h-screen z-[60] fixed bg-[#767676a0]"
            onClick={() => setter(false)}
          ></div>
        ) : null
      )}

      {/* Inquiry From */}
      {showInquiryForm && (
        <div className="Container w-full h-screen bg-[#dadada8f] fixed z-[62] flex md:items-center md:justify-center">
          <div className="InquiryForm overflow-scroll scrollbar-hide bg-white py-8 p-4 sm:p-6 sm:rounded-2xl shadow-lg max-w-3xl w-full ">
            <div className="formHeading w-full flex flex-row items-center justify-between gap-8 sm:p-6 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#076300] ">
                Find Your Dream Property – Get in Touch!
              </h2>
              <RxCross2
                onClick={() => {
                  setShowInquiryForm(false);
                }}
                className="w-7 h-7 cursor-pointer hover:text-[#076300] active:scale-95"
              />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                  <label htmlFor="fullName" className="ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullName"
                    placeholder="Enter Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                  <label htmlFor="fullName" className="ml-1">
                    Enter Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                  <label htmlFor="email" className="ml-1">
                    Enter Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                  <label htmlFor="budget" className="ml-1">
                    Enter Your Budget
                  </label>
                  <input
                    type="text"
                    name="budget"
                    id="budget"
                    placeholder="Enter Budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                  <label htmlFor="city" className="ml-1">
                    Select City
                  </label>
                  <select
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Chandrapur">Chandrapur</option>
                    <option value="Wardha">Wardha</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                  <label htmlFor="location" className="ml-1">
                    Select Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Enter Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                <label htmlFor="message" className="ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Enter your Message here.."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                  rows="4"
                ></textarea>
              </div>
              <div className="w-full flex items-center justify-center pb-5">
                <button
                  type="Submit"
                  //onClick={handleSubmit}
                  className="w-40 h-12 bg-[#0BB501] text-white text-base rounded-md hover:bg-green-700 active:scale-95"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Show Success Screen */}
      {showSuccess && <SuccessScreen />}
    </div>
  );
}

export default Layout;
