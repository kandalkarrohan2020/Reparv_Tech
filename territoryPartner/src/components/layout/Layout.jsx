import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import reparvMainLogo from "../../assets/layout/reparvMainLogo.svg";
import overviewIcon from "../../assets/layout/overviewIcon.svg";
import enquirersIcon from "../../assets/layout/enquirersIcon.svg";
import customersIcon from "../../assets/layout/customersIcon.svg";
import ticketingIcon from "../../assets/layout/ticketingIcon.svg";
import calenderIcon from "../../assets/layout/calenderIcon.svg";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Profile from "../Profile";
import { useAuth } from "../../store/auth";
import LogoutButton from "../LogoutButton";
import { FaUserCircle } from "react-icons/fa";

import SuccessScreen from "../property/SuccessScreen";
import SiteVisitPopup from "../property/SiteVisitPopup";
import PriceSummery from "../property/PriceSummery";
import FilterSidebar from "../FilterSidebar";
import BenefitsPopup from "../property/BenefitsPopup";

function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortBar, setIsShortbar] = useState(false);
  const [heading, setHeading] = useState(localStorage.getItem("head"));
  const [propertyPath, setPropertyPath] = useState("");
  const {
    showProfile,
    URI,
    setShowProfile,
    showTicket,
    setShowTicket,
    showTicketForm,
    setShowTicketForm,
    showPropertyInfo,
    setShowPropertyInfo,
    showSuccess,
    setShowSuccess,
    showEnquiry,
    setShowEnquiry,
    showEnquiryStatusForm, setShowEnquiryStatusForm,
    showEnquirerPropertyForm, setShowEnquirerPropertyForm,
    showEnquiryForm, setShowEnquiryForm,
    showSiteVisitPopup,
    setShowSiteVisitPopup,
    setShowBenefitsPopup,
    showBenefitsPopup,
    showFilterPopup,
    setShowFilterPopup,
    showPriceSummery,
    setShowPriceSummery,
    showCustomer,
    setShowCustomer,
    showCustomerPaymentForm,
    setShowCustomerPaymentForm,
    isLoggedIn,
  } = useAuth();

  const overlays = [
    { state: showTicketForm, setter: setShowTicketForm },
    { state: showTicket, setter: setShowTicket },
    { state: showEnquiry, setter: setShowEnquiry },
    { state: showPropertyInfo, setter: setShowPropertyInfo },
    { state: showEnquiryForm, setter: setShowEnquiryForm },
    { state: showEnquiryStatusForm, setter: setShowEnquiryStatusForm },
    { state: showEnquirerPropertyForm, setter: setShowEnquirerPropertyForm },
    { state: showCustomer, setter: setShowCustomer },
    { state: showCustomerPaymentForm, setter: setShowCustomerPaymentForm },
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

  const fetchPropertyPath = async () => {
    try {
      const response = await fetch(`${URI}/territory-partner/profile`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      const data = await response.json(); 
      setPropertyPath(data.propertytype.toLowerCase());
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(()=> {
    fetchPropertyPath();
  },[]);

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
              { to: "/dashboard", icon: overviewIcon, label: "Dashboard" },
              { to: "/enquirers", icon: enquirersIcon, label: "Enquiries" },
              { to: "/customers", icon: customersIcon, label: "Customers" },
              { to: "/properties", icon: enquirersIcon, label: "Properties" },
              { to: "/tickets", icon: ticketingIcon, label: "Tickets" },
              { to: "/calender", icon: calenderIcon, label: "Calender" },
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
          className="flex-1 md:p-4 md:pl-0 md:pt-0 overflow-scroll scrollbar-hide"
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


      {/* Show Book Site Form Screen */}
      
      {showSiteVisitPopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <SiteVisitPopup />
          </div>
        </div>
      )}
      
      {/* Show Success Screen */}
      {showSuccess && <SuccessScreen />}

      {showPriceSummery && (
        <div
          onClick={() => {
            setShowPriceSummery(false);
          }}
          className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center"
        >
          <PriceSummery />
        </div>
      )}
     
      {showBenefitsPopup && (
        <div
          onClick={() => {
            setShowBenefitsPopup(false);
          }}
          className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center"
        >
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <BenefitsPopup />
          </div>
        </div>
      )}

      {showFilterPopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end h-[90vh] absolute bottom-0">
            <FilterSidebar />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
