import React, { useState, useEffect } from "react";
import footerLogo from "../../assets/footerLogo.svg";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import JoinOurTeamDropdown from "../JoinOurTeamDropdown";

function Footer() {
  return (
    <>
    {/* footer */}
    <div className="w-full md:block hidden bg-black">
    <div className="footer w-full max-w-7xl mx-auto  md:flex flex-col gap-8 bg-[#000000] text-white py-15 px-18 lg:px-25">
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
              <Link to="/flat">New Flat</Link>
            </p>
            <p className="cursor-pointer text-base">
              <Link to="/plot">New Plot</Link>
            </p>
            <p className="cursor-pointer text-base">
              <Link to="/rental">Rental</Link>
            </p>
            <p className="cursor-pointer ">
              <Link to="/resale">Resale</Link>
            </p>
            <p className="cursor-pointer ">
              <Link to="/row-house">Row House</Link>
            </p>
            <p className="cursor-pointer ">
              <Link to="/lease">Lease</Link>
            </p>
            <p className="cursor-pointer ">
              <Link to="/farm-house">Farm House</Link>
            </p>
            <p className="cursor-pointer ">
              <Link to="/commercial">Commercial</Link>
            </p>
          </div>
        </div>

        <div className="midBody flex flex-col gap-7 text-lg font-medium !text-White">
          <h3 className="text-xl font-bold">Become a Professional</h3>
          <JoinOurTeamDropdown
            textColour={"white"}
          ></JoinOurTeamDropdown>
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
        <Link to="/terms-and-conditions" className="cursor-pointer">Terms & Conditions</Link>
        <Link to="/privacy-policy" className="cursor-pointer">Privacy Policy</Link>
        <Link to="/refund-policy" className="cursor-pointer">Refund Policy</Link>
      </div>
    </div>
  </div>

  {/* Mobile footer */}
  <div className="footer  md:hidden w-full flex flex-col items-center justify-start gap-4 bg-[#000000] text-white py-15 px-10">
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

    <div className="footerBottom w-full text-xs sm:text-lg py-3 leading-6 flex flex-col items-center justify-center gap-4 md:gap-6 tracking-[0.6%] text-white/60 ">
      <span>@2024 reparv.com All Right Reserved</span>
      <div className="flex w-full items-center justify-evenly">
        <Link to="/terms-and-conditions" className="cursor-pointer">Terms & Conditions</Link>
        <Link to="/privacy-policy" className="cursor-pointer">Privacy Policy</Link>
        <Link to="/refund-policy" className="cursor-pointer">Refund Policy</Link>
      </div>
    </div>
  </div>
  </>
)}


export default Footer