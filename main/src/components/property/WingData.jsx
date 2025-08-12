import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";

function WingData({ propertyInfo }) {
  const { URI, setLoading, setPropertyInfoId, setShowWingInfoPopup } =
    useAuth();
  const [wings, setWings] = useState();

  //Fetch Data
  const fetchWings = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URI}/frontend/properties/additionalinfo/get/${propertyInfo?.propertyid}`,
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
      console.log(data);
      setWings(data);
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
    <div className="overflow-scroll scrollbar-hide bg-white rounded-lg p-4 md:border-2 border-[#0bb500] max-h-[200px]">
      <div className="w-full flex gap-4 flex-col items-center justify-center">
        {wings?.map((item, index) => (
          <div key={index} className="w-full flex flex-col gap-2">
            <h2 className="text-black text-sm font-semibold mx-1">
              WING {item.wing}
            </h2>
            <div className="w-full grid md:p-0 gap-2 grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-8">
              {item.rows?.map((row, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (row.status === "Available") {
                      setPropertyInfoId(row.propertyinfoid);
                      setShowWingInfoPopup(true);
                    }
                  }}
                  className={`${
                    row.status === "Available" &&
                    "text-green-700 bg-[#eeffec] hover:bg-[#ddffd7] border-green-600 cursor-pointer" 
                  }  ${
                    row.status === "Booked" &&
                    "bg-red-50 text-red-500 border-red-500"
                  } flex items-center justify-center px-2 py-1 text-sm font-semibold text-gray-400 border-gray-300 border-[1.5px] rounded-lg `}
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
