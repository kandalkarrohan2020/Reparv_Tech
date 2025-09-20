import React, { useState, useEffect, useRef } from "react";
import reparvLogo from "../../assets/reparvLogo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";

function Navbar() {
  const {
    URI,
    selectedCity,
    setSelectedCity,
    showCitySelector,
    setShowCitySelector,
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState(false);
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "font-bold text-[#0BB501]" : "";
  };
  return (
    <div className="navbar z-30 fixed w-full h-15 gap-5 sm:h-22 px-8 lg:px-25 flex items-center justify-between bg-white shadow-[0px_1px_3px_1px_#00000026]">
      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="sidebar w-full fixed md:hidden top-0 right-0 z-10 bg-white flex flex-col items-end gap-5 pb-8 shadow-[0px_1px_3px_1px_#00000026]">
          <div className="div w-full flex items-center justify-between h-15 sm:h-22 shadow-[0px_1px_3px_1px_#00000026] px-8">
            <div className="flex items-center justify-center ">
              <Link to="/">
                <img
                  src={reparvLogo}
                  alt=""
                  className="w-[90px] md:w-[120px] lg:w-[135px]"
                />
              </Link>
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

          <div className="w-full flex flex-col gap-3 px-10 font-medium text-[#110229]">
            <NavLink
              to="/"
              onClick={() => {
                setShowSidebar(false);
              }}
              className={`${getNavLinkClass("/")}`}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => {
                setShowSidebar(false);
              }}
              to="/properties"
              className={`${getNavLinkClass("/properties")}`}
            >
              Properties
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
            <div
              onClick={() => {
                window.open("https://users.reparv.in/", "_blank");
                setShowSidebar(false);
              }}
              className="min-w-40 px-2 py-2 flex items-center justify-center cursor-pointer text-sm font-medium hover:font-semibold border border-gray-200 bg-[#0BB501] text-white rounded-lg active:scale-95"
            >
              Sell Your Property
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="flex items-center justify-end">
        <Link to="/">
          <img
            src={reparvLogo}
            alt=""
            className="w-[90px] md:w-[120px] lg:w-[135px]"
          />
        </Link>
      </div>

      {/* City Selector  */}
      <div
        onClick={() => {
          setShowCitySelector(true);
          navigate("/properties");
        }}
        className={`selectCity ${
          location.pathname !== "/check-eligibility"
            ? "sm:inline-block"
            : "hidden"
        } hidden min-w-[50px] max-w-[210px] relative py-2 rounded-lg px-4 cursor-pointer`}
      >
        <div className="flex lg:gap-1 items-center justify-center text-base font-semibold  text-black lg:p-1 ">
          <CiLocationOn className="w-5 h-5" />
          <span className="block whitespace-nowrap ">
            {selectedCity
              ? selectedCity.length > 12
                ? `${selectedCity.slice(0, 11)}...`
                : selectedCity
              : "Select City"}
          </span>
          <RiArrowDropDownLine className="w-6 h-6 text-[#000000B2]" />
        </div>
      </div>

      <div className="menu flex items-center justify-between md:hidden">
        <IoMdMenu
          onClick={() => {
            setShowSidebar(true);
          }}
          className="w-7 h-7 font-semibold cursor-pointer hover:text-[#076300] active:scale-95"
        />
      </div>

      <div className="navlink hidden md:flex items-center justify-start gap-5 lg:gap-6 xl:gap-14 text-base font-bold xl:text-lg leading-[30px] tracking-[1px] lg:tracking-[0.1em] text-[#110229]">
        <NavLink to="/" className={`${getNavLinkClass("/")}`}>
          Home
        </NavLink>
        <NavLink
          to="/properties"
          className={`${getNavLinkClass("/properties")} flex gap-1`}
        >
          Properties
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

        <div
          onClick={() => {
            window.open("https://users.reparv.in/", "_blank");
            setShowSidebar(false);
          }}
          className="min-w-40 xl:min-w-50 px-2 py-4 xl:py-6 flex items-center justify-center cursor-pointer text-sm xl:text-lg leading-[0] tracking-[0] font-medium hover:font-semibold text-white border-2 bg-[#0BB501] border-gray-200 hover:border-[#0BB501] rounded-lg "
        >
          Sell Your Property
        </div>

        {/*<JoinOurTeamDropdown className={`flex gap-1`}></JoinOurTeamDropdown>*/}
      </div>
    </div>
  );
}

export default Navbar;
