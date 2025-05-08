import React from "react";

const StepOne = ({ newProperty, setPropertyData, builderData }) => {
  return (
    <div className="bg-white h-[55vh] overflow-scroll scrollbar-hide p-2">
      <h2 className="text-base font-semibold mb-4">Step 1: Property Details</h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Builder/Company
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
            Property Category
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
            <option value="NewFlat">New Flat</option>
            <option value="NewPlot">New Plot</option>
            <option value="RentalFlat">Rental Flat</option>
            <option value="RentalShop">Rental Shop</option>
            <option value="RentalOffice">Rental Office</option>
            <option value="Resale">Resale</option>
            <option value="RowHouse">Row House</option>
            <option value="Lease">Lease</option>
            <option value="FarmLand">Farm Land</option>
            <option value="FarmHouse">Farm House</option>
            <option value="CommercialFlat">Commercial Flat</option>
            <option value="CommercialPlot">Commercial Plot</option>
            <option value="IndustrialSpace">Industrial Space</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Approved by
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
            <option value="NMRDA">NMRDA</option>
            <option value="NA. TP.">NA. TP.</option>
          </select>
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Name
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
            Address
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
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            City
          </label>
          <input
            type="text"
            required
            placeholder="Enter City"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.city}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                city: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Location
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
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Distance From City Center
          </label>
          <input
            type="number"
            required
            placeholder="Enter Distance in Kms"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.distanceFromCityCenter}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                distanceFromCityCenter: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Total Sales Price
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
            Total Offer Price
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

      <h2 className="text-base font-semibold mt-6 mb-4">Step 2: Other Charges</h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Stamp Duty In Percentage
          </label>
          <input
            type="number"
            required
            placeholder="Enter Stamp Duty %"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.stampDuty}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                stampDuty: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Registration Fee Percentage
          </label>
          <input
            type="number"
            required
            placeholder="Enter Registration Fee %"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.registrationFee}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                registrationFee: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            GST Percentage
          </label>
          <input
            type="number"
            required
            placeholder="Enter GST %"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.gst}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                gst: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Advocate Fee in Rupee.
          </label>
          <input
            type="number"
            required
            placeholder="Enter Advocate Fee"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.advocateFee}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                advocateFee: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            MSEB & Water
          </label>
          <input
            type="number"
            required
            placeholder="Enter Water & MSEB Charges"
            className="w-full mt-2 text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            Maintenance
          </label>
          <input
            type="number"
            required
            placeholder="Enter Stamp Duty %"
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
            Other
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
