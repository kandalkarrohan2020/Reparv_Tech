const StepTwo = ({ newProperty, setPropertyData }) => {
  return (
    <div className="bg-white h-[55vh] overflow-scroll scrollbar-hide p-2">
      <h2 className="text-base font-semibold mb-4">
        Step 1: Property Overview Details
      </h2>
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {/* Flat Property Type */}
        <div
          className={` ${
            newProperty.propertyCategory === "NewFlat" ? "block" : "hidden"
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
            <option disabled value="">
              Select Property Type
            </option>
            <option value="1 RK">1 RK (Room, Kitchen)</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
            <option value="5 BHK">5 BHK & Above</option>
            <option value="1,2,3,4 & 5 BHK">1,2,3,4 & 5 BHK</option>
            <option value=" 1,2,3 & 4BHK"> 1,2,3 & 4 BHK</option>
            <option value="1,2 & 3BHK">1,2 & 3 BHK</option>
            <option value=" 2,3 & 4 BHK"> 2,3 & 4 BHK</option>
            <option value="3 & 4 BHK">3 & 4 BHK</option>
            <option value="2 & 4 BHK ">2 & 4 BHK </option>
            <option value=" 2 & 3 BHK"> 2 & 3 BHK</option>
            <option value="1 & 2 BHK">1 & 2 BHK</option>
            <option value="1,2,2.5,3,3.5,4 & 5 BHK">
              1,2,2.5,3,3.5,4 & 5 BHK
            </option>
            <option value="2,2.5,3,3.5,4 & 5 BHK">2,2.5,3,3.5,4 & 5 BHK</option>
            <option value="3,3.5.,4 & 5 BHK"> 3,3.5.,4 & 5 BHK</option>
            <option value="3.5,4 & 5 BHK ">3.5,4 & 5 BHK</option>
            <option value="4 & 5 BHK">4 & 5 BHK</option>
            <option value="Pent House">Pent House</option>
            <option value="Builder Floor">Builder Floor</option>
            <option value="Studio Apartment">Studio Apartment</option>
            <option value="Duplex Apartment">Duplex Apartment</option>
            <option value="Serviced Apartment">Serviced Apartment</option>
          </select>
        </div>

        {/* For Plot Property Category */}
        <div
          className={` ${
            newProperty.propertyCategory === "NewPlot" ? "block" : "hidden"
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
            <option disabled value="">
              Select Property Type
            </option>
            <option value="Corner Plot">Corner Plot</option>
            <option value="Park Facing Plot">Park Facing Plot</option>
            <option value="Road Facing Plot">Road Facing Plot</option>
            <option value="Gated Community Plot">Gated Community Plot</option>
          </select>
        </div>

        {/* For Commercial Flat Property Category */}
        <div
          className={` ${
            newProperty.propertyCategory === "CommercialFlat"
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
            <option disabled value="">
              Select Property Type
            </option>
            <option value="Office Space">Office Space</option>
            <option value="Co-Working Space">Co-Working Space</option>
            <option value="Corporate Office">Corporate Office</option>
            <option value="Studio Office">Studio Office</option>
          </select>
        </div>

        {/* For Commercial Shop Property Category */}
        <div
          className={` ${
            newProperty.propertyCategory === "CommercialShop"
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
            <option disabled value="">
              Select Property Type
            </option>
            <option value="Shop">Shop</option>
            <option value="Showroom">Showroom</option>
            <option value="Restaurant / Cafe">Restaurant or Cafe</option>
            <option value="Bank / ATM">Bank or ATM</option>
          </select>
        </div>

        {/* For Industrial Space Property Category */}
        <div
          className={` ${
            newProperty.propertyCategory === "IndustrialSpace"
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
            <option disabled value="">
              Select Property Type
            </option>
            <option value="Godown">Go-Down</option>
            <option value="Cold Storage">Cold Storage</option>
            <option value="Small Manufacturing Unit">
              Small Manufacturing Unit
            </option>
          </select>
        </div>

        {/* For Commercial Plot Property Category */}
        <div
          className={` ${
            newProperty.propertyCategory === "CommercialPlot"
              ? "block"
              : "hidden"
          } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Type <span className="text-red-600">*</span>
          </label>
          <select
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundImage: "none" }}
            value={newProperty.propertyType}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyType: e.target.value,
              })
            }
          >
            <option disabled value="">
              Select Property Type
            </option>
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

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Built Year <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.builtYear}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                builtYear: e.target.value,
              })
            }
          >
            <option value="">Select Year</option>
            {Array.from(
              { length: new Date().getFullYear() - 1990 + 1 },
              (_, i) => 1990 + i
            )
              .reverse()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Ownership Type <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.ownershipType}
            onChange={(e) =>
              setPropertyData({ ...newProperty, ownershipType: e.target.value })
            }
          >
            <option value="">Select Ownership Type</option>
            <option value="Freehold">Freehold</option>
            <option value="Lease Hold">Lease Hold</option>
            <option value="Co-operative Society">Co-operative Society</option>
            <option value="Power of Attorney">Power of Attorney</option>
            <option value="Joint Ownership">Joint Ownership</option>
            <option value="Single Ownership">Single Ownership</option>
            <option value="Government Alloted Property">
              Government Alloted Property
            </option>
          </select>
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
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent"
            style={{ backgroundImage: "none" }}
            value={newProperty.loanAvailability}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                loanAvailability: e.target.value,
              })
            }
          >
            <option disabled value="">
              Select Loan Availability
            </option>
            <option value="Yes">YES</option>
            <option value="No">NO</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Facing <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.propertyFacing}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyFacing: e.target.value,
              })
            }
          >
            <option value="">Select Property Facing</option>
            <option value="North-facing">North-facing</option>
            <option value="North-East-facing (NE)">
              North-East-facing (NE)
            </option>
            <option value="East-facing">East-facing</option>
            <option value="South-East-facing (SE)">
              South-East-facing (SE)
            </option>
            <option value="South-facing">South-facing</option>
            <option value="South-West-facing (SW)">
              South-West-facing (SW)
            </option>
            <option value="West-facing">West-facing</option>
            <option value="North-West-facing (NW)">
              North-West-facing (NW)
            </option>
            <option value="Road Facing">Road Facing</option>
            <option value="Garden facing">Garden facing</option>
            <option value="Corner">Corner</option>
          </select>
        </div>

        <div
          className={` ${
            newProperty.propertyCategory === "NewPlot" ||
            newProperty.propertyCategory === "NewFlat" ||
            newProperty.propertyCategory === "CommercialFlat" ||
            newProperty.propertyCategory === "CommercialPlot"
              ? "block"
              : "hidden"
          } w-full`}
        >
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Rera Registered <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Rera No."
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.reraRegistered}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                reraRegistered: e.target.value,
              });
            }}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Furnishing <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.furnishing}
            onChange={(e) => {
              setPropertyData({ ...newProperty, furnishing: e.target.value });
            }}
          >
            <option value="" disabled>
              Select Furnishing
            </option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Water Supply <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.waterSupply}
            onChange={(e) => {
              setPropertyData({ ...newProperty, waterSupply: e.target.value });
            }}
          >
            <option value="">Select Water Supply</option>
            <option value="Municipal / Corporation Water">
              Municipal / Corporation Water
            </option>
            <option value="Borewell / Tube Well">Borewell / Tube Well</option>
            <option value="Open Well">Open Well</option>
            <option value="Tanker Water Supply">Tanker Water Supply</option>
            <option value="Rainwater Harvesting">Rainwater Harvesting</option>
            <option value="Combination / Mixed">Combination / Mixed</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Power Backup <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.powerBackup}
            onChange={(e) => {
              setPropertyData({ ...newProperty, powerBackup: e.target.value });
            }}
          >
            <option value="">Select Power Backup</option>
            <option value="State Electricity Board Supply">
              State Electricity Board Supply
            </option>
            <option value="Dedicated Transformer Supply">
              Dedicated Transformer Supply
            </option>
            <option value="DG (Diesel Generator) Backup">
              DG (Diesel Generator) Backup
            </option>
            <option value="Inverter / Battery Backup">
              Inverter / Battery Backup
            </option>
            <option value="Solar Power Supply">Solar Power Supply</option>
            <option value="Hybrid Power (Solar + Grid + DG)">
              Hybrid Power (Solar + Grid + DG)
            </option>
            <option value="No Power Supply">No Power Supply</option>
          </select>
        </div>
      </div>

      {/* Property Features And Benefits */}
      <h2 className="text-base font-semibold mt-6 mb-2">
        Step 2: Property Features
      </h2>

      {/* Property Features */}
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Location Feature <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.locationFeature}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                locationFeature: e.target.value,
              });
            }}
          >
            <option value="">Select Feature</option>
            <option value="Main Road Facing">Main Road Facing</option>
            <option value="Corner Plot / Corner Facing">
              Corner Plot / Corner Facing
            </option>
            <option value="Park Facing">Park Facing</option>
            <option value="Sea Facing">Sea Facing</option>
            <option value="Lake Facing">Lake Facing</option>
            <option value="River / Waterfront Facing">
              River / Waterfront Facing
            </option>
            <option value="Golf Course Facing">Golf Course Facing</option>
            <option value="City View / Skyline View">
              City View / Skyline View
            </option>
            <option value="Garden / Green Belt Facing">
              Garden / Green Belt Facing
            </option>
            <option value="Highway Facing">Highway Facing</option>
          </select>
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
              setPropertyData({
                ...newProperty,
                sizeAreaFeature: e.target.value,
              });
            }}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Parking Feature <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.parkingFeature}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                parkingFeature: e.target.value,
              });
            }}
          >
            <option value="">Select Parking Feature</option>
            <option value="Basement Parking">Basement Parking</option>
            <option value="Visitor Parking">Visitor Parking</option>
            <option value="Mechanical / Automated Parking">
              Mechanical / Automated Parking
            </option>
            <option value="Two-Wheeler Parking">Two-Wheeler Parking</option>
            <option value="Dedicated Parking Slot">
              Dedicated Parking Slot
            </option>
            <option value="Shared Parking">Shared Parking</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Balcony / Terrace Feature <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.terraceFeature}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                terraceFeature: e.target.value,
              });
            }}
          >
            <option value="">Select Feature</option>
            <option>Main Road Facing</option>
            <option>Corner Plot / Corner Facing</option>
            <option>Park Facing</option>
            <option>Sea Facing</option>
            <option>Lake Facing</option>
            <option>River / Waterfront Facing</option>
            <option>Golf Course Facing</option>
            <option>City View / Skyline View</option>
            <option>Garden / Green Belt Facing</option>
            <option>Highway Facing</option>
          </select>
        </div>
        <div className="w-full ">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Age Of Property <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="Enter Feature Here"
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.ageOfPropertyFeature}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                ageOfPropertyFeature: e.target.value,
              });
            }}
          />
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Amenities Feature <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.amenitiesFeature}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                amenitiesFeature: e.target.value,
              });
            }}
          >
            <option value="">Select Amenities Feature</option>
            <option value="Lift / Elevator">Lift / Elevator</option>
            <option value="Power Backup">Power Backup</option>
            <option value="24x7 Water Supply">24x7 Water Supply</option>
            <option value="Security / CCTV Surveillance">
              Security / CCTV Surveillance
            </option>
            <option value="Car Parking">Car Parking</option>
            <option value="Gym / Fitness Center">Gym / Fitness Center</option>
            <option value="Swimming Pool">Swimming Pool</option>
            <option value="Children's Play Area">Children's Play Area</option>
            <option value="Clubhouse / Community Hall">
              Clubhouse / Community Hall
            </option>
            <option value="No Feature">No Feature</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Property Status <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.propertyStatusFeature}
            onChange={(e) =>
              setPropertyData({
                ...newProperty,
                propertyStatusFeature: e.target.value,
              })
            }
          >
            <option value="">Select Property Status</option>
            <option value="Under Construction">Under Construction</option>
            <option value="Ready to Move New Launch">
              Ready to Move New Launch
            </option>
            <option value="Resale">Resale</option>
            <option value="Upcoming Project">Upcoming Project</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Smart Home Feature <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.smartHomeFeature}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                smartHomeFeature: e.target.value,
              });
            }}
          >
            <option value="">Select a feature</option>
            <option value="Smart Door Lock / Digital Lock">
              Smart Door Lock / Digital Lock
            </option>
            <option value="Video Door Phone">Video Door Phone</option>
            <option value="Smart Lighting Control">
              Smart Lighting Control
            </option>
            <option value="Smart Thermostat / Climate Control">
              Smart Thermostat / Climate Control
            </option>
            <option value="App-Controlled Appliances">
              App-Controlled Appliances
            </option>
            <option value="Voice Assistant Integration (Alexa, Google Home, etc.)">
              Voice Assistant Integration (Alexa, Google Home, etc.)
            </option>
            <option value="Smart Security Cameras / CCTV with Remote Access">
              Smart Security Cameras / CCTV with Remote Access
            </option>
            <option value="Motion Sensor Lighting">
              Motion Sensor Lighting
            </option>
            <option value="Smart Smoke / Gas Leak Detectors">
              Smart Smoke / Gas Leak Detectors
            </option>
            <option value="Automated Curtains / Blinds">
              Automated Curtains / Blinds
            </option>
            <option value="No Feature">No Feature</option>
          </select>
        </div>
      </div>

      {/* Property Features And Benefits */}
      <h2 className="text-base font-semibold mt-6 mb-2">
        Step 3: Property Benefits
      </h2>

      {/* Property Features */}
      <div className="grid gap-6 md:gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Security Benefits <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.securityBenefit}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                securityBenefit: e.target.value,
              });
            }}
          >
            <option value="">Select Security Benefit</option>
            <option value="24x7 Security">24x7 Security</option>
            <option value="CCTV Surveillance">CCTV Surveillance</option>
            <option value="Gated Community">Gated Community</option>
            <option value="Intercom Facility">Intercom Facility</option>
            <option value="Fire Safety System">Fire Safety System</option>
          </select>
        </div>

        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Prime Location <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.primeLocationBenefit}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                primeLocationBenefit: e.target.value,
              });
            }}
          >
            <option value="">Select Benefit</option>
            <option value="Near School / College">Near School / College</option>
            <option value="Near Hospital">Near Hospital</option>
            <option value="Near Market / Shopping Mall">
              Near Market / Shopping Mall
            </option>
            <option value="Near Public Transport">Near Public Transport</option>
            <option value="Near IT / Business Hub">
              Near IT / Business Hub
            </option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Rental Income Possibilities <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            value={newProperty.rentalIncomeBenefit}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                rentalIncomeBenefit: e.target.value,
              });
            }}
          >
            <option value="">Select Rental Income Possibility</option>
            <option value="Residential Long-Term Rental">
              Residential Long-Term Rental
            </option>
            <option value="Residential Short-Term / Vacation Rental">
              Residential Short-Term / Vacation Rental
            </option>
            <option value="Paying Guest (PG) Accommodation">
              Paying Guest (PG) Accommodation
            </option>
            <option value="Commercial Space Rental">
              Commercial Space Rental
            </option>
            <option value="Co-working Space Rental">
              Co-working Space Rental
            </option>
            <option value="Retail Shop Rental">Retail Shop Rental</option>
            <option value="Warehouse / Storage Rental">
              Warehouse / Storage Rental
            </option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Quality Construction <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500  appearance-none"
            value={newProperty.qualityBenefit}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                qualityBenefit: e.target.value,
              });
            }}
          >
            <option value="">Select Benefit</option>
            <option value="Longer Building Life">Longer Building Life</option>
            <option value="Low Maintenance Cost">Low Maintenance Cost</option>
            <option value="Better Safety & Structural Strength">
              Better Safety & Structural Strength
            </option>
            <option value="Higher Property Value">Higher Property Value</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Capital Appreciation <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500  appearance-none"
            value={newProperty.capitalAppreciationBenefit}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                capitalAppreciationBenefit: e.target.value,
              });
            }}
          >
            <option value="">Select Benefit</option>
            <option value="Higher Resale Value">Higher Resale Value</option>
            <option value="Increased Return on Investment (ROI)">
              Increased Return on Investment (ROI)
            </option>
            <option value="Wealth Creation Over Time">
              Wealth Creation Over Time
            </option>
            <option value="Better Loan Collateral Value">
              Better Loan Collateral Value
            </option>
            <option value="Inflation Hedge">Inflation Hedge</option>
          </select>
        </div>
        <div className="w-full">
          <label className="block text-sm leading-4 text-[#00000066] font-medium">
            Eco-Friendly <span className="text-red-600">*</span>
          </label>
          <select
            required
            className="w-full mt-[10px] text-[16px] font-medium p-4 border border-[#00000033] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500  appearance-none"
            value={newProperty.ecofriendlyBenefit}
            onChange={(e) => {
              setPropertyData({
                ...newProperty,
                ecofriendlyBenefit: e.target.value,
              });
            }}
          >
            <option value="">Select Benefit</option>
            <option value="Lower Energy Bills">Lower Energy Bills</option>
            <option value="Reduced Water Consumption">
              Reduced Water Consumption
            </option>
            <option value="Healthier Living Environment">
              Healthier Living Environment
            </option>
            <option value="Lower Carbon Footprint">
              Lower Carbon Footprint
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
