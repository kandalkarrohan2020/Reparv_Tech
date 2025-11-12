import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

//Join Our Team Pages
import SalesPartner from "./pages/SalesPartner";
import TerritoryPartner from "./pages/TerritoryPartner";
import ProjectPartner from "./pages/ProjectPartner";
// User Account Cancellation
import AccountCancellation from "./pages/AccountCancellation";

// privacy Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import Promoter from "./pages/Promoter";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/promoter" element={<Promoter />} />
          <Route path="/sales-partner" element={<SalesPartner />} />
          <Route path="/territory-partner" element={<TerritoryPartner />} />
          <Route path="/project-partner" element={<ProjectPartner />} />
          <Route path="/account-cancellation" element={<AccountCancellation />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/cancellation-policy" element={<RefundPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
