import { useState, useEffect } from "react";
import { FaRupeeSign, FaVectorSquare } from "react-icons/fa";
import { useAuth } from "../../store/auth";

function TypeWisePricing({ propertyId, propertyCategory, propertyType }) {
  const {URI, setLoading} = useAuth();
  const [isActive, setIsActive] = useState(propertyType?.[0] || "");
  const [propertyData, setPropertyData] = useState({});

  const overviewData = [
    {
      icon: FaVectorSquare,
      label: "Built-Up Area",
      value: propertyData?.builtuparea,
      show: ["NewPlot", "CommercialPlot"].includes(propertyCategory)
        ? "hidden"
        : "flex",
    },
    {
      icon: FaVectorSquare,
      label: "Super Built-Up Area",
      value: propertyData?.superbuiltuparea,
      show: ["NewPlot", "CommercialPlot"].includes(propertyCategory)
        ? "hidden"
        : "flex",
    },
    {
      icon: FaVectorSquare,
      label: "Carpet Area",
      value: propertyData?.carpetarea,
      show: ["NewPlot", "CommercialPlot"].includes(propertyCategory)
        ? "hidden"
        : "flex",
    },
    {
      icon: FaVectorSquare,
      label: "Additional Area",
      value: propertyData?.additionalarea,
      show: ["NewPlot", "CommercialPlot"].includes(propertyCategory)
        ? "hidden"
        : "flex",
    },
    {
      icon: FaVectorSquare,
      label: "Plot Size",
      value: propertyData?.plotsize,
      show: ["NewFlat", "CommercialFlat"].includes(propertyCategory)
        ? "hidden"
        : "flex",
    },
    {
      icon: FaVectorSquare,
      label: "Payable Area",
      value: propertyData?.payablearea,
      show: "flex",
    },
    {
      icon: FaRupeeSign,
      label: "Total Price",
      value: propertyData?.totalcost,
      show: "flex",
    },
  ];

  // Fetch Data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URI}/frontend/properties/additionalinfo/data/get/${propertyId}?type=${
          isActive
        }`,
        {
          method: "GET",
          credentials: "include", // Ensures cookies are sent
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch Property Data.");

      const data = await response.json();
      console.log(data);
      setPropertyData(data);
    } catch (err) {
      console.error("Error fetching Property Data :", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isActive, propertyId]);

  return (
    <div className="fex flex-col gap-6 bg-white rounded-lg p-4 md:p-6">
      <h2 className="text-black text-lg mb-3 font-semibold mx-1">
        {propertyCategory}
      </h2>
      <div className="w-full flex flex-wrap gap-3 md:gap-4">
        {propertyType?.length > 0 &&
          propertyType?.map((item, index) => (
            <div
              key={index}
              onClick={async () => {
                setIsActive(item);
                await fetchData();
              }}
              className={`${
                isActive === item
                  ? "border-green-500 bg-[#0BB501] text-white"
                  : "border-gray-300"
              } active:scale-95 cursor-pointer
               flex items-center justify-center px-2 py-1 text-sm font-semibold
               border-[1.5px] rounded-lg `}
            >
              {item}
            </div>
          ))}
      </div>
      {isActive && (
        <div className="w-full px-1 mt-5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-4 text-sm">
          {overviewData.map(({ icon: Icon, label, value, show }, index) => (
            <div key={index} className={`${show} items-start space-x-3`}>
              {Icon && <Icon className="text-lg text-black mt-1" />}
              <div>
                <div className="text-[#00000066] text-xs">{label}</div>
                <div className="font-normal text-black whitespace-pre-line">
                  {value || "—"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TypeWisePricing;
