import React, { useState, useEffect, useRef } from "react";
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
import SuccessScreen from "../SuccessScreen";
import { Link } from "react-router-dom";

function Layout() {
  const {
    successScreen, 
  } = useAuth();

  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "font-semibold text-[#0BB501]" : "";
  };

  return (
    <div className="layout w-full flex flex-col bg-white overflow-hidden ">
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

            <div className="w-full flex flex-col gap-3 px-10 font-semibold text-[#110229]">
              <NavLink
                to="/sales-partner"
                onClick={() => {
                  setShowSidebar(false);
                }}
                className={`${getNavLinkClass("/sales-partner")} ${getNavLinkClass("/")}`}
              >
                Sales Partner
              </NavLink>
              <NavLink
                onClick={() => {
                  setShowSidebar(false);
                }}
                to="/project-partner"
                className={`${getNavLinkClass("/project-partner")}`}
              >
                Project Partner
              </NavLink>
              <NavLink
                onClick={() => {
                  setShowSidebar(false);
                }}
                to="/territory-partner"
                className={`${getNavLinkClass("/territory-partner")}`}
              >
                Territory Partner
              </NavLink>
              <NavLink
                onClick={() => {
                  setShowSidebar(false);
                }}
                to="/onboarding-partner"
                className={`${getNavLinkClass("/onboarding-partner")}`}
              >
                Onboarding Partner
              </NavLink>
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
        <div className="menu flex items-center justify-between md:hidden">
          <IoMdMenu
            onClick={() => {
              setShowSidebar(true);
            }}
            className="w-7 h-7 font-semibold cursor-pointer hover:text-[#076300] active:scale-95"
          />
        </div>

        <div className="navlink hidden md:flex items-center justify-start gap-7 lg:gap-7 xl:gap-15 text-base leading-[36px] tracking-[0.2em] font-medium text-[#110229]">
          <NavLink to="/sales-partner" className={`${getNavLinkClass("/sales-partner")} ${getNavLinkClass("/")}`}>
            Sales Partner
          </NavLink>
          <NavLink
            to="/project-partner"
            className={`${getNavLinkClass("/project-partner")} flex gap-1`}
          >
            Project Partner
          </NavLink>
          <NavLink
            to="territory-partner"
            className={`${getNavLinkClass("/territory-partner")} flex gap-1`}
          >
            Territory Partner
          </NavLink>
          <NavLink
            to="/onboarding-partner"
            className={`${getNavLinkClass("/onboarding-partner")} flex gap-1`}
          >
            Onboarding Partner
          </NavLink>
        </div>
      </div>

      {/* container */}
      <div className="w-full pt-15 sm:pt-22 sm:bg-[#FAFAFA]">
        <Outlet />
      </div>

      {/* footer */}
      <div className="w-full md:block hidden bg-black">
        <div className="footer w-full max-w-7xl mx-auto  md:flex flex-col gap-8 bg-[#000000] text-white py-15 px-18 lg:px-25">
          <div className="footerTop flex items-center justify-start ">
            <Link onClick={() => {window.open(
                  "https://www.reparv.in",
                  "_blank"
                )}}>
              <img src={footerLogo} alt="" className="w-[135px]" />
            </Link>
          </div>

          <div className="footerBody w-full flex justify-between">
            <div className="leftBody flex flex-col gap-5 text-lg font-medium">
              <h3 className="text-xl font-bold">Company</h3>
              <p className="cursor-pointer">
                <Link onClick={() => {window.open(
                  "https://www.reparv.in/blog",
                  "_blank"
                )}} >Blog</Link>
              </p>
              <p className="cursor-pointer">
                <Link onClick={() => {window.open(
                  "https://www.reparv.in/properties",
                  "_blank"
                )}}>Properties</Link>
              </p>
              <p className="cursor-pointer">
                <Link onClick={() => {window.open(
                  "https://www.reparv.in/about-us",
                  "_blank"
                )}}>About Us</Link>
              </p>
              <p className="cursor-pointer">
                <Link onClick={() => {window.open(
                  "https://www.reparv.in/contact-us",
                  "_blank"
                )}}>Contact Us</Link>
              </p>
            </div>

            <div className="midBody flex flex-col gap-5 text-lg font-medium !text-White">
              <h3 className="text-xl font-bold">Become a Professional</h3>
              <p className="cursor-pointer">
                <Link to="/sales-partner">Sales Partner</Link>
              </p>
              <p className="cursor-pointer">
                <Link to="/project-partner">Project Partner</Link>
              </p>
              <p className="cursor-pointer">
                <Link to="/territory-partner">Territory Partner</Link>
              </p>
              <p className="cursor-pointer">
                <Link to="/onboarding-partner">Onboarding Partner</Link>
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
            <Link to="/terms-and-conditions" className="cursor-pointer">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/cancellation-policy" className="cursor-pointer">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile footer */}
      <div className="footer  md:hidden w-full flex flex-col items-center justify-start gap-4 bg-[#000000] text-white py-15 px-10">
        <div className="footerContainer w-full flex items-start justify-between py-2">
          <div className="footerLeft flex items-center justify-start ">
            <Link to="/"><img src={footerLogo} alt="" className="w-[135px]" /></Link>
          </div>

          <div className="footerRight flex flex-col gap-5 text-xs leading-1.5 sm:text-lg font-medium">
            <Link onClick={() => {window.open(
                  "https://www.reparv.in/blog",
                  "_blank"
                )}}>Blog</Link>
            <Link onClick={() => {window.open(
                  "https://www.reparv.in/properties",
                  "_blank"
                )}}>Properties</Link>
            <Link onClick={() => {window.open(
                  "https://www.reparv.in/about-us",
                  "_blank"
                )}}>About Us</Link>
            <Link onClick={() => {window.open(
                  "https://www.reparv.in/contact-us",
                  "_blank"
                )}}>Contact Us</Link>
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

        <div className="footerBottom w-full text-xs sm:text-lg py-3 leading-6 flex flex-col items-center justify-center gap-4 md:gap-6 tracking-[0.6%] text-white/60 ">
          <span>@2024 reparv.com All Right Reserved</span>
          <div className="flex text-[10px] w-full items-center justify-evenly">
            <Link to="/terms-and-conditions" className="cursor-pointer">
              Terms & Conditions
            </Link>
            <Link to="/privacy-policy" className="cursor-pointer">
              Privacy Policy
            </Link>
            <Link to="/cancellation-policy" className="cursor-pointer">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    
    {/* Show Success Screen */}
    {successScreen?.show && <SuccessScreen />}
    </div>
  );
}

export default Layout;
