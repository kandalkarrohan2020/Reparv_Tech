import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";

function PlotData({ propertyInfo }) {
  const { URI, setLoading, setPropertyInfoId, setShowPlotInfoPopup } =
    useAuth();
  const [plots, setPlots] = useState([]);
  const [activeKhasra, setActiveKhasra] = useState(null);

  // Fetch Data
  const fetchPlots = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URI}/frontend/properties/additionalinfo/plot/get/all/${propertyInfo?.propertyid}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch Plot Data");
      const data = await response.json();

      setPlots(data);

      // Auto Select First Khasra
      if (data.length > 0) {
        setActiveKhasra(data[0].khasrano);
      }
    } catch (err) {
      console.error("Error fetching Plot Data :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, [propertyInfo]);

  return (
    <div
      className={`${
        plots.length > 0 ? "block" : "hidden"
      } bg-white rounded-lg p-4 border border-[#0bb500]`}
    >
      {/* Khasra Tabs */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {plots.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveKhasra(item.khasrano)}
            className={`
              px-3 py-1 text-sm font-semibold rounded-lg border transition-all

              ${
                activeKhasra === item.khasrano
                  ? "bg-[#0bb500] text-white border-green-600 shadow-md scale-95"
                  : "bg-white border-gray-300 text-gray-700"
              }
            `}
          >
            KHASRA {item.khasrano}
          </button>
        ))}
      </div>

      {/* Plots of Selected Khasra */}
      <div className="mt-2 overflow-scroll scrollbar-hide max-h-[300px]">
        {plots
          .filter((p) => p.khasrano === activeKhasra)
          .map((khasraItem, index) => (
            <div key={index}>
              <div className="grid gap-2 grid-cols-4 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-6">
                {khasraItem.rows.map((row, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (row.status === "Available") {
                        setPropertyInfoId(row.propertyinfoid);
                        setShowPlotInfoPopup(true);
                      }
                    }}
                    className={`
                      flex items-center justify-center px-2 py-1 text-[12px] lg:text-sm font-semibold rounded-lg border transition-all text-gray-400 border-gray-300

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
                    {"Plot " + row.plotno}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlotData;
