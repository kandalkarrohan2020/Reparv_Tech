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
  const [showProfile, setShowProfile] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [action, setAction] = useState("Save Details");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [dashboardFilter, setDashboardFilter] = useState("Booked");
  const [showCustomer, setShowCustomer] = useState(false);
  const [showCustomerPaymentForm, setShowCustomerPaymentForm] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        URI,
        loading,
        setLoading,
        isLoggedIn,
        storeTokenInCookie,
        delTokenInCookie,
        dashboardFilter,
        setDashboardFilter,
        accessToken,
        setAccessToken,
        showProfile,
        setShowProfile,
        isActive,
        setIsActive,
        action,
        setAction,
        user,
        setUser,
        showCustomer,
        setShowCustomer,
        showCustomerPaymentForm,
        setShowCustomerPaymentForm,
        showTicket,
        setShowTicket,
        showTicketInfo,
        setShowTicketInfo,
        showTicketForm,
        setShowTicketForm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
