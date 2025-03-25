import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaArrowLeft, FaArrowRight, FaHeart, FaRupeeSign } from "react-icons/fa";
import { MdCurrencyRupee, MdOutlineKingBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaVectorSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import PropertyImageSlider from "../components/property/PropertyImageSlider";
import OtherProperties from "../components/property/OtherProperties";
//import propertyPicture from "../assets/property/propertyPicture.svg";

export default function PropertyInfo() {
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const { setShowInquiryForm, URI } = useAuth();

  // Fetch Property Info
  const fetchData = async () => {
    try {
      const response = await fetch(`${URI}/frontend/propertyinfo/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property info.");
      const data = await response.json();
      setPropertyInfo(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching property info:", err);
    }
  };

  // Fetch Property Images
  const fetchImages = async () => {
    try {
      const response = await fetch(`${URI}/frontend/propertyinfo/getimages/${id}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch property images.");
      const data = await response.json();
      setPropertyImages([...data]);
    } catch (err) {
      console.error("Error fetching property images:", err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImages();
  }, [id]);

  // Format YouTube URL
  const formatYouTubeEmbedUrl = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url?.match(regex);
    const videoId = match ? match[1] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const videoEmbedUrl = formatYouTubeEmbedUrl(propertyInfo?.videourl);

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-4">
      {/* Property Heading */}
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-base sm:text-xl font-semibold">{propertyInfo.property_name}</h1>
          <div className="flex items-center text-xs gap-1 text-[#000000] border border-[#00000033] rounded-lg py-2 px-4">
            <FaMapMarkerAlt />
            <span>{propertyInfo.location}, {propertyInfo.city}</span>
          </div>
        </div>
        <div className="w-[100px] flex flex-col items-start justify-center">
          <p className="text-xs ml-1 text-[#00000066] font-medium">Price</p>
          <div className="flex items-center text-base font-semibold text-black">
            <MdCurrencyRupee className="w-5 h-5" />
            <span>{propertyInfo.sqft_price}</span>
          </div>
        </div>
      </div>

      {/* Image Slider */}
      <PropertyImageSlider property={propertyImages} />

      {/* Description & Video */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {/* Description */}
        <div className="flex flex-col gap-2 p-4 md:p-7 border border-[#00000033] rounded-lg">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-[#00000066] text-xs font-medium mt-2">{propertyInfo.description}</p>
          <hr className="my-2" />

          {/* Property Details */}
          <div className="grid grid-cols-2 gap-y-2 text-[#00000066] text-[10px] font-medium">
            <p><b className="text-xs text-black">Wing:</b> {propertyInfo.wing}</p>
            <p><b className="text-xs text-black">Price:</b> {propertyInfo.sqft_price}</p>
            <p><b className="text-xs text-black">Floor:</b> {propertyInfo.floor}</p>
            <p><b className="text-xs text-black">Flat No:</b> {propertyInfo.flatno}</p>
            <p><b className="text-xs text-black">Direction:</b> {propertyInfo.direction}</p>
            <p><b className="text-xs text-black">Carpet Area:</b> {propertyInfo.carpetarea}</p>
            <p><b className="text-xs text-black">Super Built-up:</b> {propertyInfo.superbuiltup}</p>
            <p><b className="text-xs text-black">Construction Age:</b> {propertyInfo.ageofconstruction} years</p>
          </div>
        </div>

        {/* Video Section */}
        <div className="flex flex-col gap-5 p-4 sm:p-6 border border-[#00000033] rounded-lg">
          <h2 className="text-lg font-semibold">Key Features and Amenities | Watch Live</h2>
          <div className="w-full bg-white rounded-xl overflow-hidden border border-[#00000033]">
            {videoEmbedUrl ? (
              <iframe
                width="100%"
                //height="320"
                src={videoEmbedUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg h-[230px] sm:h-[300px] md:h-[250px] lg:h-[320px]"
              />
            ) : (
              <p>Video Not Found</p>
            )}
          </div>
          <h2 className="text-lg font-semibold">{propertyInfo.property_name}</h2>
        </div>
      </div>

      {/* Inquiry Button */}
      <div 
        onClick={() => setShowInquiryForm(true)}
        className="hidden fixed z-30 w-full sm:w-auto right-0 bottom-0 sm:bottom-15 sm:right-25 md:bottom-25 md:right-35 px-4 py-2 sm:px-10 sm:py-3 bg-[#0BB501] rounded-tl-2xl border-2 border-white sm:border-none rounded-tr-2xl sm:rounded-[32px] text-white text-md sm:text-xl shadow-lg hover:scale-105 active:scale-100 cursor-pointer"
      >
        <p className="text-center font-medium">Inquiry Now</p>
      </div>

      {/* Other Properties Section */}
      <div className={` w-full hidden md:flex flex-col p-5`}>
        <h2 className="text-lg md:text-2xl mx-auto text-black font-bold mb-4">
          Other Properties in this Project and Nearby
        </h2>
        <OtherProperties propertyTypeId={propertyInfo.propertytypeid} key={propertyInfo.propertytypeid}/>
      </div>
    </div>
  );
}