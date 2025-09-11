import { createContext, useContext, useState } from "react";

export const PropertyFilterContext = createContext();

export const PropertyFilterProvider = ({ children }) => {
  
  const [selectedType, setSelectedType] = useState("");
  const [selectedBHKType, setSelectedBHKType] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [minBudget, setMinBudget] = useState(5000);
  const [maxBudget, setMaxBudget] = useState(50000000);

  return (
    <PropertyFilterContext.Provider
      value={{
        selectedType, setSelectedType,
        selectedBHKType, setSelectedBHKType,
        filteredLocations, setFilteredLocations,
        minBudget, setMinBudget,
        maxBudget, setMaxBudget
      }}
    >
      {children}
    </PropertyFilterContext.Provider>
  );
};

export const usePropertyFilter = () => {
  return useContext(PropertyFilterContext);
};
