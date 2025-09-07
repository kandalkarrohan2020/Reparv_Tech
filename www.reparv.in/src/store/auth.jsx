import { createContext, useContext, useState } from "react";
import { MdDescription } from "react-icons/md";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [propertyId, setPropertyId] = useState(null);
  const [propertyInfoId, setPropertyInfoId] = useState(null);
  const [propertyCategory, setPropertyCategory] = useState("");
  const [successScreen, setSuccessScreen] = useState({
    show: false,
    label: "Thank You For Registering!",
    description: "Our Representative will call you shortly",
  });
  const [priceSummery, setPriceSummery] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
  const [propertyImage, setPropertyImage] = useState("");
  const [propertyType, setPropertyType] = useState("properties");
  const [bhkType, setBhkType] = useState("2 BHK");
  const [propertySearch, setPropertySearch] = useState("");
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showPriceSummery, setShowPriceSummery] = useState(false);
  const [showBenefitsPopup, setShowBenefitsPopup] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showSiteVisitPopup, setShowSiteVisitPopup] = useState(false);
  const [showPlayVideo, setShowPlayVideo] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [showWingInfoPopup, setShowWingInfoPopup] = useState(false);

  const URI = "https://api.reparv.in";
  //const URI = "http://localhost:3000";

  return (
    <AuthContext.Provider
      value={{
        isActive,
        setIsActive,
        propertyId,
        setPropertyId,
        propertyInfoId, 
        setPropertyInfoId,
        propertyCategory,
        setPropertyCategory,
        successScreen,
        setSuccessScreen,
        priceSummery,
        setPriceSummery,
        propertyImage,
        setPropertyImage,
        propertyType,
        setPropertyType,
        bhkType, setBhkType,
        propertySearch,
        setPropertySearch,
        selectedCity,
        setSelectedCity,
        showInquiryForm,
        setShowInquiryForm,
        showFilterPopup,
        setShowFilterPopup,
        showPriceSummery,
        setShowPriceSummery,
        showBenefitsPopup,
        setShowBenefitsPopup,
        showSiteVisitPopup,
        setShowSiteVisitPopup,
        showPlayVideo,
        setShowPlayVideo,
        videoURL,
        setVideoURL,
        showWingInfoPopup,
        setShowWingInfoPopup,
      
        URI,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
