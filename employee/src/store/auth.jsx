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
const [showEplDetailsForm, setShowEplDetailsForm ] = useState(false);
const [showBuilderForm, setShowBuilderForm ] = useState(false);
const [showSalesForm, setShowSalesForm ] = useState(false);
const [showAuctionForm, setShowAuctionForm ] = useState(false);
const [showPropertyForm, setShowPropertyForm ] = useState(false);
const [showPropertyTypeForm, setShowPropertyTypeForm ] = useState(false);
const [showRoleForm, setShowRoleForm ] = useState(false);
const [showDepartmentForm, setShowDepartmentForm ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
const [showTicketInfo, setShowTicketInfo ] = useState(false);
const [action, setAction ] = useState("Save Details");
const [isActive, setIsActive] = useState("Builders");
const [giveAccess, setGiveAccess] = useState(false);
const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
return <AuthContext.Provider
 value={
    {   URI,
        isLoggedIn, storeTokenInCookie, delTokenInCookie,
        accessToken, setAccessToken,
        showEplDetailsForm,setShowEplDetailsForm,
        action,setAction,
        showProfile,setShowProfile,
        showBuilderForm, setShowBuilderForm ,
        showSalesForm, setShowSalesForm,
        showAuctionForm, setShowAuctionForm,
        showTicketInfo, setShowTicketInfo,
        isActive, setIsActive,
        showPropertyForm, setShowPropertyForm,
        showPropertyTypeForm, setShowPropertyTypeForm,
        showRoleForm, setShowRoleForm,
        showDepartmentForm, setShowDepartmentForm,
        giveAccess, setGiveAccess,
        user, setUser,
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}