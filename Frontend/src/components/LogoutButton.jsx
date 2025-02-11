import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

function LogoutButton() {
  const userLogout = () => {
    console.log("Logout");
  }

  return (
    <div 
    onClick={userLogout}
    className="logoutBtn px-2 md:w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px] active:scale-95 cursor-pointer">
      <p className="hidden md:block">Logout</p>
      <FaSignOutAlt className="md:hidden block"/>
    </div>
  );
}

export default LogoutButton;
