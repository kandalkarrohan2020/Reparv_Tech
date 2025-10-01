import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { IoFilter } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import VideoReviewSection from "../components/VideoReviewSection";
import { useAuth } from "../store/auth";
import FilterSidebar from "../components/FilterSidebar";
import { useInView } from "react-intersection-observer";
import { usePropertyFilter } from "../store/propertyFilter";
import SEO from "../components/SEO";
import PropertyCategories from "../components/PropertyCategories";
import { useParams } from "react-router-dom";
// Lazy import
const PropertyCard = React.lazy(() =>
  import("../components/property/PropertyCard")
);

export default function Properties() {
  const { setVideoInView, isIntersecting } = useOutletContext();
  const { ref: videoRef, inView: videoInView } = useInView({ threshold: 0.1 });
  const navigate = useNavigate();
  const { slug } = useParams(); // e.g. "2-BHK-NewFlat-in-Nagpur"

  const {
    filteredLocations,
    setFilteredLocations,
    selectedType,
    setSelectedType,
    selectedBHKType,
    setSelectedBHKType,
    minBudget,
    maxBudget,
  } = usePropertyFilter();

  const {
    URI,
    propertyType,
    setPropertyType,
    selectedCity,
    setSelectedCity,
    setShowFilterPopup,
    setShowCitySelector,
  } = useAuth();

  // Split the slug into parts
  // Format expected: {bhkType}-{propertyCategory}-in-{city}
  const regex = /^(\d+-?[A-Za-z]+)-(.*)-in-(.*)$/;
  const match = slug?.match(regex);

  let bhkType = "";
  let propertyCategory = "";
  let city = "";

  if (match) {
    bhkType = match[1].replace("-", " ") || ""; // "2 BHK"
    propertyCategory = match[2] || ""; // "NewFlat"
    city = match[3].replace(/-/g, " ") || ""; // "Nagpur"
  } else if (slug) {
    setSelectedCity(slug);
  }

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = filteredProperties?.filter((item) => {
    const term = searchTerm?.toLowerCase() || "";

    return (
      item?.propertyName?.toLowerCase().includes(term) ||
      item?.propertyCategory?.toLowerCase().includes(term) ||
      item?.tags?.toLowerCase().includes(term) ||
      (Array.isArray(item?.propertyType) &&
        item.propertyType.some((type) => type.toLowerCase().includes(term))) ||
      (Array.isArray(item?.tags)
        ? item.tags.some((tag) => tag.toLowerCase().includes(term))
        : item?.tags?.toLowerCase().includes(term)) // fallback if stored as string
    );
  });

  const fetchData = async () => {
    try {
      let url = `${URI}/frontend/properties/get-all-by-slug?`;
      const params = [];

      if (selectedCity && selectedCity.trim() !== "") {
        params.push(`city=${encodeURIComponent(selectedCity)}`);
      }

      if (propertyType && propertyType.trim() !== "") {
        params.push(`propertyCategory=${encodeURIComponent(propertyType)}`);
      }

      if (selectedBHKType && selectedBHKType.trim() !== "") {
        params.push(`propertyType=${encodeURIComponent(selectedBHKType)}`);
      }

      url += params.join("&");

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch properties.");

      const data = await response.json();
      //console.log(data);
      setProperties(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    setVideoInView(videoInView);
  }, [videoInView]);

  useEffect(() => {
    setSelectedCity(city || selectedCity);
    setPropertyType(propertyCategory || propertyType);
    setSelectedType(propertyCategory || selectedType);
    setSelectedBHKType(bhkType || selectedBHKType);
  }, [bhkType, propertyCategory, city]);

  useEffect(() => {
    fetchData();
  }, [propertyType, selectedCity, bhkType, propertyCategory, city]);

  useEffect(() => {
    const filtered = properties.filter((item) => {
      const matchesBHK =
        !selectedBHKType || // if none selected → allow all
        (Array.isArray(item.propertyType)
          ? item.propertyType.includes(selectedBHKType) // when stored as array
          : item.propertyType === selectedBHKType); // when stored as string

      const matchesLocation =
        filteredLocations.length === 0 ||
        filteredLocations.includes(item.location);

      const matchesBudget =
        item.totalOfferPrice >= minBudget && item.totalOfferPrice <= maxBudget;

      return matchesBHK && matchesLocation && matchesBudget;
    });

    setFilteredProperties(filtered);
  }, [
    properties,
    propertyType,
    filteredLocations,
    minBudget,
    maxBudget,
    selectedBHKType,
  ]);

  return (
    <>
      <SEO
        title={
          properties[0]?.metaTitle ||
          "Explore All Property Types on Reparv – Buy, Rent or Invest"
        }
        description={
          properties[0]?.metaDescription ||
          "Find flats, plots, rentals, farmhouses, shops & commercial spaces in Nagpur & beyond. Explore verified listings & start your property journey with Reparv today!"
        }
      />
      <div className="properties w-full max-w-[1400px] flex flex-col p-4 sm:py-4 sm:px-0 mx-auto">
        <div className="w-full flex flex-wrap gap-3 justify-beteen sm:justify-end sm:py-2 sm:px-5">
          {/* City Selector And Location Filter For MobileScreen  */}
          <div className="w-full flex sm:hidden gap-2 items-center justify-between">
            {/* City Selector  */}
            <div
              onClick={() => {
                setShowCitySelector(true);
                navigate("/properties");
              }}
              className={`selectCity sm:hidden min-w-[200px] max-w-[300px] relative py-[6px] rounded-lg px-4 cursor-pointer border border-gray-300`}
            >
              <div className="flex gap-2 items-center justify-center text-base font-semibold  text-black lg:p-1 ">
                <CiLocationOn className="w-5 h-5" />
                <span className="block whitespace-nowrap ">
                  {selectedCity
                    ? selectedCity.length > 12
                      ? `${selectedCity.slice(0, 11)}...`
                      : selectedCity
                    : "Select City"}
                </span>
                <RiArrowDropDownLine className="w-6 h-6 text-[#000000B2]" />
              </div>
            </div>
            <div
              onClick={() => {
                setShowFilterPopup(true);
              }}
              className="filterIcon p-[10px] border border-gray-300 rounded-md flex items-center justify-center"
            >
              <IoFilter />
            </div>
          </div>
          {/* Search Bar */}
          <div className="w-full sm:w-1/2 sm:min-w-[350px] flex items-center justify-center relative">
            <span className="absolute inset-y-0 left-4 md:left-4 flex items-center text-gray-400">
              <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search For Your Favourite Property"
              className="w-full pl-10 md:pl-11 pr-4 py-[10px] text-sm font-medium md:text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00C42B] placeholder:text-[#00000066]"
            />
          </div>
        </div>
        <div className=" relative w-full min-h-[77vh] flex gap-5 py-4 sm:p-4">
          {/* Properties Filter */}
          <div
            className={`${isIntersecting ? "absolute bottom-0 " : "fixed"} 
          propertiesFilter overflow-y-scroll overflow-x-visible scrollbar-hide hidden sm:block
          !min-w-[220px] w-[220px] h-[75vh] pb-10 transition-all duration-300`}
          >
            <FilterSidebar />
          </div>

          {/* Properties Grid */}
          <div className="w-full overflow-scroll scrollbar-hide sm:pl-[260px] flex flex-col">
            <div className="w-full flex flex-col sm:flex-row sm:gap-4 items-end justify-between text-lg sm:text-2xl ">
              <h2 className="text-black font-semibold ">
                {filteredData.length} Result
                <span className="text-[#9C9CA3] font-normal"> Found </span>
              </h2>
              <h1 className="text-base text-[#606060] font-semibold mr-3">
                {selectedCity && properties[0]?.heading}
              </h1>
            </div>

            {/* Used Suspense For Optimization */}
            <Suspense
              fallback={
                <div className="rounded-full text-2xl font-bold">
                  Properties Loading...
                </div>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {filteredData.length > 0 ? (
                  filteredData.map((property) => (
                    // Property Card

                    <PropertyCard property={property} />
                  ))
                ) : (
                  <h1 className="text-2xl font-bold m-4">
                    No Properties Found
                  </h1>
                )}
              </div>
            </Suspense>

            <div className="w-full  hidden md:block h-[1px] mt-5 bg-[#00000033] "></div>
            <div>
              <PropertyCategories />
            </div>
            <div className="w-full  hidden md:block h-[1px] mt-5 bg-[#00000033] "></div>
            {/* Customer Review */}
            <div>
              <VideoReviewSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
