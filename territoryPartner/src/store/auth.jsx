import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  let isLoggedIn = !!accessToken;

  const storeTokenInCookie = (token) => {
    Cookies.set("accessToken", token);
    setAccessToken(Cookies.get("accessToken"));
  };
  const delTokenInCookie = () => {
    setAccessToken();
    Cookies.remove("accessToken");
  };

  //const URI = "http://localhost:3000";
  const URI = "https://api.reparv.in";

  const [loading, setLoading] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [action, setAction] = useState("Save Details");
  const [showUploadImagesForm, setShowUploadImagesForm] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
  const [showEnquiryStatusForm, setShowEnquiryStatusForm] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const [showEnquirerPropertyForm, setShowEnquirerPropertyForm] =
    useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [propertyCategory, setPropertyCategory] = useState(null);
  const [priceSummery, setPriceSummery] = useState({});
  const [selectedCity, setSelectedCity] = useState(user?.city);
  const [propertyImage, setPropertyImage] = useState("");
  const [propertyType, setPropertyType] = useState("properties");
  const [propertySearch, setPropertySearch] = useState("");
  const [showPriceSummery, setShowPriceSummery] = useState(false);
  const [showBenefitsPopup, setShowBenefitsPopup] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showSiteVisitPopup, setShowSiteVisitPopup] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showCustomerPaymentForm, setShowCustomerPaymentForm] = useState(false);
  const [showPlayVideo, setShowPlayVideo] = useState(false);
  const [videoURL, setVideoURL] = useState("");

  return (
    <AuthContext.Provider
      value={{
        URI,
        loading,
        setLoading,
        isLoggedIn,
        storeTokenInCookie,
        delTokenInCookie,
        accessToken,
        setAccessToken,
        showProfile,
        setShowProfile,
        showTicketInfo,
        setShowTicketInfo,
        showTicketForm,
        setShowTicketForm,
        isActive,
        setIsActive,
        action,
        setAction,
        showPropertyForm,
        setShowPropertyForm,
        showEnquiryStatusForm,
        setShowEnquiryStatusForm,
        showInquiryForm,
        setShowInquiryForm,
        showEnquiry,
        setShowEnquiry,
        showEnquiryForm,
        setShowEnquiryForm,
        user,
        setUser,
        showUploadImagesForm,
        setShowUploadImagesForm,
        showAdditionalInfoForm,
        setShowAdditionalInfoForm,
        showTicket,
        setShowTicket,
        showPropertyInfo,
        setShowPropertyInfo,
        showEnquirerPropertyForm,
        setShowEnquirerPropertyForm,
        showCustomer,
        setShowCustomer,
        showCustomerPaymentForm,
        setShowCustomerPaymentForm,
        filterStatus,
        setFilterStatus,
        showCart,
        setShowCart,
        showOrder,
        setShowOrder,
        showProductForm,
        setShowProductForm,
        showOrderForm,
        setShowOrderForm,

        priceSummery,
        setPriceSummery,
        propertyCategory,
        setPropertyCategory,
        propertyImage,
        setPropertyImage,
        propertyType,
        setPropertyType,
        propertySearch,
        setPropertySearch,
        selectedCity,
        setSelectedCity,
        showSuccess,
        setShowSuccess,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
