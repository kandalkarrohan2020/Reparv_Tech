import { createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

//const [loader, setLoader] = useState(false);
//const [accessToken,setAccessToken] = useState(Cookies.get("token"));
const [showEplDetailsForm, setShowEplDetailsForm ] = useState(false);
const [showBuilderForm, setShowBuilderForm ] = useState(false);
const [showSalesForm, setShowSalesForm ] = useState(false);
const [showAuctionForm, setShowAuctionForm ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
const [showTicketInfo, setShowTicketInfo ] = useState(false);
const [action, setAction ] = useState("Save Details");
//let isLoggedIn = !!accessToken;
/*
const storeTokenInCookie = (token) => {
    Cookies.set("token", token);
    setAccessToken(Cookies.get("token"));
}
const delTokenInCookie = () => {
    setAccessToken();
    Cookies.remove("token");
}
*/

return <AuthContext.Provider
 value={
    {  
        showEplDetailsForm,setShowEplDetailsForm,
        action,setAction,
        showProfile,setShowProfile,
        showBuilderForm, setShowBuilderForm ,
        showSalesForm, setShowSalesForm,
        showAuctionForm, setShowAuctionForm,
        showTicketInfo, setShowTicketInfo
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}