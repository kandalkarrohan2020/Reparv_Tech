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
import DirectionButton from "../components/contact/DirectionButton";

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
            contact@reparv.in
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
      <div className="w-full py-5 md:py-10 flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="w-full md:w-1/2 flex gap-3 flex-col bg-white p-6 rounded-lg border border-[#00000033] ">
          <h3 className="font-medium text-sm sm:text-base">
            Main Headquarters
          </h3>
          <p className="font-semibold text-xl leading-7 ">
            3rd Floor, Anjania Niwas, Wardha Road, Near Kothari Hospital, Nagpur
            - 440015
          </p>
          <div className="w-full flex gap-3 flex-wrap-reverse flex-row justify-between">
            <button className="flex items-center text-xs bg-black space-x-2 text-white px-4 py-3 rounded-4xl">
              <FaEnvelope /> <span>contact@reparv.in</span>
            </button>
            <button className="flex items-center text-xs space-x-2 bg-black text-white px-4 py-3 rounded-4xl">
              <FaPhoneAlt /> <span>+91 8010881965</span>
            </button>
            <button className="flex items-center text-xs space-x-2 bg-black text-white px-4 py-3 rounded-4xl">
              <FaMapMarkerAlt /> <span>Nagpur</span>
            </button>
          </div>
          {/* Direction Button */}
          <DirectionButton />
        </div>

        <div className="w-full md:w-1/2 flex gap-3 flex-col bg-white p-6 rounded-lg border border-[#00000033] ">
          <h3 className="font-medium text-sm sm:text-base">
            Branch Office
          </h3>
          <p className="font-semibold text-xl leading-7 ">
            In front of Shiv Mandir, sister colony Ram Nagar Chandrapur - 442401
          </p>
          <div className="w-full flex gap-3 flex-wrap-reverse flex-row justify-between">
            <button className="flex items-center text-xs bg-black space-x-2 text-white px-4 py-3 rounded-4xl">
              <FaEnvelope /> <span>contact@reparv.in</span>
            </button>
            <button className="flex items-center text-xs space-x-2 bg-black text-white px-4 py-3 rounded-4xl">
              <FaPhoneAlt /> <span>+91 8010881965</span>
            </button>
            <button className="flex items-center text-xs space-x-2 bg-black text-white px-4 py-3 rounded-4xl">
              <FaMapMarkerAlt /> <span>Chandrapur</span>
            </button>
          </div>
          {/* Direction Button */}
          <DirectionButton />
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default ContactUs;
