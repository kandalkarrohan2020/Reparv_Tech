import React, { useState, useEffect, useMemo, useRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Fuse from "fuse.js";

const PropertySearch = ({
  searchInputRef,
  properties,
  searchTerm,
  setSearchTerm,
}) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Fuzzy search setup
  const fuse = useMemo(() => {
    const options = {
      keys: [
        "propertyName",
        "propertyCategory",
        "propertyType",
        "city",
        "location",
        "description",
        "tags"
      ],
      threshold: 0.4, // controls fuzziness
      includeScore: true,
    };
    return new Fuse(properties, options);
  }, [properties]);

  // Filter results based on input
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredResults([]);
      return;
    }
    const results = fuse.search(searchTerm);
    setFilteredResults(results.map((res) => res.item));
  }, [searchTerm, fuse]);

  // Hide results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle selecting a search result
  const handleSelect = (property) => {
    setSearchTerm(property.propertyName);
    setShowResults(false);
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowResults(false);
      // You can trigger your main search action here:
      console.log("Search confirmed:", searchTerm);
      // Example: call a parent function or navigate to search results page
      // onSearch(searchTerm);
    }
  };

  return (
    <div className="relative w-full sm:w-1/2 sm:min-w-[350px]" ref={searchRef}>
      {/* Search Bar */}
      <div className="flex items-center justify-center relative">
        <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
          <IoSearchSharp className="w-5 h-5" />
        </span>
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowResults(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search for your favourite property..."
          className="w-full pl-12 pr-4 py-3 text-sm md:text-base font-medium rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00C42B] focus:border-transparent placeholder:text-gray-400 transition-all duration-300"
        />
      </div>

      {/* Results Dropdown */}
      {showResults && filteredResults.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl max-h-80 overflow-y-auto z-[9999] animate-fadeIn">
          {filteredResults.map((property, index) => (
            <div
              key={index}
              onClick={() => handleSelect(property)}
              className="px-4 py-3 cursor-pointer hover:bg-[#00b5002a] transition-all duration-200"
            >
              <h3 className="text-[15px] font-semibold text-gray-800">
                {property.propertyName}
              </h3>
              <p className="text-sm text-gray-500">
                {property.city} - {property.location}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {showResults && searchTerm && filteredResults.length === 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 p-4 text-gray-500 text-sm text-center z-[9999]">
          No matching properties found.
        </div>
      )}
    </div>
  );
};

export default PropertySearch;
