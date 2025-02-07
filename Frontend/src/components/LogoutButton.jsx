import React from "react";

function LogoutButton() {
  const userLogout = () => {
    console.log("Logout");
  }

  return (
    <div 
    onClick={userLogout}
    className="logoutBtn w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px] active:scale-95 cursor-pointer">
      <p>Logout</p>
    </div>
  );
}

export default LogoutButton;
