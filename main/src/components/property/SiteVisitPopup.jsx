import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../store/auth";

export default function SiteVisitPopup() {
    const { setShowSiteVisitPopup } = useAuth();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-[750px] relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-xl ">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2 relative">
          <img
            src="/your-image-path.jpg" // Replace with actual image path or import
            alt="Modern Property"
            className="h-full w-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <img
              src="/logo.png" // Replace with your actual logo path
              alt="Reparv Logo"
              className="h-6"
            />
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full flex flex-col gap-4 items-center justify-center md:w-1/2 p-6 relative">
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
          
          <form className="space-y-4">
            <div className="w-full flex flex-col gap-2 ">
              <label className="block text-xs font-normal text-[#00000066]">
                Full Name*
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="w-full border border-[#00000033] rounded-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0BB501] "
              />
            </div>
            <div className="w-full flex flex-col gap-2 ">
              <label className="block text-xs font-normal text-[#00000066]">
                Contact Number*
              </label>
              <input
                type="text"
                placeholder="Enter Contact Number"
                className="w-full border border-[#00000033] rounded-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#0BB501] "
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-[#0BB501] text-white py-3 rounded-md hover:bg-green-700 transition"
            >
              Book Site Visit Now
            </button>
            <p className="text-xs mt-4 text-[#00000066]">
              By registering, you’ll get a call from our agent.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
