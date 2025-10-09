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
  const URI = "http://localhost:3000";
  //const URI = "https://api.reparv.in";

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("projectPartnerUser")));
  const [loading, setLoading] = useState(false);
  const [dashboardFilter, setDashboardFilter] = useState("Booked");
  const [showProfile, setShowProfile] = useState(false);
  const [showBuilderForm, setShowBuilderForm] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showUpdateImagesForm, setShowUpdateImagesForm] = useState(false);
  const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
  const [showNewPlotAdditionalInfoForm, setShowNewPlotAdditionalInfoForm] =
    useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
  const [showTicketInfo, setShowTicketInfo] = useState(true);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showCustomerPaymentForm, setShowCustomerPaymentForm] = useState(false);
  const [action, setAction] = useState("Save Details");
  const [isActive, setIsActive] = useState("Builders");
  const [giveAccess, setGiveAccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState("New");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showVideoUploadForm, setShowVideoUploadForm] = useState(false);
  const [showPropertyLocationForm, setShowPropertyLocationForm] =
    useState(false);

  return (
    <AuthContext.Provider
      value={{
        URI,
        user,
        setUser,
        loading,
        setLoading,
        isLoggedIn,
        storeTokenInCookie,
        delTokenInCookie,
        accessToken,
        setAccessToken,
        action,
        setAction,
        showProfile,
        setShowProfile,
        showBuilder,
        setShowBuilder,
        showBuilderForm,
        setShowBuilderForm,
        showPropertyForm,
        setShowPropertyForm,
        showUpdateImagesForm,
        setShowUpdateImagesForm,
        showAdditionalInfoForm,
        setShowAdditionalInfoForm,
        showNewPlotAdditionalInfoForm,
        setShowNewPlotAdditionalInfoForm,
        showPropertyInfo,
        setShowPropertyInfo,
        showTicketInfo,
        setShowTicketInfo,
        showTicketForm,
        setShowTicketForm,
        showTicket,
        setShowTicket,
        showCustomer,
        setShowCustomer,
        showCustomerPaymentForm,
        setShowCustomerPaymentForm,
        showResponseForm,
        setShowResponseForm,
        isActive,
        setIsActive,
        giveAccess,
        setGiveAccess,
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
        showVideoUploadForm,
        setShowVideoUploadForm,
        showPropertyLocationForm,
        setShowPropertyLocationForm,
        dashboardFilter, setDashboardFilter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
