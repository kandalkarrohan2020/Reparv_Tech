import React from "react";
import CurrentDate from "../CurrentDate";
import { useAuth } from "../../store/auth";

const BuilderForm = ({ label, handleMethod }) => {
  const { setShowBuilderForm } = useAuth();
  return (
    <div className="builder-form overflow-scroll scrollbar-hide w-[400px] h-[600px] md:w-[700px] md:h-[650px] flex fixed">
      <div className="w-[330px] sm:w-[600px] sm:h-[600px] overflow-scroll scrollbar-hide md:w-[500px] lg:w-[700px] lg:h-[650px] bg-white py-8 px-3 sm:px-6 border border-[#cfcfcf33] rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">Builders</h2>
          <div className="md:block hidden">
            <CurrentDate />
          </div>
        </div>
        <form className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <div className="w-full ">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Enter Project Name"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Project Owner Name
            </label>
            <input
              type="text"
              placeholder="Enter Owner Name"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Project Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Current Location of Project
            </label>
            <input
              type="text"
              placeholder="Add Location"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              RERA No.
            </label>
            <input
              type="text"
              placeholder="Enter RERA Number"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              RERA Documents Upload
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
              Project Sanctioned Documents
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
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Project Map
            </label>
            <div className="w full mt-2">
              <input type="file" className="hidden" id="project-map" />
              <label
                htmlFor="project-map"
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
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Per Square Feet Price
            </label>
            <input
              type="text"
              placeholder="Enter price of Sq.ft"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Per Square Feet Corner Price
            </label>
            <input
              type="text"
              placeholder="Enter Corner Price"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm leading-4 text-[#00000066] font-medium">
              Extra
            </label>
            <input
              type="text"
              placeholder="Extra"
              className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
        <div className="flex mt-8 md:mt-6 justify-end gap-6">
          <button
            onClick={() => {
              setShowBuilderForm(false);
            }}
            className="px-4 py-2 leading-4 text-[#ffffff] bg-[#000000B2] rounded active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            onClick={handleMethod}
            className="px-4 py-2 text-white bg-[#076300] rounded active:scale-[0.98]"
          >
            {label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderForm;
