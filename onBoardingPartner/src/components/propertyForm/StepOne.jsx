import React from "react";

const StepOne = ({
  newProperty,
  setPropertyData,
  builderData,
  authorities,
  states,
  cities,
}) => {
  return (
    <div className="bg-white h-[55vh] overflow-scroll scrollbar-x-hidden p-2">
      <h2 className="text-base font-semibold mb-4">Step 1: Property Details</h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Builder/Company <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.builderid}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                builderid: e.target.value,
              })
            }
          >
            <option value="">Select Builder/Company</option>
            {builderData.map((builder, index) => (
              <option key={index} value={builder.builderid}>
                {builder.company_name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Category <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyCategory}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyCategory: e.target.value,
              })
            }
          >
            <option value="">Select Property Category</option>
            <option value="RentalFlat">Rental Flat</option>
            <option value="RentalShop">Rental Shop</option>
            <option value="RentalOffice">Rental Office</option>
            <option value="Resale">Resale</option>
            <option value="RowHouse">Row House</option>
            <option value="Lease">Lease</option>
            <option value="FarmLand">Farm Land</option>
            <option value="FarmHouse">Farm House</option>
            <option value="IndustrialSpace">Industrial Space</option>
          </select>
        </div>

        <div
          className={`${
            newProperty.propertyCategory === "FarmLand" ? "hidden" : "block"
          } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Approved by <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyApprovedBy}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyApprovedBy: e.target.value,
              })
            }
          >
            <option value="">Select Approved by</option>
            {authorities?.map((authority, index) => (
              <option key={index} value={authority.authorityNACL}>
                {authority.authorityNACL}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Property Name"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.propertyName}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyName: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Address <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Address"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.address}
            onChange={(e) =>
              setPropertyData({ ...newProperty, address: e.target.value })
            }
          />
        </div>
        {/* State Select Input */}
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Select State <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.state}
            onChange={(e) =>
              setPropertyData({ ...newProperty, state: e.target.value })
            }
          >
            <option value="">Select Your State</option>
            {states?.map((state, index) => (
              <option key={index} value={state.state}>
                {state.state}
              </option>
            ))}
          </select>
        </div>

        {/* City Select Input */}
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Select City <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.city}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                city: e.target.value,
              })
            }
          >
            <option value="">Select Your City</option>
            {cities?.map((city, index) => (
              <option key={index} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Pin-Code <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter Pin-Code"
            value={newProperty.pincode}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d{0,6}$/.test(input)) {
                setPropertyData({ ...newProperty, pincode: input });
              }
            }}
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#0BB501]"
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Location <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Location"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.location}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                location: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Distance From City Center <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.distanceFromCityCenter}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                distanceFromCityCenter: e.target.value,
              })
            }
          >
            <option value="">Select Distance (Kms)</option>
            {Array.from({ length: 25 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Km
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Total Sales Price <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter Sales Price"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.totalSalesPrice}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                totalSalesPrice: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Total Offer Price <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter Offer Price"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.totalOfferPrice}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                totalOfferPrice: e.target.value,
              })
            }
          />
        </div>
      </div>

      <h2 className="text-base font-semibold mt-6 mb-4">
        Step 2: Other Charges
      </h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Stamp Duty In Percentage <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.stampDuty}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                stampDuty: e.target.value,
              })
            }
          >
            <option value="">Select Stamp Duty %</option>
            <option value="5">5%</option>
            <option value="6">6%</option>
            <option value="7">7%</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Registration Fee Percentage <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.registrationFee}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                registrationFee: e.target.value,
              })
            }
          >
            <option value="">Select Registration Fee %</option>
            <option value="1">1%</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            GST Percentage <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.gst}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                gst: e.target.value,
              })
            }
          >
            <option value="">Select GST %</option>
            <option value="0">0%</option>
            <option value="1">1%</option>
            <option value="5">5%</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Advocate Fee in Rupee <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.advocateFee}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                advocateFee: e.target.value,
              })
            }
          >
            <option value="">Select Advocate Fee</option>
            <option value="0">0</option>
            <option value="10000">10,000</option>
            <option value="15000">15,000</option>
            <option value="20000">20,000</option>
            <option value="25000">25,000</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            MSEB & Water <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter Water & MSEB Charges"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.msebWater}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                msebWater: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Maintenance <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter Maintenance"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.maintenance}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                maintenance: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Other <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            required
            placeholder="Enter Extra Other Charges"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.other}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                other: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StepOne;
