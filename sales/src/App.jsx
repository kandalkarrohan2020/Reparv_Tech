import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Overview from "./pages/Overview.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Properties from "./pages/Properties.jsx";
import Calender from "./pages/Calender.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

//property Routes 
import ScrollToTop from "./components/ScrollToTop.jsx";
import Property from "./propertyPages/Properties.jsx";
import PropertyDetails from "./propertyPages/PropertyDetails.jsx";
import KYC from "./pages/KYC.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/kyc" element={<KYC />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/tickets" element={<Ticketing />} />

          <Route path="/property" element={<Property />} />
          <Route path="/property-info/:id" element={<PropertyDetails />} />
          
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
