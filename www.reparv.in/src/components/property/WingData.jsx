import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";

function WingData({ propertyInfo }) {
  const { URI, setLoading, setPropertyInfoId, setShowWingInfoPopup } =
    useAuth();
  const [wings, setWings] = useState();
  const [activeWing, setActiveWing] = useState(null);

  //Fetch Data
  const fetchWings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URI}/frontend/properties/additionalinfo/flat/get/all/${propertyInfo?.propertyid}`,
        {
          method: "GET",
          credentials: "include", //  Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch Property Wings Data.");
      const data = await response.json();
      //console.log(data);
      setWings(data);
      // Auto Select First Khasra
      if (data.length > 0) {
        setActiveWing(data[0].wing);
      }
    } catch (err) {
      console.error("Error fetching Property Wings Data :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWings();
  }, [propertyInfo]);

  return (
    <div
      className={`${
        wings?.length > 0 ? "block" : "hidden"
      } bg-white rounded-lg p-4 border border-[#0bb500]`}
    >
      {/* Wing Tabs */}
      <div className="flex gap-3 overflow-x-scroll scrollbar-hide pb-2">
        {wings?.map((item, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setActiveWing(item.wing)}
            className={`
          ${
            activeWing === item.wing
              ? "border-green-500 bg-[#0bb500] text-white shadow"
              : "border-gray-300 border-[1.5px] rounded-lg"
          } active:scale-95 cursor-pointer
             flex items-center justify-center px-2 py-1 text-sm font-semibold
             border-[1.5px] rounded-lg`}
          >
            WING {item.wing}
          </button>
        ))}
      </div>

      {/* Show Flats of Selected Wing */}
      <div className="mt-2 overflow-scroll scrollbar-hide max-h-[300px]">
        {wings
          ?.filter((w) => w.wing === activeWing)
          ?.map((wingItem, index) => (
            <div key={index}>
              <div className="grid gap-2 grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-8">
                {wingItem.rows?.map((row, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (row.status === "Available") {
                        setPropertyInfoId(row.propertyinfoid);
                        setShowWingInfoPopup(true);
                      }
                    }}
                    className={`
                  flex items-center justify-center px-2 py-1 text-sm font-semibold rounded-lg border text-gray-400 border-gray-300

                  ${
                    row.status === "Available" &&
                    "text-green-700 bg-[#eeffec] hover:bg-[#ddffd7] border-green-600 cursor-pointer"
                  }

                  ${
                    row.status === "Booked" &&
                    "bg-red-50 text-red-500 border-red-500 cursor-not-allowed"
                  }
                `}
                  >
                    {row.flatno}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default WingData;
