import React from "react";
import ReparvLogo from "../assets/login/ReparvLogo.png";
import LoginLeftIMG from "../assets/login/LoginLeftIMG.png";
import LoginLine from "../assets/login/LoginLine.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      {/* Left Section */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center">
        <div className="relative -right-[50px] top-[20px]">
          <img src={ReparvLogo} alt="Reparv Logo" />
        </div>
        <img src={LoginLeftIMG} alt="Login Left" className="mt-4" />
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0BB501] to-[#076300] rounded-l-[20px] relative">
        <div className="w-[364px] h-[401px] bg-white shadow-md rounded-[12px] py-[24px] px-[32px] flex flex-col items-start gap-[22px]">
          <h2 className="text-[26px] leading-[31px] font-bold text-black">Login..!</h2>
          <p className="text-[18px] leading-[21px] font-normal text-black">
            Enter Your Login Credentials
          </p>

          {/* Email Input */}
          <div className=" group w-[300px] h-[60px] flex items-center border border-black/20 rounded-full px-[26px] focus-within:border-[#0BB501]">
            <FaEnvelope className="text-black/20 w-[20px] h-[20px] mr-[10px] group-focus-within:text-[#0BB501]" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border-none outline-none text-[14px]"
            />
          </div>

          {/* Password Input */}
          <div className="group w-[300px] h-[60px] flex items-center border border-black/20 rounded-full px-[26px] focus-within:border-[#0BB501]">
            <FaLock className="text-black/20 w-[20px] h-[20px] group-focus-within:text-[#0BB501]" />
            <input
              type="password"
              placeholder="Password"
              className="w-[150px] border-none mx-[10px] outline-none text-[14px]"
            />
            <IoEye className="text-black/20 text-[20px] ml-[36px]" />
          </div>

          {/* Login Button */}
          <button onClick={()=>{navigate("/overview")}} className="w-[300px] h-[53px] bg-[#0BB501] text-white rounded-full text-[16px] font-semibold transition hover:text-[#fffcfc] active:scale-95">
            Login
          </button>

          {/* Forgot Password */}
          <p className="w-[300px] text-[14px] text-black/70 leading-[17px] cursor-pointer">
            Forgot Password
          </p>
        </div>

        <img
          src={LoginLine}
          alt="Login Line"
          className="absolute bottom-0 right-0"
        />
      </div>
    </div>
  );
}

export default Login;
