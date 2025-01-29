import { createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

//const [loader, setLoader] = useState(false);
//const [accessToken,setAccessToken] = useState(Cookies.get("token"));
const [showEplDetailsForm, setShowEplDetailsForm ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
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
        showEplDetailsForm,
        setShowEplDetailsForm,
        action,
        setAction,
        showProfile,
        setShowProfile
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}