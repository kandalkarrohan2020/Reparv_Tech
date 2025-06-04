import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import emailIcon from "../assets/contact/emailIcon.svg";
import phoneIcon from "../assets/contact/phoneIcon.svg";
import messageIcon from "../assets/contact/messageIcon.svg";
import mapIcon from "../assets/contact/mapIcon.svg";
import FAQ from "../components/contact/FAQ";

const ContactUs = () => {
  
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Heading */}
      <div className="w-full py-2 md:py-12 ">
        <h2 className=" text-2xl md:text-4xl font-semibold text-[#076300] ">
          Welcome to Reparv!
        </h2>
        <p className="text-[#999999] mt-4 w-full md:w-[80%] font-medium">
          We’re here to assist you with all your real estate needs. Whether you
          have questions, need guidance, or require support, our team is ready
          to help. Get in touch with us, and let’s make your property journey
          smooth, transparent, and hassle-free.
        </p>
      </div>

      {/* Contact Info Section */}
      <div className="w-full min-h-50 mt-6 bg-[#076300] grid grid-cols-2 md:grid-cols-4 gap-4 place-items-center p-5">
        <div className="w-full h-40 flex gap-4 flex-col items-center justify-center border border-[#FFFFFF33] bg-[#FFFFFF1A] text-white rounded-lg">
          <div className="w-15 h-15 flex items-center justify-center rounded-full bg-cover">
            <img src={emailIcon} alt="" />
          </div>
          <div className=" text-xs sm:text-base font-medium">
            hello@reparv.com
          </div>
        </div>
        <div className="w-full h-40 flex gap-4 flex-col items-center justify-center border border-[#FFFFFF33] bg-[#FFFFFF1A] text-white rounded-lg">
          <div className="w-15 h-15 flex items-center justify-center rounded-full bg-cover">
            <img src={phoneIcon} alt="" />
          </div>
          <div className="text-xs sm:text-base font-medium">
            +91 801 0881 965
          </div>
        </div>
        <div className="w-full h-40 flex gap-4 flex-col items-center justify-center border border-[#FFFFFF33] bg-[#FFFFFF1A] text-white rounded-lg">
          <div className="w-15 h-15 flex items-center justify-center rounded-full bg-cover">
            <img src={mapIcon} alt="" />
          </div>
          <div className="text-xs sm:text-base font-medium">
            Nagpur, Chandrapur
          </div>
        </div>
        <div className="w-full h-40 flex gap-4 flex-col items-center justify-center border border-[#FFFFFF33] bg-[#FFFFFF1A] text-white rounded-lg">
          <div className="w-15 h-15 flex items-center justify-center rounded-full bg-cover">
            <img src={messageIcon} alt="" />
          </div>
          <div className="flex flex-row items-center justify-center gap-3">
            <FaFacebookF />
            <FaLinkedinIn />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="w-full sm:w-[558px] my-5 md:my-10 flex gap-3 flex-col bg-white p-6 rounded-lg border border-[#00000033] ">
        <h3 className="font-medium text-sm sm:text-base">Main Headquarters</h3>
        <p className="font-semibold text-xl leading-7 ">
          3rd Floor, Anjania Niwas, Wardha Road, Near Kothari Hospital, Nagpur
          - 440015
        </p>
        <div className="w-full flex gap-3 flex-wrap-reverse flex-row justify-between">
          <button className="flex items-center sm:text-xs bg-black space-x-2 text-white px-4 py-3 rounded-4xl">
            <FaEnvelope /> <span>hello@reparv.com</span>
          </button>
          <button className="flex items-center text-xs space-x-2 bg-black text-white px-4 py-3 rounded-4xl">
            <FaPhoneAlt /> <span>+91 801 0881 965</span>
          </button>
          <button className="flex items-center text-xs space-x-2 bg-black text-white px-4 py-3 rounded-4xl">
            <FaMapMarkerAlt /> <span>Nagpur</span>
          </button>
        </div>
        <button className="w-full mt-3 bg-[#0BB501] text-white py-3 rounded-lg">
          Get Direction
        </button>
      </div>

      {/* FAQ Section */}
      <FAQ/>

    </div>
  );
};

export default ContactUs;
