import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import KYC from "./pages/KYC.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Layout from "./components/layout/Layout.jsx";
import Overview from "./pages/Overview.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Customers from "./pages/Customers.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import SalesPerson from "./pages/SalesPerson.jsx";
import UsersLoanEligibility from "./pages/UsersLoanEligibility.jsx";
import MarketingContent from "./pages/MarketingContent.jsx";
import BrandAccessories from "./pages/BrandAccessories.jsx";
import OnBoardingPartner from "./pages/OnBoardingPartner.jsx";
import ProjectPartner from "./pages/ProjectPartner.jsx";
import TerritoryPartner from "./pages/TerritoryPartner.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/kyc/:userid" element={<KYC />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/salespersons" element={<SalesPerson />} />
          <Route path="/onboardingpartner" element={<OnBoardingPartner />} />
          <Route path="/projectpartner" element={<ProjectPartner />} />
          <Route path="/territorypartner" element={<TerritoryPartner />} />
          <Route
            path="/users-loan-eligibility"
            element={<UsersLoanEligibility />}
          />
          <Route path="/brand-accessories" element={<BrandAccessories />} />
          <Route path="/marketing-content" element={<MarketingContent />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
