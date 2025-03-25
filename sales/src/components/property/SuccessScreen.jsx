import React from 'react'
import { MdDone } from "react-icons/md";
import { useAuth } from '../store/auth';

function SuccessScreen() {
  const { setShowSuccess } = useAuth();
  return (
    <div onClick={()=>{setShowSuccess(false)}} className="successScreen w-full h-screen flex items-center justify-center fixed z-[1000] bg-white">
        <div className="successMessage w-[90%] sm:w-[70%] max-w-4xl py-8 sm:py-15 rounded-xl  bg-gradient-to-r from-[#076300] to-[#0BB501] flex sm:gap-8 gap-4 flex-col items-center justify-center text-white">
             <div className="rightIcon w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#0BB501]">
               <MdDone className="w-8 h-8" />
             </div>
             <h2 className="text-xl md:text-3xl font-semibold" >Thank You For Registering!</h2>
             <h4 className="text-xs md:text-lg">Our Representative will call you shotly</h4>
        </div>
    </div>
  )
}

export default SuccessScreen