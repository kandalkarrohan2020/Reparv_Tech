import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import reparvAppLogo from "../../assets/reparvIcon.png";
import reparvMainLogo from "../../assets/layout/reparvMainLogo.svg";
import calenderIcon from "../../assets/layout/calenderIcon.svg";
import enquirersIcon from "../../assets/layout/enquirersIcon.svg";
import customersIcon from "../../assets/layout/customersIcon.svg";
import overviewIcon from "../../assets/layout/overviewIcon.svg";
import marketingIcon from "../../assets/layout/marketingIcon.svg";
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
import SiteVisitPopup from "../property/SiteVisitPopup";
import PriceSummery from "../property/PriceSummery";
import FilterSidebar from "../FilterSidebar";
import BenefitsPopup from "../property/BenefitsPopup";
import KYC from "../userVerification/KYC";
import Agreement from "../Agreement";

function Layout() {
  const { id } = useParams();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortBar, setIsShortbar] = useState(false);
  const [heading, setHeading] = useState(localStorage.getItem("head"));
  const {
    URI,
    user,
    showProfile,
    setShowProfile,
    showKYC,
    setShowKYC,
    showPropertyForm,
    setShowPropertyForm,
    showUploadImagesForm,
    setShowUploadImagesForm,
    showAdditionalInfoForm,
    setShowAdditionalInfoForm,
    showEnquiryStatusForm,
    setShowEnquiryStatusForm,
    showAssignTerritory,
    setShowAssignTerritory,
    showPropertyInfo,
    setShowPropertyInfo,
    showEnquiryForm,
    setShowEnquiryForm,
    showTicket,
    setShowTicket,
    showTicketForm,
    setShowTicketForm,
    showEnquiry,
    setShowEnquiry,
    showSuccess,
    setShowSuccess,
    isLoggedIn,
    showSiteVisitPopup,
    setShowSiteVisitPopup,
    setShowBenefitsPopup,
    showBenefitsPopup,
    showFilterPopup,
    setShowFilterPopup,
    showPriceSummery,
    setShowPriceSummery,
    showEnquirerPropertyForm,
    setShowEnquirerPropertyForm,
    showCustomer,
    setShowCustomer,
    showCustomerPaymentForm,
    setShowCustomerPaymentForm,
  } = useAuth();

  const overlays = [
    { state: showPropertyForm, setter: setShowPropertyForm },
    { state: showUploadImagesForm, setter: setShowUploadImagesForm },
    { state: showAdditionalInfoForm, setter: setShowAdditionalInfoForm },
    { state: showEnquiryStatusForm, setter: setShowEnquiryStatusForm },
    { state: showAssignTerritory, setter: setShowAssignTerritory },
    { state: showTicketForm, setter: setShowTicketForm },
    { state: showTicket, setter: setShowTicket },
    { state: showEnquiry, setter: setShowEnquiry },
    { state: showEnquiryForm, setter: setShowEnquiryForm },
    { state: showPropertyInfo, setter: setShowPropertyInfo },
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

  const [agreementData, setAgreementData] = useState("");

  // Fetch Agreement Status
  const fetchAgreement = async (id) => {
    try {
      const response = await fetch(`${URI}/admin/salespersons/get/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch Agreement.");
      const data = await response.json();
      console.log(data);
      setAgreementData(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchAgreement(user?.id);
  }, []);

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
              { to: "/enquirers", icon: enquirersIcon, label: "Enquirers" },
              { to: "/calender", icon: calenderIcon, label: "Calendar" },
              { to: "/customers", icon: customersIcon, label: "Customers" },
              { to: "/properties", icon: enquirersIcon, label: "Properties" },
              { to: "/tickets", icon: ticketingIcon, label: "Tickets" },
              
              {
                to: "/marketing-content",
                icon: marketingIcon,
                label: "Marketing Content",
              },
              { to: "/download-apk", icon: reparvAppLogo, label: "Download" },

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

      {/* Show Agreement Form Screen */}
      <Agreement
        fetchAgreement={fetchAgreement}
        agreementData={agreementData}
        setAgreementData={setAgreementData}
      />

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
