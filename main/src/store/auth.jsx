import { createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

const [isActive, setIsActive] = useState(false);
const [showInquiryForm, setShowInquiryForm] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
return <AuthContext.Provider
 value={
    {  
        isActive, setIsActive,
        showInquiryForm, setShowInquiryForm,
        showSuccess, setShowSuccess
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}