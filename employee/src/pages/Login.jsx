import { useState, useEffect } from "react";
import ReparvMainLogo from "../assets/layout/reparvMainLogo.svg";
import LoginLeftIMG from "../assets/login/LoginLeftIMG.svg";
import LoginLine from "../assets/login/LoginLine.png";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";
import Cookies from "js-cookie";

function Login() {
  const {user, setUser, accessToken, storeTokenInCookie, isLoggedIn, URI} = useAuth();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ State for error messages
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const userLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const url = URI+"/employee/login"; // Ensure correct API URL

    try {
      const response = await axios.post(
        url,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.token) {
        console.log("Login Successful", response.data);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        storeTokenInCookie(response.data.token);
        navigate("/overview",{replace:true});
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col md:flex-row items-center justify-center">
      {/* Left Section */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center md:px-8">
        <div className="relative md:-left-[40px] top-[20px] md:top-[30px]">
          <img src={ReparvMainLogo} alt="Reparv Logo" className="w-[180px]" />
        </div>
        <img
          src={LoginLeftIMG}
          alt="Login Left"
          className="mt-4 md:w-[400px]"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0BB501] to-[#076300] rounded-tl-[20px] md:rounded-l-[20px] relative p-4">
        <div className="w-full max-w-[364px] bg-white shadow-md rounded-[12px] py-[24px] px-[32px] flex flex-col items-start gap-[22px]">
          <h2 className="text-[26px] font-bold text-black">Login..!</h2>
          <p className="text-[18px] font-normal text-black">
            Enter Your Login Credentials
          </p>

          {/* ✅ Show Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          {/* Email Input */}
          <div className="group w-full max-w-[300px] h-[60px] flex items-center border border-black/20 rounded-full px-[26px] focus-within:border-[#0BB501]">
            <FaEnvelope className="text-black/20 w-[20px] h-[20px] mr-[10px] group-focus-within:text-[#0BB501]" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              required
              placeholder="Email Address OR Username"
              className="w-full border-none outline-none text-[14px]"
            />
          </div>

          {/* Password Input */}
          <div className="group w-full max-w-[300px] h-[60px] flex items-center border border-black/20 rounded-full px-[26px] focus-within:border-[#0BB501]">
            <FaLock className="text-black/20 w-[20px] h-[20px] group-focus-within:text-[#0BB501]" />
            <input
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              type={isPasswordShow ? "text" : "password"}
              placeholder="Password"
              className="w-full border-none mx-[10px] outline-none text-[14px]"
            />
            {isPasswordShow ? (
              <IoMdEyeOff
                onClick={() => setIsPasswordShow(false)}
                className="text-black/20 text-[20px] ml-[10px] cursor-pointer"
              />
            ) : (
              <IoEye
                onClick={() => setIsPasswordShow(true)}
                className="text-black/20 text-[20px] ml-[10px] cursor-pointer"
              />
            )}
          </div>

          {/* ✅ Login Button */}
          <button
            onClick={userLogin}
            className="w-full max-w-[300px] h-[53px] bg-[#0BB501] text-white rounded-full text-[16px] font-semibold transition hover:text-[#fffcfc] active:scale-95"
          >
            Login
          </button>

          {/* Forgot Password */}
          <p className="w-full max-w-[300px] text-[14px] text-black/70 leading-[17px] cursor-pointer text-left">
            Forgot Password?
          </p>
        </div>

        <img
          src={LoginLine}
          alt="Login Line"
          className="absolute bottom-0 right-0 w-[100px] md:w-[200px]"
        />
      </div>
    </div>
  );
}

export default Login;
