import { createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

const [showEplDetailsForm, setShowEplDetailsForm ] = useState(false);
const [showBuilderForm, setShowBuilderForm ] = useState(false);
const [showSalesForm, setShowSalesForm ] = useState(false);
const [showAuctionForm, setShowAuctionForm ] = useState(false);
const [showPropertyForm, setShowPropertyForm ] = useState(false);
const [showRoleForm, setShowRoleForm ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
const [showTicketInfo, setShowTicketInfo ] = useState(false);
const [action, setAction ] = useState("Save Details");
const [isActive, setIsActive] = useState("Builders");

return <AuthContext.Provider
 value={
    {  
        showEplDetailsForm,setShowEplDetailsForm,
        action,setAction,
        showProfile,setShowProfile,
        showBuilderForm, setShowBuilderForm ,
        showSalesForm, setShowSalesForm,
        showAuctionForm, setShowAuctionForm,
        showTicketInfo, setShowTicketInfo,
        isActive, setIsActive,
        showPropertyForm, setShowPropertyForm,
        showRoleForm, setShowRoleForm 
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}