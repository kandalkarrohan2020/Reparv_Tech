import { createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

const [loading, setLoading] = useState(false);
const [isActive, setIsActive] = useState(false);
const [showInquiryForm, setShowInquiryForm] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
//const URI = "https://api.reparv.in";
const URI="http://localhost:3000";

return <AuthContext.Provider
 value={
    {  
        isActive, setIsActive,
        showInquiryForm, setShowInquiryForm,
        showSuccess, setShowSuccess,
        URI, loading, setLoading,
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}