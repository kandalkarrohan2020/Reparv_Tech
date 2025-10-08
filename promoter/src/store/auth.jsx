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

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("promoterUser")));
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("Save Details");
  const [isActive, setIsActive] = useState("Builders");
  const [giveAccess, setGiveAccess] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [enquiryFilter, setEnquiryFilter] = useState("New");
  const [showCustomer, setShowCustomer] = useState(false);
  const [showCustomerPaymentForm, setShowCustomerPaymentForm] = useState(false);
  const [showTicketInfo, setShowTicketInfo] = useState(true);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [partnerPaymentStatus, setPartnerPaymentStatus] = useState("Pending");
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showSalesPerson, setShowSalesPerson] = useState(false);
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  const [showPartner, setShowPartner] = useState(false);
  const [showPaymentIdForm, setShowPaymentIdForm] = useState(false);
  const [showFollowUpList, setShowFollowUpList] = useState(false);
  const [showEMI, setShowEMI] = useState(false);
  const [filterStatus, setFilterStatus] = useState("New");
  const [showProductForm, setShowProductForm] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        URI,
        user,
        setUser,
        loading,
        setLoading,
        isLoggedIn,
        isActive,
        setIsActive,
        giveAccess,
        setGiveAccess,
        storeTokenInCookie,
        delTokenInCookie,
        accessToken,
        setAccessToken,
        action,
        setAction,
        showProfile,
        setShowProfile,
        showEnquiryForm,
        setShowEnquiryForm,
        showEnquiry,
        setShowEnquiry,
        enquiryFilter, setEnquiryFilter,
        showCustomer,
        setShowCustomer,
        showCustomerPaymentForm,
        setShowCustomerPaymentForm,
        setShowTicketInfo,
        showTicketForm,
        setShowTicketForm,
        showTicket,
        setShowTicket,
        showResponseForm,
        setShowResponseForm,
        partnerPaymentStatus,
        setPartnerPaymentStatus,
        showSalesForm,
        setShowSalesForm,
        showSalesPerson,
        setShowSalesPerson,
        showPartnerForm,
        setShowPartnerForm,
        showPartner,
        setShowPartner,
        showPaymentIdForm,
        setShowPaymentIdForm,
        showFollowUpList,
        setShowFollowUpList,
        showEMI,
        setShowEMI,
        showTicketInfo,
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
