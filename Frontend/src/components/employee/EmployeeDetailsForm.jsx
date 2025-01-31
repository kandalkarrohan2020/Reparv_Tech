import React from 'react';
import { useAuth } from '../../store/auth';
import CurrentDate from '../CurrentDate';

const EmployeeDetailsForm = ({label, handleMethod}) => {
  const {setShowEplDetailsForm} = useAuth();
  return (
    <div className="employee w-[1088px] h-[600px] fixed ">
      <div className="w-[1088px] h-[600px] bg-white p-6 border border-[#cfcfcf33] rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">Employee Details</h2>
          <CurrentDate/>
        </div>
        <form className="grid gap-4 grid-cols-3">
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Contact Number</label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Mail</label>
            <input
              type="email"
              placeholder="Enter Mail"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px] md:col-span-2'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Address</label>
            <input
              type="text"
              placeholder="Enter Complete Address"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2  md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Date of Birth</label>
            <input
              type="date"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Department</label>
            <input
              type="text"
              placeholder="Enter Department"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Position</label>
            <input
              type="text"
              placeholder="Enter Position"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Salary</label>
            <input
              type="text"
              placeholder="Enter Salary"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className='w-full m-2 md:w-[325px] h-[76px]'>
            <label className="block text-sm leading-4 text-[#00000066] font-medium">Date of Joining</label>
            <input
              type="date"
              className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
        <div className="flex flex-col mt-4 space-y-4 md:space-y-0 md:space-x-4 md:flex-row md:justify-end">
          <button
            onClick={()=>{setShowEplDetailsForm(false)}} className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
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

export default EmployeeDetailsForm;