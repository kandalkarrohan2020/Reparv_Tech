import React from "react";
import {
  FaBuilding,
  FaCalendarAlt,
  FaVectorSquare,
  FaParking,
  FaLevelUpAlt,
  FaMoneyCheckAlt,
  FaRegClipboard,
  FaCouch,
  FaTint,
  FaBolt,
  FaArrowRight,
  FaHome,
} from "react-icons/fa";

const PropertyOverview = ({ propertyInfo }) => {
  const overviewData = [
    { icon: FaBuilding, label: "Property Type", value: propertyInfo.propertyType },
    { icon: FaCalendarAlt, label: "Built Year", value: propertyInfo.builtYear },
    { icon: FaVectorSquare, label: "Built-Up Area", value: propertyInfo.builtUpArea },
    { icon: FaHome, label: "Ownership Type", value: propertyInfo.ownershipType },
    { icon: FaVectorSquare, label: "Carpet Area", value: propertyInfo.carpetArea },
    { icon: FaParking, label: "Parking Availability", value: propertyInfo.parkingAvailability },
    { icon: FaParking, label: "Total Floors", value: propertyInfo.totalFloors },
    { icon: FaLevelUpAlt, label: "Floor Number", value: propertyInfo.floorNo },
    { icon: FaMoneyCheckAlt, label: "Loan Availability", value: propertyInfo.loanAvailability },
    { icon: FaArrowRight, label: "Property Facing", value: propertyInfo.propertyFacing },
    { icon: FaRegClipboard, label: "RERA Registered", value: propertyInfo.reraRegistered },
    { icon: FaCouch, label: "Furnishing", value: propertyInfo.furnishing },
    { icon: FaTint, label: "Water Supply", value: propertyInfo.waterSupply },
    { icon: FaBolt, label: "Power Backup", value: propertyInfo.powerBackup },
  ];

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-base font-semibold mb-6">Property Overview</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 text-sm">
        {overviewData.map(({ icon: Icon, label, value }, index) => (
          <div key={index} className="flex items-start space-x-3">
            {Icon && <Icon className="text-lg text-black mt-1" />}
            <div>
              <div className="text-[#00000066] text-xs">{label}</div>
              <div className="font-normal text-black whitespace-pre-line">{value || "—"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyOverview;
