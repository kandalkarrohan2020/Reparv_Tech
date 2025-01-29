import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useAuth } from "../store/auth";

function Profile() {

  const {showProfile, setShowProfile} = useAuth();
  return (
    <div className={`ProfileContainer fixed z-30 w-full h-screen bg-[#4242428b] flex items-center justify-end `}>
      <div className="Profile w-full md:w-[384px] h-screen bg-[#F5F5F6] flex flex-col items-center justify-start gap-4 px-8 py-14 ">
        <div className="arrow w-[320px] h-[30px]">
          <FaArrowLeft onClick={()=>{setShowProfile(false)}} className="w-6 h-6 cursor-pointer active:scale-95 mx-3" />
        </div>
        <div className="profileImgContainer w-[320px] h-[325px] bg-[#FFFFFF] flex flex-col items-center justify-center p-5 gap-3 rounded-[20px] shadow-[#0000001A] ">
          <img src="https://i.pinimg.com/736x/30/0d/27/300d270e6ed684dba484a8444a79b07f.jpg" alt="" className="w-[200px] h-[200px] rounded-[50%]" />
          <h2 className="text-[18px] leading-5 font-semibold text-[#076300]">
            Riya Roy
          </h2>
          <h3 className="text-sm leading-4 font-medium text-[#000000]">
            SuperAdmin
          </h3>
        </div>

        <div className="profileInfoContainer pt-16 pb-5 w-[320px] h-[395px] bg-[#FFFFFF] flex flex-col px-10 gap-5 rounded-[20px] shadow-[#0000001A] ">
          <h2 className="text-[18px] leading-5 font-semibold text-[#00000066] ">
            Information
          </h2>
          <h3 className="text-[16px] text-[#000000] leading-5 ">
            Name:{" "}
            <b className="text-[16px] text-[#000000] leading-5 font-semibold ">
              {" "}
              Riya Roy
            </b>
          </h3>
          <h3 className="text-[16px] text-[#000000] leading-5 ">
            Email:{" "}
            <b className="text-[16px] text-[#000000] leading-5 font-semibold ">
              {" "}
              user@gmail.com
            </b>
          </h3>
          <h3 className="text-[16px] text-[#000000] leading-5 ">
            Phone:{" "}
            <b className="text-[16px] text-[#000000] leading-5 font-semibold ">
              {" "}
              +91 9322432323
            </b>
          </h3>
          <h3 className="text-[16px] text-[#000000] leading-5 ">
            Role:{" "}
            <b className="text-[16px] text-[#000000] leading-5 font-semibold ">
              {" "}
              Sales
            </b>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Profile;
