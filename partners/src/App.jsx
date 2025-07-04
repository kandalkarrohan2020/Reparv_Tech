import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./components/layout/Layout";

//Join Our Team Pages
import SalesPartner from "./pages/SalesPertner";
import TerritoryPartner from "./pages/TerritoryPartner";
import ProjectPartner from "./pages/ProjectPartner";
import OnboardingPartner from "./pages/OnboardingPartner";

// privacy Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<SalesPartner />} />

          <Route path="/sales-partner" element={<SalesPartner />} />
          <Route path="/territory-partner" element={<TerritoryPartner />} />
          <Route path="/project-partner" element={<ProjectPartner />} />
          <Route path="/onboarding-partner" element={<OnboardingPartner />} />

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
