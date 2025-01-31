import React from "react";
import CurrentDate from "../CurrentDate";
import { useAuth } from "../../store/auth";

const SalesForm = ({ label, handleMethod }) => {
    const { setShowSalesForm } = useAuth();
  return ( 
    <div className="sales-form w-[1088px] h-[600px] fixed">
      <div className="w-[1088px] h-[600px] bg-white p-6 border border-[#cfcfcf33] rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">Sales Person</h2>
          <CurrentDate />
        </div>
        <form className="grid gap-4 grid-cols-3">
          <div className="w-full ">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Contact Number
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Experience
            </label>
            <input
              type="text"
              placeholder="Enter Experience"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Adhar Card Number
            </label>
            <input
              type="text"
              placeholder="Enter Adhar Number"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Adhar Card
            </label>
            <div className="w-full mt-2">
              <input type="file" className="hidden" id="rera-documents" />
              <label
                htmlFor="rera-documents"
                className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
              >
                <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                  Upload Document
                </span>
                <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                  Browse
                </div>
              </label>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Pan Card Number
            </label>
            <input
              type="text"
              placeholder="Enter Pan Number"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Pan Card
            </label>
            <div className="w-full mt-2">
              <input type="file" className="hidden" id="rera-documents" />
              <label
                htmlFor="rera-documents"
                className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
              >
                <span className="m-3 p-2 text-[16px] font-medium text-[#00000066]">
                  Upload Document
                </span>
                <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                  Browse
                </div>
              </label>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              RERA Document
            </label>
            <div className="w-full mt-2">
              <input type="file" className="hidden" id="sanctioned-documents" />
              <label
                htmlFor="sanctioned-documents"
                className="flex items-center justify-between border border-gray-300 leading-4 text-[#00000066] rounded cursor-pointer"
              >
                <span className="m-3 px-2 text-[16px] font-medium text-[#00000066]">
                  Upload Document
                </span>
                <div className="btn flex items-center justify-center w-[107px] p-5 rounded-[3px] rounded-tl-none rounded-bl-none bg-[#000000B2] text-white">
                  Browse
                </div>
              </label>
            </div>
          </div>
        </form>
        <div className="flex flex-col mt-4 space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:justify-end">
          <button
            onClick={() => {
              setShowSalesForm(false);
            }}
            className="px-4 py-2 leading-4 text-[#00000066] bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleMethod}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesForm;
