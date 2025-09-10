import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Overview from "./pages/Overview.jsx";
import Properties from "./pages/Properties.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import KYC from "./pages/KYC.jsx";
import MarketingContent from "./pages/MarketingContent.jsx";
import BrandAccessories from "./pages/BrandAccessories.jsx";
import Map from "./pages/Map.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/kyc/:userid" element={<KYC />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/map" element={<Map />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/brand-accessories" element={<BrandAccessories />} />
          <Route path="/marketing-content" element={<MarketingContent />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
