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
const [showEplDetailsForm, setShowEplDetailsForm ] = useState(false);
const [showBuilderForm, setShowBuilderForm ] = useState(false);
const [showBuilder, setShowBuilder ] = useState(false);
const [showSalesForm, setShowSalesForm ] = useState(false);
const [showSalesPerson, setShowSalesPerson ] = useState(false);
const [showAuctionForm, setShowAuctionForm ] = useState(false);
const [showPropertyForm, setShowPropertyForm ] = useState(false);
const [showPropertyTypeForm, setShowPropertyTypeForm ] = useState(false);
const [showRoleForm, setShowRoleForm ] = useState(false);
const [showDepartmentForm, setShowDepartmentForm ] = useState(false);
const [showProfile, setShowProfile ] = useState(false);
const [showTicketInfo, setShowTicketInfo ] = useState(true);
const [showTicketForm, setShowTicketForm ] = useState(false);
const [showResponseForm, setShowResponseForm ] = useState(false);
const [showTicket, setShowTicket ] = useState(false);
const [action, setAction ] = useState("Save Details");
const [isActive, setIsActive] = useState("Builders");
const [showPaymentIdForm, setShowPaymentIdForm ] = useState(false);
const [giveAccess, setGiveAccess] = useState(false);
const [showUploadImagesForm, setShowUploadImagesForm] = useState(false);
const [showAdditionalInfoForm, setShowAdditionalInfoForm] = useState(false);
const [showAssignSalesForm, setShowAssignSalesForm] = useState(false);
const [showEnquiryStatusForm, setShowEnquiryStatusForm] = useState(false);
const [showEnquiryForm, setShowEnquiryForm] = useState(false);
const [showEnquiryUpdateForm, setShowEnquiryUpdateForm] = useState(false);
const [showEnquiry, setShowEnquiry] = useState(false);
const [showPropertyInfo, setShowPropertyInfo] = useState(false);
const [showEnquirerPropertyForm, setShowEnquirerPropertyForm] = useState(false);
const [showSliderForm, setShowSliderForm] = useState(false);
const [showFeedbackForm, setShowFeedbackForm] = useState(false);
const [showPartnerForm, setShowPartnerForm ] = useState(false);
const [showRejectReasonForm, setShowRejectReasonForm ] = useState(false);
const [showPartner, setShowPartner ] = useState(false);
const [showAddMobileImage, setShowAddMobileImage ] = useState(false);


return <AuthContext.Provider
 value={
    {   URI, loading, setLoading,
        isLoggedIn, storeTokenInCookie, delTokenInCookie,
        accessToken, setAccessToken,
        showEplDetailsForm,setShowEplDetailsForm,
        action,setAction,
        showProfile,setShowProfile,
        showBuilderForm, setShowBuilderForm ,
        showBuilder, setShowBuilder,
        showSalesForm, setShowSalesForm,
        showSalesPerson, setShowSalesPerson ,
        showAuctionForm, setShowAuctionForm,
        showTicketInfo, setShowTicketInfo,
        showTicketForm, setShowTicketForm,
        showTicket, setShowTicket,
        showResponseForm, setShowResponseForm,
        isActive, setIsActive,
        showPropertyForm, setShowPropertyForm,
        showPropertyTypeForm, setShowPropertyTypeForm,
        showRoleForm, setShowRoleForm,
        showDepartmentForm, setShowDepartmentForm,
        showPaymentIdForm, setShowPaymentIdForm ,
        giveAccess, setGiveAccess,
        showUploadImagesForm, setShowUploadImagesForm,
        showAdditionalInfoForm, setShowAdditionalInfoForm,
        showAssignSalesForm, setShowAssignSalesForm,
        showEnquiryStatusForm, setShowEnquiryStatusForm,
        showEnquiryForm, setShowEnquiryForm,
        showEnquiryUpdateForm, setShowEnquiryUpdateForm,
        showEnquiry, setShowEnquiry,
        showPropertyInfo, setShowPropertyInfo,
        showEnquirerPropertyForm, setShowEnquirerPropertyForm,
        showSliderForm, setShowSliderForm,
        showFeedbackForm, setShowFeedbackForm,
        showPartnerForm, setShowPartnerForm,
        showRejectReasonForm, setShowRejectReasonForm,
        showPartner, setShowPartner,
        showAddMobileImage, setShowAddMobileImage,
    }
}>
    {children}
   </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}