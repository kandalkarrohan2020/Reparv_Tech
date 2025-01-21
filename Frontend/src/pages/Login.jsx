import React from "react";

import ReparvLogo from "../assets/login/ReparvLogo.png";
import LoginLeftIMG from "../assets/login/LoginLeftIMG.png";
import LoginLine from "../assets/login/LoginLine.png";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  return (
    <div className="login">
      <div className="left">
        <div className="ReparvLogo">
          <img src={ReparvLogo} alt="" />
        </div>
        <img src={LoginLeftIMG} alt="" className="LoginLeftIMG" />
      </div>
      <div className="right">
        <div className="loginContainer">
          <h2 className="title">Login..!</h2>
          <p className="subtitle">Enter Your Login Credentials</p>
          <div className="inputContainer">
            <FaEnvelope className="icon" />
            <input type="email" placeholder="Email Address" className="input" />
          </div>
          <div className="inputContainer">
            <FaLock className="icon" />
            <input type="password" placeholder="Password" className="input" />
          </div>
          <button className="loginButton">Login</button>
          <p className="forgotPassword">Forgot Password</p>
        </div>
        <img src={LoginLine} alt="" />
      </div>
    </div>
  );
}

export default Login;
