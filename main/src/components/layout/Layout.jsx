import React, { useState, useEffect } from "react";
import reparvLogo from "../../assets/reparvLogo.svg";
import footerLogo from "../../assets/footerLogo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import SuccessScreen from "../SuccessScreen";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


function Layout() {
  const { showInquiryForm, setShowInquiryForm, showSuccess, setShowSuccess, URI } =
    useAuth();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "font-semibold text-[#0BB501]" : "";
  };

  useEffect(()=>{
     setFormData({...formData, propertyid: id});
  },[showInquiryForm])

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
      const response = await fetch(`${URI}/frontend/enquiry/add`, {
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

  return (
    <div className="layout w-full flex flex-col bg-white overflow-hidden ">
      <div className="navbar z-30 fixed w-full h-15 gap-15 sm:h-22 px-8 lg:px-25 flex items-center justify-between  bg-white shadow-[0px_1px_3px_1px_#00000026]">
        {/* Mobile Sidebar */}
        {showSidebar && (
          <div className="sidebar w-full fixed md:hidden top-0 right-0 z-10 bg-white flex flex-col items-end gap-5 pb-8 shadow-[0px_1px_3px_1px_#00000026]">
            <div className="div w-full flex items-center justify-between h-15 sm:h-22 shadow-[0px_1px_3px_1px_#00000026] px-8">
              <div className="flex items-center justify-center ">
                <img
                  src={reparvLogo}
                  alt=""
                  className="w-[90px] md:w-[120px] lg:w-[135px]"
                />
              </div>
              <div className="menu flex items-center justify-between md:hidden">
                <RxCross2
                  onClick={() => {
                    setShowSidebar(false);
                  }}
                  className="w-7 h-7 cursor-pointer hover:text-[#076300] active:scale-95"
                />
              </div>
            </div>

            <div className="w-60 flex flex-col gap-5 px-5 tracking-[0.2em] font-medium text-[#110229]">
              <NavLink
                to="/"
                onClick={() => {
                  setShowSidebar(false);
                }}
                className={`${getNavLinkClass("/")} ${getNavLinkClass(
                  "/flat"
                )} ${getNavLinkClass("/plot")} ${getNavLinkClass(
                  "/rental"
                )} ${getNavLinkClass("/farmvilla")} ${getNavLinkClass(
                  "/lease"
                )} ${getNavLinkClass("/farm")} ${getNavLinkClass("/property")}`}
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => {
                  setShowSidebar(false);
                }}
                to="/about-us"
                className={`${getNavLinkClass("/about-us")}`}
              >
                About Us
              </NavLink>
              <NavLink
                onClick={() => {
                  setShowSidebar(false);
                }}
                to="/contact-us"
                className={`${getNavLinkClass("/contact-us")}`}
              >
                Contact Us
              </NavLink>
              <NavLink
                onClick={() => {
                  setShowSidebar(false);
                }}
                to="/join-our-team"
                className={`${getNavLinkClass("/join-our-team")}`}
              >
                Join Our Team
              </NavLink>
            </div>
          </div>
        )}

        {/* Navbar */}
        <div className="flex items-center justify-end">
          <img
            src={reparvLogo}
            alt=""
            className="w-[90px] md:w-[120px] lg:w-[135px]"
          />
        </div>
        <div className="menu flex items-center justify-between md:hidden">
          <IoMdMenu
            onClick={() => {
              setShowSidebar(true);
            }}
            className="w-7 h-7 font-semibold cursor-pointer hover:text-[#076300] active:scale-95"
          />
        </div>

        <div className="navlink hidden md:flex items-center justify-start gap-8 xl:gap-15 text-base leading-[36px] tracking-[0.2em] font-medium text-[#110229]">
          <NavLink
            to="/"
            className={`${getNavLinkClass("/")} ${getNavLinkClass(
              "/flat"
            )} ${getNavLinkClass("/plot")} ${getNavLinkClass(
              "/rental"
            )} ${getNavLinkClass("/farmvilla")} ${getNavLinkClass(
              "/lease"
            )} ${getNavLinkClass("/farm")} ${getNavLinkClass("/property")}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={`${getNavLinkClass("/about-us")} flex gap-1`}
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact-us"
            className={`${getNavLinkClass("/contact-us")} flex gap-1`}
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/join-our-team"
            className={`${getNavLinkClass("/join-our-team")} flex gap-1`}
          >
            Join Our Team
          </NavLink>
        </div>
      </div>

      {/* container */}
      <div className="w-full pt-15 sm:pt-22 bg-white">
        <Outlet />
      </div>

      {/* footer */}
      <div className="w-full bg-black">
        <div className="footer w-full max-w-7xl mx-auto hidden md:flex flex-col gap-8 bg-[#000000] text-white py-15 px-18 lg:px-25">
          <div className="footerTop flex items-center justify-start ">
            <img src={footerLogo} alt="" className="w-[135px]" />
          </div>

          <div className="footerBody w-full flex justify-between">
            <div className="leftBody flex flex-col gap-9 text-lg font-medium">
              <h3 className="text-xl font-bold">Company</h3>
              <p className="block xl:hidden">Properties</p>
              <p className="cursor-pointer">
                <Link to="/about-us">About Us</Link>
              </p>
              <p className="cursor-pointer">
                <Link to="/contact-us">Contact Us</Link>
              </p>
            </div>

            <div className="leftBody hidden xl:flex flex-col gap-7 text-lg font-medium">
              <h3 className="text-xl font-bold">Properties</h3>
              <div className="grid grid-cols-2 gap-x-10 text-base">
                <p className="cursor-pointer pr-4 text-base">
                  <Link to="/flat">Flat</Link>
                </p>
                <p className="cursor-pointer text-base">
                  <Link to="/plot">Plot</Link>
                </p>
                <p className="cursor-pointer text-base">
                  <Link to="/new-project">New Project</Link>
                </p>
                <p className="cursor-pointer ">
                  <Link to="/resale">Resale</Link>
                </p>
                <p className="cursor-pointer ">
                  <Link to="/farm-house">Farm House</Link>
                </p>
                <p className="cursor-pointer ">
                  <Link to="/rental">Rental</Link>
                </p>
                <p className="cursor-pointer ">
                  <Link to="/row-house">Row House</Link>
                </p>
                <p className="cursor-pointer ">
                  <Link to="/lease">Lease</Link>
                </p>
              </div>
            </div>

            <div className="midBody flex flex-col gap-7 text-lg font-medium">
              <h3 className="text-xl font-bold">Become a Professional</h3>
              <p className="cursor-pointer">
                <Link to="/join-our-team">Join Our Team</Link>
              </p>
            </div>

            <div className="rightBody flex flex-col gap-7">
              <h3 className="text-xl font-bold">Social Link</h3>
              <div className="socialLink flex gap-2 text-2xl">
                <Link
                  to="https://www.facebook.com/reparv/"
                  className="facebook flex items-center justify-center w-13 h-13 bg-[#141414] rounded-full"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  to="https://www.linkedin.com/company/105339179"
                  className="linkedin flex items-center justify-center w-13 h-13 bg-[#141414] rounded-full"
                >
                  <FaLinkedin />
                </Link>
                <Link
                  to="https://www.instagram.com/reparv.official/"
                  className="twitter flex items-center justify-center w-13 h-13 bg-[#141414] rounded-full"
                >
                  <FaInstagram />
                </Link>
                <Link
                  to="https://www.youtube.com/@reparv"
                  className="youtube flex items-center justify-center w-13 h-13 bg-[#141414] rounded-full"
                >
                  <FaYoutube />
                </Link>
              </div>
            </div>
          </div>

          <div className="footerBottom text-lg py-3 leading-6 flex gap-4 md:gap-6 tracking-[0.6%] text-white/60 ">
            <span>@2024 reparv.com All Right Reserved</span>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      <div className="footer md:hidden w-full flex flex-col items-center justify-start gap-4 bg-[#000000] text-white py-15 px-10">
        <div className="footerContainer w-full flex items-start justify-between py-2">
          <div className="footerLeft flex items-center justify-start ">
            <img src={footerLogo} alt="" className="w-[135px]" />
          </div>

          <div className="footerRight flex flex-col gap-5 text-xs leading-1.5 sm:text-lg font-medium">
            <Link to="/home">Properties</Link>
            <Link to="/join-our-team">Join Our Team</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
          </div>
        </div>

        <div className="rightBody flex flex-col gap-3">
          <h3 className="text-lg font-bold">Social Link</h3>
          <div className="socialLink flex gap-2 text-md">
            <Link
              to="https://www.facebook.com/reparv/"
              className="facebook flex items-center justify-center w-11 h-11 bg-[#141414] rounded-full"
            >
              <FaFacebookF />
            </Link>
            <Link
              to="https://www.linkedin.com/company/105339179"
              className="linkedin flex items-center justify-center w-11 h-11 bg-[#141414] rounded-full"
            >
              <FaLinkedin />
            </Link>
            <Link
              to="https://www.instagram.com/reparv.official/"
              className="twitter flex items-center justify-center w-11 h-11 bg-[#141414] rounded-full"
            >
              <FaInstagram />
            </Link>
            <Link
              to="https://www.youtube.com/@reparv"
              className="youtube flex items-center justify-center w-11 h-11 bg-[#141414] rounded-full"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>

        <div className="footerBottom text-xs sm:text-lg py-3 leading-6 flex gap-4 md:gap-6 tracking-[0.6%] text-white/60 ">
          <span>@2024 reparv.com All Right Reserved</span>
        </div>
      </div>

      {/* Inquiry From */}
      {showInquiryForm && (
        <div className="Container w-full h-screen bg-[#dadada8f] fixed z-50 flex md:items-center md:justify-center">
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
                    <option value="Amaravati">Amaravati</option>
                  </select>
                </div>

                <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
                  <label htmlFor="city" className="ml-1">
                    Select Location
                  </label>
                  <select
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="Nagpur">Anand Nagar</option>
                    <option value="Chandrapur">Ram Nagar</option>
                    <option value="Amaravati">Adarsh Nagar</option>
                  </select>
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
