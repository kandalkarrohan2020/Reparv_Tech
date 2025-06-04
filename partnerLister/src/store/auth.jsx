import { createContext, useContext, useState} from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

let isLoggedIn = !!accessToken;

const storeTokenInCookie = (token) => {
    Cookies.set("accessToken", token);
    setAccessToken(Cookies.get("accessToken"));
}
const delTokenInCookie = () => {
    setAccessToken();
    Cookies.remove("accessToken");
}
//const URI = "http://localhost:3000";
const URI = "https://api.reparv.in";

const [loading, setLoading] = useState(false);
const [showSalesForm, setShowSalesForm ] = useState(false);
const [showSalesPerson, setShowSalesPerson ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
const [showPaymentIdForm, setShowPaymentIdForm ] = useState(false);
const [action, setAction ] = useState("Save Details");
const [isActive, setIsActive] = useState("Builders");
const [giveAccess, setGiveAccess] = useState(false);
const [showAssignSalesForm, setShowAssignSalesForm] = useState(false);
const [showPartnerForm, setShowPartnerForm ] = useState(false);
const [showPartner, setShowPartner ] = useState(false);

return <AuthContext.Provider
 value={
    {   URI, loading, setLoading,
        isLoggedIn, storeTokenInCookie, delTokenInCookie,
        accessToken, setAccessToken,
        action,setAction,
        showProfile,setShowProfile,
        showSalesForm, setShowSalesForm,
        showSalesPerson, setShowSalesPerson ,
        isActive, setIsActive,
        giveAccess, setGiveAccess,
        showPaymentIdForm, setShowPaymentIdForm,
        showAssignSalesForm, setShowAssignSalesForm,
        showPartnerForm, setShowPartnerForm ,
        showPartner, setShowPartner,
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}