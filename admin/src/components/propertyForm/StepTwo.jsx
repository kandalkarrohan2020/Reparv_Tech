const StepTwo = ({ newProperty, setPropertyData }) => {
  return (
    <div className="bg-white h-[55vh] overflow-scroll scrollbar-hide p-2">
      <h2 className="text-base font-semibold mb-4">
        Step 1: Property Overview Details
      </h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {/* Flat Property Type */}
        <div
          className={` ${newProperty.propertyCategory === "Flat" ? "block" : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyType}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyType: e.target.value,
              })
            }
          >
            <option value="">Select Property Type</option>
            <option value="1 RK">1 RK (Room, Kitchen)</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="5 BHK">5 BHK & Above</option>
            <option value="Pent House">Pent House</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Studio Apartment">Studio Apartment</option>
            <option value="Duplex Apartment">Duplex Apartment</option>
            <option value="Serviced Apartment">Serviced Apartment</option>
          </select>
        </div>

        {/* For Plot Property Category */}
        <div
          className={` ${newProperty.propertyCategory === "Plot" ? "block" : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyType}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyType: e.target.value,
              })
            }
          >
            <option value="">Select Property Type</option>
            <option value="Corner Plot">Corner Plot</option>
            <option value="Park Facing Plot">Park Facing Plot</option>
            <option value="Road Facing Plot">Road Facing Plot</option>
            <option value="Gated Community Plot">Gated Community Plot</option>
          </select>
        </div>

        {/* For Commercial Flat Property Category */}
        <div
          className={` ${newProperty.propertyCategory === "CommercialFlat"
              ? "block"
              : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyType}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyType: e.target.value,
              })
            }
          >
            <option value="">Select Property Type</option>
            <option value="Office Space">Office Space</option>
            <option value="Co-Working Space">Co-Working Space</option>
            <option value="Corporate Office">Corporate Office</option>
            <option value="Studio Office">Studio Office</option>
          </select>
        </div>

        {/* For Commercial Shop Property Category */}
        <div
          className={` ${newProperty.propertyCategory === "CommercialShop"
              ? "block"
              : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyType}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyType: e.target.value,
              })
            }
          >
            <option value="">Select Property Type</option>
            <option value="Shop">Shop</option>
            <option value="Showroom">Showroom</option>
            <option value="Restaurant / Cafe">Restaurant or Cafe</option>
            <option value="Bank / ATM">Bank or ATM</option>
          </select>
        </div>

        {/* For Industrial Space Property Category */}
        <div
          className={` ${newProperty.propertyCategory === "IndustrialSpace"
              ? "block"
              : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyType}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyType: e.target.value,
              })
            }
          >
            <option value="">Select Property Type</option>
            <option value="Godown">Go-Down</option>
            <option value="Cold Storage">Cold Storage</option>
            <option value="Small Manufacturing Unit">
              Small Manufacturing Unit
            </option>
          </select>
        </div>

        {/* For Commercial Plot Property Category */}
        <div
          className={` ${newProperty.propertyCategory === "CommercialPlot"
              ? "block"
              : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyType}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyType: e.target.value,
              })
            }
          >
            <option value="">Select Property Type</option>
            <option value="Office Building Plot">Office Building Plot</option>
            <option value="Warehouse Plot">Warehouse Plot</option>
            <option value="Mixed-Use Development Plot">
              Mixed-Use Development Plot
            </option>
            <option value="Highway-Facing Plot">Highway-Facing Plot</option>
            <option value="Petrol Pump Plot">Petrol Pump Plot</option>
            <option value="School / Hospital Plot">
              School or Hospital Plot
            </option>
          </select>
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Built Year
          </label>
          <input
            type="number"
            required
            placeholder="Enter Built Year"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.builtYear}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                builtYear: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Ownership Type
          </label>
          <input
            type="text"
            required
            placeholder="Enter Ownership Type"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.ownershipType}
            onChange={(e) =>
              setPropertyData({ ...newProperty, ownershipType: e.target.value })
            }
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Built-Up Area
          </label>
          <input
            type="number"
            required
            placeholder="Enter Area in Sq.Ft."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.builtUpArea}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                builtUpArea: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Carpet Area
          </label>
          <input
            type="number"
            required
            placeholder="Enter Area in Sq.Ft."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.carpetArea}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                carpetArea: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Parking Availability
          </label>
          <input
            type="text"
            required
            placeholder="Enter Parking Availability"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.parkingAvailability}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                parkingAvailability: e.target.value,
              })
            }
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Total Floors
          </label>
          <input
            type="number"
            required
            placeholder="Total No of Floors"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.totalFloors}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                totalFloors: e.target.value,
              })
            }
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Floor No.
          </label>
          <input
            type="number"
            required
            placeholder="Enter Floor No."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.floorNo}
            onChange={(e) => {
              setPropertyData({ ...newProperty, floorNo: e.target.value });
            }}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Loan Availability
          </label>
          <select
            className="w-full mt-[10px] text-[14px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.loanAvailability}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                loanAvailability: e.target.value,
              })
            }
          >
            <option disabled value="">Select Loan Availability</option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Facing
          </label>
          <input
            type="text"
            required
            placeholder="Enter Property Face Direction."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.propertyFacing}
            onChange={(e) => {
              setPropertyData({ ...newProperty, propertyFacing: e.target.value });
            }}
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Rera Registered
          </label>
          <input
            type="text"
            placeholder="Enter Rera No."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.reraRegistered}
            onChange={(e) => {
              const input = e.target.value.toUpperCase(); // Convert to uppercase
              if (/^[A-Z0-9]{0,12}$/.test(input)) {
                setPropertyData({ ...newProperty, reraRegistered: input });
              }
            }}
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Furnishing
          </label>
          <input
            type="text"
            required
            placeholder="Enter Furnishing Parts."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.furnishing}
            onChange={(e) => {
              setPropertyData({ ...newProperty, furnishing: e.target.value });
            }}
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Water Supply
          </label>
          <input
            type="text"
            required
            placeholder="Enter Water Supply Time & Type"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.waterSupply}
            onChange={(e) => {
              setPropertyData({ ...newProperty, waterSupply: e.target.value });
            }}
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Power Backup
          </label>
          <input
            type="text"
            required
            placeholder="Enter Power Backup"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.powerBackup}
            onChange={(e) => {
              setPropertyData({ ...newProperty, powerBackup: e.target.value });
            }}
          />
        </div>
      </div>
      
      {/* Property Features And Benefits */}
      <h2 className="text-base font-semibold mt-6">
        Step 2: Property Features And Benefits
      </h2>
      
      {/* Property Features */}
      <div className={` w-full mt-2`}>
        <label className="block text-sm leading-4 text-[#00000066] font-medium">
          Property Features
        </label>
        <textarea
          rows={2}
          cols={40}
          placeholder="Enter Property Features Saperated With Comma. "
          required
          className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newProperty.propertyFeatures}
          onChange={(e) => {
            setPropertyData({ ...newProperty, propertyFeatures: e.target.value });
          }}
        />
      </div>
      {/* Property Benefits */}
      <div className={` w-full`}>
        <label className="block text-sm leading-4 text-[#00000066] font-medium">
          Property Benefits
        </label>
        <textarea
          rows={2}
          cols={40}
          placeholder="Enter Property Benefits Saperated With Comma. "
          required
          className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newProperty.propertyBenefits}
          onChange={(e) => {
            setPropertyData({ ...newProperty, propertyBenefits: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

export default StepTwo;
