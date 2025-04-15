import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import HomePropertyGrid from "../components/property/HomePropertyGrid";

const Properties = () => {
  const {
    setShowPropertyForm,
    URI,
  } = useAuth();
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  //Fetch Data
  const fetchData = async () => {
    try {
      const response = await fetch(URI + "/admin/properties", {
        method: "GET",
        credentials: "include", // ✅ Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch properties.");
      const data = await response.json();
      setDatas(data);
    } catch (err) {
      console.error("Error fetching :", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  return (
    <div className="properties overflow-scroll scrollbar-hide w-full h-screen flex flex-col items-start justify-start">
      <div className="properties-table overflow-scroll scrollbar-hide w-full h-[500px] flex flex-col p-6 gap-4 my-[10px] bg-white rounded-[24px]">
      <p className="block md:hidden text-lg font-semibold">Properties</p>
        <HomePropertyGrid />
      </div>

    </div>
  );
};

export default Properties;
