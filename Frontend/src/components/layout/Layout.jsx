import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import reparvMainLogo from "../../assets/layout/reparvMainLogo.svg";
import calenderIcon from "../../assets/layout/calenderIcon.svg";
import customersIcon from "../../assets/layout/customersIcon.svg";
import enquirersIcon from "../../assets/layout/enquirersIcon.svg";
import mapIcon from "../../assets/layout/mapIcon.svg";
import materialIcon from "../../assets/layout/materialIcon.svg";
import overviewIcon from "../../assets/layout/overviewIcon.svg";
import partnerIcon from "../../assets/layout/partnerIcon.svg";
import employeeIcon from "../../assets/layout/employeeIcon.svg";
import ticketingIcon from "../../assets/layout/ticketingIcon.svg";
import marketingIcon from "../../assets/layout/marketingIcon.svg";
import { Outlet } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Profile from "../Profile";
import { useAuth } from "../../store/auth";
import LogoutButton from "../LogoutButton";
import { FaUserCircle } from "react-icons/fa";

function Layout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShortBar, setIsShortbar] = useState(false);
  const [heading, setHeading ] = useState("Overview");
  const { showProfile, setShowProfile } = useAuth();
  let head;
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
      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center justify-between px-5 py-3 bg-white shadow-sm">
        <img src={reparvMainLogo} alt="Reparv Logo" className="h-10" />
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

      {/* Navbar */}
      <div className="navbar hidden w-full h-[80px] md:flex items-center justify-center border-b-2">
        <div className="navLogo w-[300px] h-[80px] flex items-center justify-center">
          <img src={reparvMainLogo} alt="Reparv Logo" className="w-[100px] mb-2"/>
        </div>
        
        <div className="navHeading w-full h-16 flex items-center justify-between text-lg font-semibold">
          <div className="left-heading h-8 flex gap-4 items-center justify-between text-[20px] leading-[19.36px] text-black">
          <IoMenu onClick={()=>{setIsShortbar(!isShortBar)}}
          className="w-8 h-8 cursor-pointer active:scale-95" /> <p>{heading}</p>
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
          className={`w-64 ${isShortBar?"md:w-[95px]":"md:w-60"} h-full fixed overflow-y-scroll scrollbar-hide bg-white shadow-md md:shadow-none md:static top-0 left-0 z-20 md:bg-[#F5F5F6] transition-transform duration-300 transform ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2 p-4 md:gap-2">
           <img src={reparvMainLogo} alt="Reparv Logo" className="md:hidden block"/>
            {/* Navigation Links */}
            {[
              { to: "/overview", icon: overviewIcon, label: "Overview" },
              { to: "/enquirers", icon: enquirersIcon, label: "Enquirers" },
              { to: "/map", icon: mapIcon, label: "Map" },
              { to: "/calender", icon: calenderIcon, label: "Calendar" },
              { to: "/customers", icon: customersIcon, label: "Customers" },
              { to: "/builders", icon: partnerIcon, label: "Builders" },
              { to: "/sales", icon: partnerIcon, label: "Sales" },
              { to: "/auction", icon: partnerIcon, label: "Auction" },
              { to: "/employee", icon: employeeIcon, label: "Employee" },
              { to: "/ticketing", icon: ticketingIcon, label: "Ticketing" },
              {
                to: "/raw-materials",
                icon: materialIcon,
                label: "Raw Materials",
              },
              {
                to: "/marketing",
                icon: marketingIcon,
                label: "Marketing Templates",
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
                <span className={`text-sm md:text-base ${isShortBar?"hidden":"block"}`}>{label}</span>
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
    </div>
  );
}

export default Layout;
