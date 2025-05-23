import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import localPropertyImage from "../../assets/property/propertyPicture.svg"
import reparvLogo from "../../assets/reparvLogo.svg";
import { useAuth } from "../../store/auth";
import Loader from "../Loader";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function SiteVisitPopup() {
  const { URI, setLoading, setShowSiteVisitPopup, propertyImage, setShowSuccess } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  //Inquiry Form Data
  const [formData, setFormData] = useState({
    propertyid: id,
    fullname: "",
    phone: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${URI}/frontend/enquiry/add`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to save property. Status: ${response.status}`);
      } else {
        setShowSuccess(true);
        setShowSiteVisitPopup(false);
      }

      // Clear form after success
      setFormData({
        ...formData,
        propertyid: id,
        fullname: "",
        phone: "",
      });
    } catch (err) {
      console.error("Error Booking Property:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="w-full max-w-[750px] relative flex flex-col md:flex-row bg-white rounded-tl-2xl rounded-tr-2xl md:rounded-2xl overflow-hidden shadow-xl ">
        {/* Left Image Section */}
        <div className="w-full hidden md:flex items-center justify-center md:w-1/2 relative">
          <img
            src={URI+propertyImage?URI+propertyImage:localPropertyImage}
            alt="Modern Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-5 left-20">
            <img
              src={reparvLogo}
              alt="Reparv Logo"
              className="h-10"
            />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full flex flex-col gap-4 justify-center md:w-1/2 p-6 relative">
          {/* Close Button */}
          <div className="w-full flex justify-end">
            <RxCross2
              onClick={() => {
                setShowSiteVisitPopup(false);
              }}
              className="w-5 h-5 text-xl text-right rounded-full bg-[#FAFAFA] text-black cursor-pointer hover:text-[#076300] active:scale-95"
            />
          </div>
          <h2 className="text-base font-semibold">
            Conveniently Book a Property Visit
          </h2>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
              <label htmlFor="fullName" className="ml-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullName"
                placeholder="Enter Full Name"
                value={formData.fullname}
                onChange={(e)=>{
                  setFormData({ ...formData, fullname: e.target.value });
                }}
                className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                required
              />
            </div>
            <div className="flex flex-col gap-3 text-sm font-semibold text-[#00000066] ">
              <label htmlFor="fullName" className="ml-1">
                Enter Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    // Allows only up to 10 digits
                    setFormData({ ...formData, phone: input });
                  }
                }}
                className="w-full font-medium p-4 border border-[#00000033] rounded-md focus:outline-0"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-[#0BB501] text-white py-3 rounded-md hover:bg-green-700 transition"
            >
              Book Site Visit Now
            </button>
            <p className="text-xs text-center mt-4 text-[#00000066]">
              By registering, you’ll get a call from our agent.
            </p>
          </form>
        </div>
      </div>
  );
}
