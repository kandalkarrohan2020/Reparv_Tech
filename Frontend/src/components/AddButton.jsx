import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useAuth } from "../store/auth";

function AddButton({label, func}) {
  const { setAction } = useAuth();

  return (
    <div
      onClick={() => {
        func(true);
        setAction(label);
      }}
      className="addEmployeeButton mx-2 px-4 py-[6px] cursor-pointer flex items-center justify-center gap-2 border border-[#00000033] rounded-tr-md rounded-bl-md bg-[#076300] font-semibold text-4 leading-5 text-[#FFFFFF] active:scale-[0.98]"
    >
      <p>{label}</p>
      <FaPlus className="text-[16px]" />
    </div>
  );
}

export default AddButton;
