import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useAuth } from "../../store/auth";

const ActionSelect = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const {setShowEplDetailsForm} = useAuth();
  const handleAction = (action) => {
    switch (action) {
      case "view":
        setShowEplDetailsForm(true);
        break;
      case "update":
        setShowEplDetailsForm(true);
        break;
      case "delete":
        setShowEplDetailsForm(true);
        break;
      default:
        setShowEplDetailsForm(true);
    }
  };

  return (
    <div className="relative inline-block w-[120px]">
      <div className="flex items-center justify-between p-2 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
        <span className=" text-[12px]">{selectedAction || "Select action"}</span>
        <FiMoreVertical className="text-gray-500" />
      </div>
      <select
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        value={selectedAction}
        onChange={(e) => {
          const action = e.target.value;
          setSelectedAction(action);
          handleAction(action);
        }}
      >
        <option value="" disabled>Select action</option>
        <option value="view">View</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>
    </div>
  );
};

export default ActionSelect;
