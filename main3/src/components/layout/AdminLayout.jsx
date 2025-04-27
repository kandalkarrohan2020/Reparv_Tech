import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import reparvMainLogo from "/src/assets/layout/reparvMainLogo.svg";
import calenderIcon from "/src/assets/layout/calenderIcon.svg";
import enquirersIcon from "/src/assets/layout/enquirersIcon.svg";
import overviewIcon from "/src/assets/layout/overviewIcon.svg";
import ticketingIcon from "/src/assets/layout/ticketingIcon.svg";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function AdminLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortBar, setIsShortbar] = useState(false);
  const [heading, setHeading] = useState("Overview");
  const [showInquiryForm, setShowInquiryForm] = useState(true);

  const [formData, setFormData] = useState({
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

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "font-semibold bg-[#E3FFDF] shadow-[0px_1px_0px_0px_rgba(0,_0,_0,_0.1)]"
      : "";
  };

  const getHeading = (label) => {
    setHeading(label);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F5F5F6]">
      {/* Mobile Menu */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-white shadow-sm">
        <img src={reparvMainLogo} alt="Reparv Logo" className="h-10" />
        <div className="flex gap-4 items-center justify-center">
          <FaUserCircle className="w-8 h-8 text-[#076300]" />
          <button
            className="p-2 rounded-md bg-gray-100 text-black hover:text-[#076300] active:scale-95"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <IoMdClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar hidden w-full h-[80px] md:flex items-center justify-center border-b-2">
        <div className="w-[300px] h-[80px] flex items-center justify-center">
          <img
            src={reparvMainLogo}
            alt="Reparv Logo"
            className="w-[100px] mb-2"
          />
        </div>
        <div className="w-full h-16 flex items-center justify-between text-lg font-semibold">
          <div className="flex gap-4 items-center text-[20px] text-black">
            <IoMenu
              onClick={() => setIsShortbar(!isShortBar)}
              className="w-8 h-8 cursor-pointer active:scale-95"
            />
            <p>{heading}</p>
          </div>
          <div className="flex items-center gap-6 mr-8">
            <FaUserCircle className="w-8 h-8 text-[#076300]" />
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
            {[
              {
                to: "/admin/salespartner",
                icon: overviewIcon,
                label: "Sales Partner",
              },
              {
                to: "/admin/onboardingpartner",
                icon: enquirersIcon,
                label: "Onboarding Partner",
              },
              {
                to: "/admin/territorypartner",
                icon: enquirersIcon,
                label: "Territory Partner",
              },
              {
                to: "/admin/projectpartner",
                icon: ticketingIcon,
                label: "Project Partner",
              },
            ].map(({ to, icon, label }) => (
              <NavLink
                onClick={() => {
                  setIsSidebarOpen(false);
                  getHeading(label);
                }}
                key={to}
                to={to}
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

        {/* Content */}
        <div className="flex-1 p-4 md:pl-0 md:pt-0  overflow-scroll scrollbar-hide">
          <Outlet />
        </div>
      </div>

      {/* Inquiry Form (optional display trigger) */}
      {/* {showInquiryForm && (
        <div className="fixed z-[62] w-full h-screen bg-[#dadada8f] flex md:items-center md:justify-center">
          <div className="bg-white p-4 sm:p-6 sm:rounded-2xl shadow-lg max-w-3xl w-full overflow-scroll scrollbar-hide">
            <div className="flex items-center justify-between sm:p-6 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#076300]">
                Find Your Dream Property – Get in Touch!
              </h2>
              <RxCross2
                onClick={() => setShowInquiryForm(false)}
                className="w-7 h-7 cursor-pointer hover:text-[#076300] active:scale-95"
              />
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                />
                <SelectCity value={formData.city} onChange={handleChange} />
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066]">
                <label htmlFor="message" className="ml-1">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Enter your Message here.."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                  rows="4"
                ></textarea>
              </div>
              <div className="w-full flex items-center justify-center pb-5">
                <button
                  type="submit"
                  className="w-40 h-12 bg-[#0BB501] text-white text-base rounded-md hover:bg-green-700 active:scale-95"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
}

const Input = ({ label, name, value, onChange }) => (
  <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066]">
    <label htmlFor={name} className="ml-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      id={name}
      placeholder={`Enter ${label}`}
      value={value}
      onChange={onChange}
      className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
      required
    />
  </div>
);

const SelectCity = ({ value, onChange }) => (
  <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066]">
    <label htmlFor="city" className="ml-1">
      Select City
    </label>
    <select
      name="city"
      value={value}
      onChange={onChange}
      className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
      required
    >
      <option value="">Select City</option>
      <option value="Nagpur">Nagpur</option>
      <option value="Chandrapur">Chandrapur</option>
      <option value="Wardha">Wardha</option>
    </select>
  </div>
);

export default AdminLayout;
