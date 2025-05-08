import { createContext, useContext, useState } from "react";

export const PropertyFilterContext = createContext();

export const PropertyFilterProvider = ({ children }) => {
  
  const [selectedType, setSelectedType] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(500000);

  return (
    <PropertyFilterContext.Provider
      value={{
        selectedType, setSelectedType,
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
