import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

//Join Our Team Pages 
import SalesPartner from "./pages/SalesPertner";
import TerritoryPartner from "./pages/TerritoryPartner";
import ProjectPartner from "./pages/ProjectPartner";
import OnboardingPartner from "./pages/OnboardingPartner";

// privacy Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PropertyDetails from "./pages/PropertyDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property-info/:id" element={<PropertyDetails />} />
          <Route path="/property-details" element={<PropertyDetails />} />

          <Route path="/sales-partner" element={<SalesPartner />} />
          <Route path="/territory-partner" element={<TerritoryPartner />} />
          <Route path="/project-partner" element={<ProjectPartner />} />
          <Route path="/onboarding-partner" element={<OnboardingPartner />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-details" element={<BlogDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
