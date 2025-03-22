import { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { MdOutlineKingBed } from "react-icons/md";
import { FaVectorSquare } from "react-icons/fa";
import { SlEnergy } from "react-icons/sl";
import propertyPicture from "../assets/property/propertyPicture.svg";
import PropertyImageSlider from "../components/property/PropertyImageSlider";
import { useAuth } from "../store/auth";
import { FaHeart } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { FaDiamond } from "react-icons/fa6";
import populerTag from "../assets/property/populerTag.svg";
import OtherProperties from "../components/OtherProperties";
import { useParams } from "react-router-dom";

const property = {
  title: "Seaside Serenity Villa",
  location: "Nagpur, Maharashtra",
  price: "1,250,000",
  description:
    "Discover your own piece of paradise with the Seaside Serenity Villa. With an open floor plan, breathtaking ocean views from every room, and direct access to a pristine sandy beach, this property is the epitome of coastal living.",
  details: {
    bedrooms: 4,
    bathrooms: 3,
    area: "2,500 Sq.Ft",
  },
  features: [
    "Expansive oceanfront terrace for outdoor entertaining",
    "Gourmet kitchen with top-of-the-line appliances",
    "Private beach access for morning strolls and sunset views",
    "Master suite with a spa-inspired bathroom and ocean-facing balcony",
    "Private garage and ample storage space",
  ],
  images: [
    propertyPicture,
    propertyPicture,
    propertyPicture,
    propertyPicture,
    propertyPicture,
    propertyPicture,
  ],
};

export default function PropertyInfo() {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setShowInquiryForm, URI } = useAuth();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? propertyImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === propertyImages.length - 1 ? 0 : prev + 1
    );
  };

  // *Fetch Data from API*
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/frontend/propertyinfo/" + id, {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch property info.");

      const data = await response.json();
      console.log(data);
      setPropertyInfo(data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };

  // *Fetch Data from API*
  const fetchImages = async () => {
    try {
      const response = await fetch(
        URI + "/frontend/propertyinfo/getimages/" + id,
        {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch property info.");

      const data = await response.json();
      console.log(data);
      setPropertyImages([...data]);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };
  console.log("image", propertyImages);
  useEffect(() => {
    fetchData();
    fetchImages();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4">
      {/* "Heading" */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-base sm:text-xl font-semibold">
            {propertyInfo.property_name}
          </h1>
          <div className="flex items-center text-xs gap-1 text-[#000000] border border-[#00000033] rounded-lg py-2 px-4 ">
            <FaMapMarkerAlt className="text-black" />
            <span>
              {propertyInfo.location}, {propertyInfo.city}
            </span>
          </div>
        </div>
        <div className="w-[100px] h-13 flex flex-col items-start justify-center">
          <p className="text-xs ml-1 text-[#00000066] font-medium">Price</p>
          <div className="flex items-center justify-center text-base font-semibold text-black">
            <MdCurrencyRupee className="w-5 h-5" />
            <span>{propertyInfo.sqft_price}</span>
          </div>
        </div>
      </div>

      {/* Image Container */}
      <PropertyImageSlider property={propertyImages} />

      <div className="description grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="h-70 flex flex-col gap-2 p-4 md:p-7 border border-[#00000033] rounded-lg">
          <h2 className="text-lg leading-6 font-semibold">Description</h2>

          <p className="text-[#00000066] text-xs font-medium leading-5 mt-2">
            {propertyInfo.description}
          </p>
          <hr />
          <div className="grid grid-cols-2 gap-y-2 my-2 text-[#00000066] text-[10px] font-medium">
            <p>
              <b className="text-xs text-black">Wing : </b> {propertyInfo.wing}
            </p>
            <p>
              <b className="text-xs text-black">Price : </b> {propertyInfo.sqft_price}
            </p>
            <p>
              <b className="text-xs text-black">Floor :</b> {propertyInfo.floor}
            </p>
            <p>
              <b className="text-xs text-black">Flat_No :</b>{" "}
              {propertyInfo.flatno}
            </p>
            <p>
              <b className="text-xs text-black">Direction :</b>{" "}
              {propertyInfo.direction}
            </p>
            <p>
              <b className="text-xs text-black">CarpetArea :</b>{" "}
              {propertyInfo.carpetarea}
            </p>
            <p>
              <b className="text-xs text-black">Super Builtup : </b>
              {propertyInfo.superbuiltup}
            </p>
            <p>
              <b className="text-xs text-black">Construction Age :</b>{" "}
              {propertyInfo.ageofconstruction} year
            </p>
          </div>

          <div className=" hidden  grid-cols-2 sm:grid-cols-3 gap-3 text-sm place-items-center font-medium mt-4 px-4 py-4 border-t">
            <div className="bedroom w-full h-22 flex-1 gap-3 flex-col text-[#00000066] px-3">
              <div className="flex items-center gap-1 text-xs">
                <MdOutlineKingBed className="w-5 h-5" />
                <p>Bedrooms</p>
              </div>
              <p className="text-sm md:text-lg text-black font-semibold">3</p>
            </div>

            <div className="bathroom w-full h-22 flex-1 gap-3 flex-col text-[#00000066] px-3 border-l sm:border-x">
              <div className="flex items-center gap-1 text-xs">
                <BiBath className="w-5 h-5" />
                <p>Bathrooms</p>
              </div>
              <p className="text-sm md:text-lg text-black font-semibold">4</p>
            </div>
            <div className="area w-full sm:w-[130px] flex-1 h-22 gap-3 flex-col text-[#00000066] px-3 border-t sm:border-t-0 pt-2 sm:pt-0">
              <div className="flex items-center gap-1 text-xs">
                <FaVectorSquare className="" />
                <p>Area</p>
              </div>
              <p className="text-sm md:text-lg text-black font-semibold">
                {propertyInfo.area}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-4 sm:p-6 border sm:pb-10 border-[#00000033] rounded-lg">
          <h2 className="text-lg font-semibold">Key Features and Amenities</h2>
          <ul className="mt-2 space-y-2">
            {property.features.map((feature, index) => (
              <li
                key={index}
                className=" flex items-center gap-2 p-2 sm:p-3 mt-6 font-medium leading-5 bg-[#045C01] text-white text-xs rounded-lg sm:rounded-none"
              >
                <SlEnergy className="w-5 h-5 !text-base" /> <p>{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Inquiry Button */}
      <div
        onClick={() => {
          setShowInquiryForm(true);
        }}
        className="inquiryBtn fixed z-30 w-full sm:w-auto right-0 bottom-0 sm:bottom-15 sm:right-25 md:bottom-25 md:right-35 px-4 py-2 sm:px-10 sm:py-3 bg-[#0BB501] rounded-tl-2xl border-2 border-white sm:border-none  rounded-tr-2xl sm:rounded-[32px] text-white text-md sm:text-xl sm:shadow-[0px_4px_8px_0px_#0B51014D] hover:scale-105 active:scale-100 cursor-pointer"
      >
        <p className="text-center font-medium text-white">Inquiry Now</p>
      </div>
      {/* Other Video Section */}
      <div className="otherVideo w-full hidden flex-col p-5 md:flex">
        <h2 className="videHEading text-lg md:text-[24px] mx-auto text-black leading-8 font-bold ">
          Other Properties in this Project and Nearby
        </h2>
        {/* Properties Grid */}
        <OtherProperties />
      </div>
    </div>
  );
}
