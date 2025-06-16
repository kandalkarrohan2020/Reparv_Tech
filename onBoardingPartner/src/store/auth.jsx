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
const [showPropertyForm, setShowPropertyForm ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
const [showTicketInfo, setShowTicketInfo ] = useState(false);
const [showTicketForm, setShowTicketForm ] = useState(false);
const [isActive, setIsActive ] = useState(false);
const [action, setAction ] = useState("Save Details");
const [showUploadImagesForm, setShowUploadImagesForm] = useState(false);
const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
const [showTicket, setShowTicket] = useState(false);
const [showPropertyInfo, setShowPropertyInfo] = useState(false);
return <AuthContext.Provider
 value={
    {   URI, loading, setLoading,
        isLoggedIn, storeTokenInCookie, delTokenInCookie,
        accessToken, setAccessToken,
        showProfile,setShowProfile,
        showTicketInfo, setShowTicketInfo,
        showTicketForm, setShowTicketForm,
        isActive, setIsActive,
        action, setAction,
        showPropertyForm, setShowPropertyForm,
        user, setUser,
        showUploadImagesForm, setShowUploadImagesForm,
        showAdditionalInfoForm, setShowAdditionalInfoForm,
        showTicket, setShowTicket,
        showPropertyInfo, setShowPropertyInfo,
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}