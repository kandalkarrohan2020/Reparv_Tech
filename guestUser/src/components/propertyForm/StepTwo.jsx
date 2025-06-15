const StepTwo = ({ newProperty, setPropertyData }) => {
  return (
    <div className="bg-white h-[55vh] overflow-scroll scrollbar-hide p-2">
      <h2 className="text-base font-semibold mb-4">
        Step 1: Property Overview Details
      </h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {/* Flat Property Type */}
        <div
          className={` ${newProperty.propertyCategory === "NewFlat" ? "block" : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type <span className="text-red-600">*</span>
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
            <option disabled value="">Select Property Type</option>
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
          className={` ${newProperty.propertyCategory === "NewPlot" ? "block" : "hidden"
            } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type <span className="text-red-600">*</span>
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
            <option disabled value="">Select Property Type</option>
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
            Property Type <span className="text-red-600">*</span>
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
            <option disabled value="">Select Property Type</option>
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
            Property Type <span className="text-red-600">*</span>
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
            <option disabled value="">Select Property Type</option>
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
            Property Type <span className="text-red-600">*</span>
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
            <option disabled value="">Select Property Type</option>
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
            Property Type <span className="text-red-600">*</span>
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
            <option disabled value="">Select Property Type</option>
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
            Property Built Year <span className="text-red-600">*</span>
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
            Ownership Type <span className="text-red-600">*</span>
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
            Built-Up Area <span className="text-red-600">*</span>
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
            Carpet Area <span className="text-red-600">*</span>
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
            Parking Availability <span className="text-red-600">*</span>
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
            Total Floors <span className="text-red-600">*</span>
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
            Floor No <span className="text-red-600">*</span>
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
            Loan Availability <span className="text-red-600">*</span>
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
            Property Facing <span className="text-red-600">*</span>
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

        <div className={` ${newProperty.propertyCategory === "NewPlot" || newProperty.propertyCategory === "NewFlat" || newProperty.propertyCategory === "CommercialFlat" || newProperty.propertyCategory === "CommercialPlot" ? "block" : "hidden"
            } w-full`}>
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Rera Registered <span className="text-red-600">*</span>
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
            Furnishing <span className="text-red-600">*</span>
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
            Water Supply <span className="text-red-600">*</span>
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
            Power Backup <span className="text-red-600">*</span>
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
      <h2 className="text-base font-semibold mt-6 mb-2">
        Step 2: Property Features
      </h2>
      
      {/* Property Features */}
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Location Feature <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.locationFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, locationFeature: e.target.value });
            }}
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Size / Area Feature <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.sizeAreaFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, sizeAreaFeature: e.target.value });
            }}
          />
        </div>

        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Parking Feature <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.parkingFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, parkingFeature: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Balcony / Terrace Feature <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.terraceFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, terraceFeature: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Age Of Property <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.ageOfPropertyFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, ageOfPropertyFeature: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Furnishing <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.furnishingFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, furnishingFeature: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Amenities Feature <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.amenitiesFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, amenitiesFeature: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
           Property Status <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.propertyStatusFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, propertyStatusFeature: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Floor No Feature <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.floorNumberFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, floorNumberFeature: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Smart Home Feature <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.smartHomeFeature}
            onChange={(e) => {
              setPropertyData({ ...newProperty, smartHomeFeature: e.target.value });
            }}
          />
        </div>
      </div>

      {/* Property Features And Benefits */}
      <h2 className="text-base font-semibold mt-6 mb-2">
        Step 3: Property Benefits
      </h2>
      
      {/* Property Features */}
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Security Benefits <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Benefit Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.securityBenefit}
            onChange={(e) => {
              setPropertyData({ ...newProperty, securityBenefit: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Prime Location <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Benefit Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.primeLocationBenefit}
            onChange={(e) => {
              setPropertyData({ ...newProperty, primeLocationBenefit: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Rental Income Possibilities <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Benefit Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.rentalIncomeBenefit}
            onChange={(e) => {
              setPropertyData({ ...newProperty, rentalIncomeBenefit: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Quality Construction <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Benefit Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.qualityBenefit}
            onChange={(e) => {
              setPropertyData({ ...newProperty, qualityBenefit: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
           Capital Appreciation <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Benefit Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.capitalAppreciationBenefit}
            onChange={(e) => {
              setPropertyData({ ...newProperty, capitalAppreciationBenefit: e.target.value });
            }}
          />
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
          Eco-Friendly <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Benefit Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newProperty.ecofriendlyBenefit}
            onChange={(e) => {
              setPropertyData({ ...newProperty, ecofriendlyBenefit: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
