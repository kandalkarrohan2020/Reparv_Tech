import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Range } from "react-range";
import { useAuth } from "../store/auth";
import { usePropertyFilter } from "../store/propertyFilter";
import { RxCross2 } from "react-icons/rx";

export default function FilterSidebar() {
  const {
    URI,
    propertyType,
    setPropertyType,
    selectedCity,
    setSelectedCity,
    setShowFilterPopup,
  } = useAuth();
  const {
    filteredLocations,
    setFilteredLocations,
    selectedType,
    setSelectedType,
    minBudget,
    setMinBudget,
    maxBudget,
    setMaxBudget,
  } = usePropertyFilter();

  const propertyTypes = [
    "NewFlat",
    "NewPlot",
    "RentalFlat",
    "RentalPlot",
    "RentalOffice",
    "Resale",
    "RowHouse",
    "Lease",
    "FarmLand",
    "FarmHouse",
    "CommercialFlat",
    "CommercialFlat",
    "IndustrialSpace",
  ];

  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [budgetRange, setBudgetRange] = useState([minBudget, maxBudget]);

  const [showLocations, setShowLocations] = useState(true);
  const [showTypes, setShowTypes] = useState(true);
  const [showBudget, setShowBudget] = useState(true);

  const MIN = 5000;
  const MAX = 1000000;
  const STEP = 10000;

  const toggleSelection = (value, setFn, list) => {
    if (list.includes(value)) {
      setFn(list.filter((item) => item !== value));
    } else {
      setFn([...list, value]);
    }
  };

  const fetchLocations = async () => {
    try {
      const queryParams = [];

      if (selectedType && selectedType.trim() !== "") {
        queryParams.push(
          `propertyCategory=${encodeURIComponent(selectedType)}`
        );
      }

      if (selectedCity && selectedCity.trim() !== "") {
        queryParams.push(`city=${encodeURIComponent(selectedCity)}`);
      }

      const url = `${URI}/frontend/properties/location${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch locations.");

      const data = await response.json();
      setLocations([...data]);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setLocations([]);
    }
  };

  useEffect(() => {
    setSelectedType(propertyType);
  }, []);
  const resetFilters = () => {
    setSelectedLocations([]);
    setSelectedType("");
    setBudgetRange([MIN, MAX]);
  };

  useEffect(() => {
    fetchLocations();
  }, [selectedType]);

  return (
    <div className="w-full bg-[#FAFAFA] sm:bg-transparent p-5 sm:p-0 rounded-tl-2xl rounded-tr-2xl sm:rounded-0  space-y-6">
      {/* Property Types */}
      <div>
        <div
          className="flex sm:hidden justify-end items-center cursor-pointer pb-4"
          onClick={() => setShowTypes(!showTypes)}
        >
          <RxCross2
            onClick={() => {
              setShowFilterPopup(false);
            }}
            className="w-5 h-5 sm:w-7 p-1 sm:h-7 rounded-sm bg-gray-100 cursor-pointer hover:text-[#076300] active:scale-95"
          />
        </div>

        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowTypes(!showTypes)}
        >
          <h3 className="font-semibold text-lg">Type of Property</h3>
          {showTypes ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showTypes && (
          <div className="space-y-2 mt-2 max-h-[120px] overflow-y-auto scrollbar-hide">
            {propertyTypes.map((type, i) => (
              <label
                key={i}
                className="flex items-center space-x-2 cursor-pointer select-none"
              >
                <input
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={selectedType === type}
                  onChange={() => setSelectedType(type)}
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 flex items-center justify-center rounded-full border-2 text-xs ${
                    selectedType === type
                      ? "bg-[#076300] border-[#076300] text-white"
                      : "border-gray-400"
                  }`}
                >
                  {selectedType === type && <FaCheck className="text-white" />}
                </span>
                <span className="text-xs">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Locations */}
      <div>
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowLocations(!showLocations)}
        >
          <h3 className="font-semibold text-lg">Locations</h3>
          {showLocations ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {showLocations && (
          <div className="space-y-2 mt-2 max-h-32 overflow-y-auto scrollbar-hide ">
            {locations.map((loc, i) => (
              <label
                key={i}
                className="flex items-center space-x-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(loc)}
                  onChange={() =>
                    toggleSelection(
                      loc,
                      setSelectedLocations,
                      selectedLocations
                    )
                  }
                  className="hidden"
                />
                <span
                  className={`w-4 h-4 flex items-center justify-center rounded border-2 text-xs ${
                    selectedLocations.includes(loc)
                      ? "bg-[#076300] border-[#076300] text-white"
                      : "border-gray-400"
                  }`}
                >
                  {selectedLocations.includes(loc) && (
                    <FaCheck className="text-white" />
                  )}
                </span>
                <span className="text-xs">{loc}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Budget */}
      <div className="w-full">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShowBudget(!showBudget)}
        >
          <h3 className="font-semibold text-lg">Budget</h3>
          {showBudget ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {showBudget && (
          <div className="mt-4">
            {/*<Range
              values={budgetRange}
              step={STEP}
              min={MIN}
              max={MAX}
              onChange={(vals) => setBudgetRange(vals)}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 w-full bg-gray-300 rounded relative"
                  style={{ ...props.style }}
                >
                  <div
                    className="absolute max-w-full h-2 bg-[#076300] rounded"
                    style={{
                      left: `${((budgetRange[0] - MIN) / (MAX - MIN)) * 100}%`,
                      width: `${
                        ((budgetRange[1] - budgetRange[0]) / (MAX - MIN)) * 100
                      }%`,
                    }}
                  />
                  {children}
                </div>
              )}
              renderThumb={({ props }) => {
                const { key, ...rest } = props;
                return (
                  <div
                    key={key}
                    {...rest}
                    className="w-5 h-5 bg-white border border-[#D1D1D1] rounded-full shadow-md flex items-center justify-center"
                  />
                );
              }}
            /> */}
            <div className="w-full flex items-center justify-between gap-4 mt-5 text-sm text-gray-700">
              <div className="flex flex-col">
                <span className="ml-1 mb-1 text-black text-xs font-semibold">
                  {" "}
                  Min{" "}
                </span>
                <input
                  type="number"
                  value={budgetRange[0]}
                  onChange={(e) =>
                    setBudgetRange([Number(e.target.value), budgetRange[1]])
                  }
                  className="w-[140px] sm:w-[100px] border text-sm sm:text-xs border-gray-300 rounded-lg px-4 py-2 sm:px-2 sm:py-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="ml-1 mb-1 text-black text-xs font-semibold">
                  {" "}
                  Max
                </span>
                <input
                  type="number"
                  value={budgetRange[1]}
                  onChange={(e) =>
                    setBudgetRange([budgetRange[0], Number(e.target.value)])
                  }
                  className="w-[140px] sm:w-[100px] border text-sm sm:text-xs border-gray-300 rounded-lg px-4 py-2 sm:px-2 sm:py-1"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 pt-2">
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded"
        >
          Reset
        </button>
        <button
          onClick={async () => {
            setPropertyType(selectedType);
            setFilteredLocations([...selectedLocations]);
            setMinBudget(budgetRange[0]);
            setMaxBudget(budgetRange[1]);
            setShowFilterPopup(false);
          }}
          className="flex-1 bg-[#0BB501] text-white py-2 rounded cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
