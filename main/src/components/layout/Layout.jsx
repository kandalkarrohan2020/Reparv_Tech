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
import { useNavigate } from "react-router-dom";
import SuccessScreen from "../SuccessScreen";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import JoinOurTeamDropdown from "../JoinOurTeamDropdown";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import PriceSummery from "../property/PriceSummery";
import { useInView } from "react-intersection-observer";
import BenefitsPopup from "../property/BenefitsPopup";
import SiteVisitPopup from "../property/SiteVisitPopup";
import FilterSidebar from "../FilterSidebar";

function Layout() {
  const {
    showSuccess,
    URI,
    successScreen,
    setSuccessScreen,
    selectedCity,
    setSelectedCity,
    showPriceSummery,
    setShowPriceSummery,
    showBenefitsPopup,
    setShowBenefitsPopup,
    showSiteVisitPopup,
    setShowSiteVisitPopup,
    showFilterPopup,
    setShowFilterPopup,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { ref: footerRef, inView: footerInView } = useInView({
    threshold: 0.1,
  });
  const [videoInView, setVideoInView] = useState(false);
  const [otherPropertiesInView, setOtherPropertiesInView] = useState(false);

  const isIntersecting = footerInView || videoInView;
  const isScrolling = footerInView || otherPropertiesInView;

  const [showSidebar, setShowSidebar] = useState(false);
  const getNavLinkClass = (path) => {
    return location.pathname === path ? "font-bold text-[#0BB501]" : "";
  };

  const [cities, setCities] = useState([]);

  // *Fetch Data from API*
  const fetchAllCity = async () => {
    try {
      const response = await fetch(URI + "/frontend/properties/cities", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cities.");

      const data = await response.json();
      setCities(data); // Sets the cities array
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchAllCity();
  }, []);

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
        <div
          className={`selectCity ${
            location.pathname !== "/about" ? "sm:inline-block" : "hidden"
          } hidden min-w-[50px] max-w-[180px] relative`}
        >
          <div className="flex lg:gap-1 items-center justify-center text-lg font-semibold text-black lg:p-1">
            <CiLocationOn className="w-5 h-5" />
            <span className="hidden sm:block md:hidden xl:block">
              {selectedCity || "Select City"}
            </span>
            <RiArrowDropDownLine className="w-6 h-6 text-[#000000B2]" />
          </div>

          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            value={selectedCity}
            onChange={(e) => {
              const action = e.target.value;
              setSelectedCity(action);
              navigate("/properties");
            }}
          >
            <option value="">Select City</option>
            {cities?.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
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

      {/* container */}
      <div className="w-full pt-15 sm:pt-22 sm:bg-[#FAFAFA]">
        <Outlet
          context={{
            setVideoInView,
            isIntersecting,
            setOtherPropertiesInView,
            isScrolling,
          }}
        />
      </div>

      {/* footer */}
      <div ref={footerRef} className="w-full md:block hidden bg-black">
        <div className="footer w-full max-w-7xl mx-auto  md:flex flex-col gap-8 bg-[#000000] text-white py-15 px-18 lg:px-25">
          <div className="footerTop flex items-center justify-start ">
            <Link to="/">
              <img src={footerLogo} alt="" className="w-[135px]" />
            </Link>
          </div>

          <div className="footerBody w-full flex justify-between">
            <div className="leftBody flex flex-col gap-5 text-lg font-medium">
              <h3 className="text-xl font-bold">Company</h3>
              <p className="cursoe-pointer">
                <Link to="/blogs">Blogs</Link>
              </p>
              <p className="cursoe-pointer">
                <Link to="/properties">Properties</Link>
              </p>
              <p className="cursor-pointer">
                <Link to="/about-us">About Us</Link>
              </p>
              <p className="cursor-pointer">
                <Link to="/contact-us">Contact Us</Link>
              </p>
            </div>

            <div className="midBody flex flex-col gap-5 text-lg font-medium !text-White">
              <h3 className="text-xl font-bold">Become a Professional</h3>
              <p
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://partners.reparv.in/sales-partner",
                    "_blank"
                  );
                }}
              >
                Sales Partner
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://partners.reparv.in/project-partner",
                    "_blank"
                  );
                }}
              >
                Project Partner
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://partners.reparv.in/territory-partner",
                    "_blank"
                  );
                }}
              >
                Territory Partner
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  window.open(
                    "https://partners.reparv.in/onboarding-partner",
                    "_blank"
                  );
                }}
              >
                Onboarding Partner
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
            <Link to="/">
              <img src={footerLogo} alt="" className="w-[135px]" />
            </Link>
          </div>

          <div className="footerRight flex flex-col gap-5 text-xs leading-1.5 sm:text-lg font-medium">
            <Link to="/blogs">Blogs</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/contact-us">Contact Us</Link>
            <JoinOurTeamDropdown textColour={"white"}></JoinOurTeamDropdown>
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

      {/* Show Book Site Form Screen */}

      {showSiteVisitPopup && (
        <div className="Container w-full h-screen bg-[#898989b6] fixed z-50 flex md:items-center md:justify-center">
          <div className="w-full flex flex-col items-center justify-end sm:justify-center h-[90vh] absolute bottom-0">
            <SiteVisitPopup />
          </div>
        </div>
      )}

      {/* Show Success Screen */}
      {successScreen?.show && <SuccessScreen />}

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
