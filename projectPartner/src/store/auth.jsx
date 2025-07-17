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

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showBuilderForm, setShowBuilderForm] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showUploadImagesForm, setShowUploadImagesForm] = useState(false);
  const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
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
        showUploadImagesForm,
        setShowUploadImagesForm,
        showAdditionalInfoForm,
        setShowAdditionalInfoForm,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
