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
const [action, setAction ] = useState("Save Details");
const [showBuilderForm, setShowBuilderForm ] = useState(false);
const [showPropertyForm, setShowPropertyForm ] = useState(false);
const [showPropertyInfo, setShowPropertyInfo ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
const [showTicketInfo, setShowTicketInfo ] = useState(false);
const [showTicketForm, setShowTicketForm ] = useState(false);
const [showTicket, setShowTicket ] = useState(false);
const [showResponseForm, setShowResponseForm ] = useState(false);
const [showUploadImagesForm, setShowUploadImagesForm] = useState(false);
const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
return <AuthContext.Provider
 value={
    {   URI,
        isLoggedIn, storeTokenInCookie, delTokenInCookie,
        accessToken, setAccessToken,
        action, setAction,
        showProfile,setShowProfile,
        showBuilderForm, setShowBuilderForm ,
        showTicketInfo, setShowTicketInfo,
        showTicketForm, setShowTicketForm,
        showTicket, setShowTicket,
        showResponseForm, setShowResponseForm,
        showPropertyForm, setShowPropertyForm,
        showPropertyInfo, setShowPropertyInfo,
        user, setUser,
        loading, setLoading,
        showUploadImagesForm, setShowUploadImagesForm,
        showAdditionalInfoForm, setShowAdditionalInfoForm,
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}