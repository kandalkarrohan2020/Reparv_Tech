import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import reparvMainLogo from "../../assets/layout/reparvMainLogo.png";
import calenderIcon from "../../assets/layout/calenderIcon.png";
import customersIcon from "../../assets/layout/customersIcon.png";
import enquirersIcon from "../../assets/layout/enquirersIcon.png";
import mapIcon from "../../assets/layout/mapIcon.png";
import materialIcon from "../../assets/layout/materialIcon.png";
import overviewIcon from "../../assets/layout/overviewIcon.png";
import partnerIcon from "../../assets/layout/partnerIcon.png";
import ticketingIcon from "../../assets/layout/ticketingIcon.png";
import marketingIcon from "../../assets/layout/marketingIcon.png";
import { Outlet } from 'react-router-dom';

function Layout() {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? 'font-semibold bg-[#E3FFDF] shadow-[0px_1px_0px_0px_rgba(0,_0,_0,_0.1)]'
      : '';
  };

  return (
    <div className="w-full h-screen p-[16px] flex bg-[#F5F5F6]">
      {/* Sidebar */}
      <div className="w-[240px] h-[744px] p-[16px] rounded-[16px]">
        <div className="flex flex-col gap-[8px] fixed">
          {/* Logo */}
          <div className="w-[208px] h-[56px] flex justify-center items-center">
            <img src={reparvMainLogo} alt="Reparv Logo" className="w-[208px] h-[56px]" />
          </div>

          {/* Navigation Links */}
          <NavLink
            to="/"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={overviewIcon} alt="Overview Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Overview</p>
          </NavLink>

          <NavLink
            to="enquirers"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/enquirers')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={enquirersIcon} alt="Enquirers Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Enquirers</p>
          </NavLink>

          <NavLink
            to="map"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/map')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={mapIcon} alt="Map Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Map</p>
          </NavLink>

          <NavLink
            to="calender"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/calender')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={calenderIcon} alt="Calendar Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Calendar</p>
          </NavLink>

          <NavLink
            to="customers"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/customers')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={customersIcon} alt="Customers Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Customers</p>
          </NavLink>

          <NavLink
            to="partners"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/partners')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={partnerIcon} alt="Partners Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Partners</p>
          </NavLink>

          <NavLink
            to="ticketing"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/ticketing')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={ticketingIcon} alt="Ticketing Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Ticketing</p>
          </NavLink>

          <NavLink
            to="raw-materials"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/raw-materials')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={materialIcon} alt="Raw Materials Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Raw Materials</p>
          </NavLink>

          <NavLink
            to="marketing"
            className={`flex items-center justify-start w-[208px] h-[64px] p-[12px] rounded-[20px] gap-[12px] text-black transition-all duration-300 ${getNavLinkClass('/marketing')}`}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center p-[8px] rounded-[12px] bg-white">
              <img src={marketingIcon} alt="Marketing Icon" />
            </div>
            <p className="text-left text-[16px] leading-[24px]">Marketing Templates</p>
          </NavLink>
        </div>
      </div>

      {/* Outlet for rendering the routed components */}
      <Outlet />
    </div>
  );
}

export default Layout;
