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
  const [showUpdateImagesForm, setShowUpdateImagesForm] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showPropertyInfo, setShowPropertyInfo] = useState(false);
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
        user,
        setUser,
        showUpdateImagesForm,
        setShowUpdateImagesForm,
        showAdditionalInfoForm,
        setShowAdditionalInfoForm,
        showTicket,
        setShowTicket,
        showPropertyInfo,
        setShowPropertyInfo,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
