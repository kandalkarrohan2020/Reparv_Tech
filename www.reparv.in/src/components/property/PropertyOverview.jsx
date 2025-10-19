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
  FaHashtag,

} from "react-icons/fa";

const PropertyOverview = ({ propertyInfo }) => {
  const overviewData = [
    {
      icon: FaCalendarAlt,
      label: "Built Year",
      value: propertyInfo.builtYear,
      show: "flex",
    },
    {
      icon: FaVectorSquare,
      label: "Built-Up Area",
      value: propertyInfo.builtUpArea,
      show: ["NewPlot", "CommercialPlot"].includes(
        propertyInfo?.propertyCategory
      )
        ? "hidden"
        : "flex",
    },
    {
      icon: FaHome,
      label: "Ownership Type",
      value: propertyInfo.ownershipType,
      show: "flex",
    },
    {
      icon: FaVectorSquare,
      label: "Carpet Area",
      value: propertyInfo.carpetArea,
      show: "flex",
    },
    {
      icon: FaParking,
      label: "Parking Availability",
      value: propertyInfo.parkingAvailability,
      show: "flex",
    },
    {
      icon: FaLevelUpAlt,
      label: "Total Floors",
      value: propertyInfo.totalFloors,
      show: ["NewPlot", "CommercialPlot"].includes(
        propertyInfo?.propertyCategory
      )
        ? "hidden"
        : "flex",
    },
    {
      icon: FaLevelUpAlt,
      label: "Floor Number",
      value: propertyInfo.floorNo,
      show: ["NewPlot", "CommercialPlot"].includes(
        propertyInfo?.propertyCategory
      )
        ? "hidden"
        : "flex",
    },
    {
      icon: FaMoneyCheckAlt,
      label: "Loan Availability",
      value: propertyInfo.loanAvailability,
      show: "flex",
    },
    {
      icon: FaArrowRight,
      label: "Property Facing",
      value: propertyInfo.propertyFacing,
      show: "flex",
    },
    {
      icon: FaCouch,
      label: "Furnishing",
      value: propertyInfo.furnishing,
      show: ["NewPlot", "CommercialPlot"].includes(
        propertyInfo?.propertyCategory
      )
        ? "hidden"
        : "flex",
    },
    {
      icon: FaTint,
      label: "Water Supply",
      value: propertyInfo.waterSupply,
      show: "flex",
    },
    {
      icon: FaBolt,
      label: "Power Backup",
      value: propertyInfo.powerBackup,
      show: "flex",
    },
    {
      icon: FaHashtag,
      label: "Tags",
      value: propertyInfo.tags,
      show: !propertyInfo.tags ? "flex col-span-2 lg:col-span-3" : "hidden",
    },
    {
      icon: FaRegClipboard,
      label: "RERA Registered",
      value: propertyInfo.reraRegistered,
      show: "flex col-span-2 lg:col-span-2",
    },
    {
      icon: FaHome,
      label: "Address",
      value: propertyInfo.address,
      show: "flex col-span-2 lg:col-span-3",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-lg font-semibold mb-6">Property Overview</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 text-sm">
        {overviewData.map(({ icon: Icon, label, value, show }, index) => (
          <div key={index} className={`${show} items-start space-x-3`}>
            {Icon && <Icon className="text-lg text-black mt-1" />}
            <div>
              <div className="text-[#00000066] text-xs">{label}</div>
              <div className="font-normal text-black whitespace-pre-line">
                {value || "—"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyOverview;
