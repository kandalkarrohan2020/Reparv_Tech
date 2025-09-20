import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { useAuth } from "../store/auth";
import { usePropertyFilter } from "../store/propertyFilter";

import delhiImage from "../assets/citySelector/delhi.jpeg";
import mumbaiImage from "../assets/citySelector/mumbai.jpeg";
import nagpurImage from "../assets/citySelector/nagpur.jpeg";
import puneImage from "../assets/citySelector/pune.jpeg";
import ahmadabadImage from "../assets/citySelector/ahmadabad.jpeg";
import bangloreImage from "../assets/citySelector/banglore.jpeg";
import kolkataImage from "../assets/citySelector/kolkata.jpeg";
import hyderabadImage from "../assets/citySelector/hyderabad.jpeg";
import chennaiImage from "../assets/citySelector/chennai.jpeg";
import noidaImage from "../assets/citySelector/noida.jpeg";
import lucknowImage from "../assets/citySelector/lucknow.jpeg";
import nashikImage from "../assets/citySelector/nashik.jpeg";
import jodhpurImage from "../assets/citySelector/jodhpur.jpeg";
import jaipurImage from "../assets/citySelector/jaipur.jpeg";
import chandigarhImage from "../assets/citySelector/chandigarh.jpeg";

export const popularCities = [
  { name: "Delhi", image: delhiImage },
  { name: "Mumbai", image: mumbaiImage },
  { name: "Bangalore", image: bangloreImage },
  { name: "Nagpur", image: nagpurImage },
  { name: "Pune", image: puneImage },
  { name: "Lucknow", image: lucknowImage },
  { name: "Hyderabad", image: hyderabadImage },
  { name: "Ahmadabad", image: ahmadabadImage },
  { name: "Noida", image: noidaImage },
  { name: "Chennai", image: chennaiImage },
  { name: "Nashik", image: nashikImage },
  { name: "Jaipur", image: jaipurImage },
  { name: "Jodhpur", image: jodhpurImage },
  { name: "Kolkata", image: kolkataImage },
  { name: "Chandigarh", image: chandigarhImage },
];

export default function CitySelector() {
  const {
    URI,
    showCitySelector,
    setShowCitySelector,
    selectedCity,
    setSelectedCity,
  } = useAuth();

  const { resetSidebarFilter } = usePropertyFilter();

  const [search, setSearch] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [cities, setCities] = useState([]);

  // *Fetch Data from API*
  const fetchAllCity = async () => {
    try {
      const response = await fetch(URI + "/frontend/properties/cities", {
        method: "GET",
        credentials: "include", // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cities.");

      const data = await response.json();
      setCities(data); // Sets the cities array
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  useEffect(() => {
    fetchAllCity();
  }, []);

  useEffect(() => {
    resetSidebarFilter();
  }, [selectedCity]);

  const filteredCities = cities?.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredCities);
  // Handle user current location
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const cityName =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;
          if (cityName) {
            const formattedCity =
              cityName.charAt(0).toUpperCase() + cityName.slice(1);
            setSelectedCity(formattedCity);
            //setShowCitySelector(false);
          } else {
            alert("Could not detect your city");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
          alert("Failed to get location. Try again.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Permission denied or location unavailable.");
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div className="bg-white rounded-tl-xl rounded-tr-xl sm:rounded-xl shadow-lg w-full max-h-[90vh] flex flex-col gap-3 sm:gap-6 md:max-w-4xl p-4 sm:p-6 pt-6 relative">
      <div className="flex gap-4 items-center justify-between mb-1">
        <h2 className="text-base font-semibold">Select your city</h2>
        <button
          onClick={() => setShowCitySelector(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiX className="w-5 h-5 text-gray-800 cursor-pointer" />
        </button>
      </div>

      {/* Search Bar Container */}
      <div className="w-full flex gap-3 flex-col md:flex-row items-center justify-between">
        {/* Search Bar */}
        <div className="w-full md:w-1/2 md:min-w-[400px] lg:min-w-[550px] flex items-center justify-center relative">
          <span className="absolute inset-y-0 left-4 md:left-4 flex items-center text-gray-400">
            <IoSearchSharp className="w-4 md:w-5 h-4 md:h-5" />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search For Your City"
            className="w-full pl-10 md:pl-11 pr-4 py-[10px] text-sm md:text-base font-semibold rounded-lg border-2 border-gray-300 focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#00C42B] placeholder:text-[#00000066]"
          />
        </div>
        {/* Use Current Location */}
        <button
          onClick={handleUseCurrentLocation}
          disabled={loadingLocation}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm md:text-base font-medium text-white bg-[#0BB501] rounded-lg transition cursor-pointer"
        >
          <FaMapMarkerAlt />
          {loadingLocation ? "Detecting location..." : "Use current location"}
        </button>
      </div>

      {/* Show Searched Properties */}
      <div className="w-full h-[40px] flex gap-4 overflow-scroll scrollbar-hide">
        {filteredCities?.length > 0 ? (
          filteredCities.map((city, index) => (
            <div
              key={index}
              onClick={() => {
                setSelectedCity(city);
                setShowCitySelector(false);
              }}
              className="flex items-center justify-center font-semibold border-2 border-gray-300 hover:border-[#0BB501] px-4 py-1 rounded-xl text-[#0BB501] active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span className="whitespace-nowrap text-sm md:text-base">
                {city}
              </span>
            </div>
          ))
        ) : (
          <span className="font-semibold text-red-500">City Not Found</span>
        )}
      </div>

      {/* Popular Cities */}
      <h3 className="text-md font-semibold">Popular cities</h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-4 py-1 overflow-scroll scrollbar-hide">
        {popularCities.map((city, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedCity(city.name);
              setShowCitySelector(false);
            }}
            className="flex flex-col items-center cursor-pointer hover:scale-103 active:scale-100 transition-transform"
          >
            <img
              src={city.image}
              alt={city.name}
              className={`w-30 h-20 rounded-lg object-cover shadow-sm ${
                selectedCity === city.name ? "ring-2 ring-green-600" : ""
              }`}
            />
            <span
              className={`mt-2 text-sm font-medium ${
                selectedCity === city.name ? "text-green-600" : "text-gray-700"
              }`}
            >
              {city.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
