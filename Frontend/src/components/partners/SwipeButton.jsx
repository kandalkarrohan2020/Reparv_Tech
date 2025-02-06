import React from 'react'
import { useAuth } from '../../store/auth';

function SwipeButton() {
    const {isActive, setIsActive} = useAuth();
  return (
    <div className="swipeBtnContainer flex flex-wrap gap-3 items-center justify-start">
    <div onClick={() => {
          setIsActive("Builders");
        }}
    className={`builderBtn flex items-center justify-center h-9 text-sm  px-3 py-2 cursor-pointer shadow-[#0000001A] rounded-lg ${isActive === "Builders"?"bg-[#076300] font-semibold text-white":"border border-[#00000033] "} `}>
       Builders
    </div>
    <div 
    onClick={() => {
      setIsActive("Sales Persons");
    }}
    className={`salesBtn h-9 text-sm flex items-center justify-center px-3 py-2 cursor-pointer shadow-[#0000001A] rounded-lg ${isActive === "Sales Persons"?"bg-[#076300] font-semibold text-white":"border border-[#00000033] "}`}>
       Sales Persons
    </div>
    <div 
    onClick={() => {
      setIsActive("Auction Members");
    }}
    className={`auctionBtn h-9 text-sm flex items-center justify-center px-3 py-2 cursor-pointer shadow-[#0000001A] rounded-lg ${isActive === "Auction Members"?"bg-[#076300] font-semibold text-white":"border border-[#00000033]"}`}>
       Auction Members
    </div>
  </div>
  )
}

export default SwipeButton