import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Overview from "./pages/Overview.jsx";
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

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/kyc/:userid" element={<KYC />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/calender" element={<CalendarScheduler />} />
          <Route path="/download-apk" element={<DownloadApk />} />
          
          <Route path="/property" element={<Property />} />
          <Route path="/property-info/:id" element={<PropertyDetails />} />
          
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
