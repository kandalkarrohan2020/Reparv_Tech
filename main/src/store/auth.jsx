import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

const [loading, setLoading] = useState(false);
const [isActive, setIsActive] = useState(false);
const [priceSummery, setPriceSummery] = useState({});
const [selectedCity, setSelectedCity] = useState("Nagpur");
const [propertyImage, setPropertyImage] = useState("");
const [propertyType, setPropertyType] = useState("properties");
const [propertySearch, setPropertySearch] = useState("");
const [showInquiryForm, setShowInquiryForm] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
const [showPriceSummery, setShowPriceSummery] = useState(false);
const [showBenefitsPopup, setShowBenefitsPopup] = useState(false);
const [showFilterPopup, setShowFilterPopup] = useState(false);
const [showSiteVisitPopup, setShowSiteVisitPopup] = useState(false);

const URI = "https://api.reparv.in";
//const URI="http://localhost:3000"; 

return <AuthContext.Provider
 value={
    {  
        isActive, setIsActive,
        priceSummery, setPriceSummery,
        propertyImage, setPropertyImage,
        propertyType, setPropertyType,
        propertySearch, setPropertySearch,
        selectedCity, setSelectedCity,
        showInquiryForm, setShowInquiryForm,
        showSuccess, setShowSuccess,
        showFilterPopup, setShowFilterPopup,
        showPriceSummery, setShowPriceSummery,
        showBenefitsPopup, setShowBenefitsPopup,
        showSiteVisitPopup, setShowSiteVisitPopup,
        URI, loading, setLoading,

    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}