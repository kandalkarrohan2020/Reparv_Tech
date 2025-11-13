import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Customers from "./pages/Customers.jsx";
import CalendarScheduler from "./pages/Calender.jsx";
import Properties from "./pages/Properties.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Property from "./propertyPages/Properties.jsx";
import PropertyDetails from "./propertyPages/PropertyDetails.jsx";
import KYC from "./pages/KYC.jsx";
import DownloadApk from "./pages/DownloadApk.jsx";
import CheckEligibility from "./pages/CheckEligibility.jsx";
import MarketingContent from "./pages/MarketingContent.jsx";
//import BrandAccessories from "./pages/BrandAccessories.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Subscription from "./pages/Subscription.jsx";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/kyc/:userid" element={<KYC />} />

        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/calender" element={<CalendarScheduler />} />
          {/*<Route path="/brand-accessories" element={<BrandAccessories />} />*/}
          <Route path="/marketing-content" element={<MarketingContent />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/download-apk" element={<DownloadApk />} />

          <Route path="/property" element={<Property />} />
          <Route path="/property-info/:id" element={<PropertyDetails />} />
          <Route path="/check-eligibility" element={<CheckEligibility />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
