import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

// privacy Pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import PropertyDetails from "./pages/PropertyDetails";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import ErrorPage from "./pages/ErrorPage";
import CheckEligibility from "./pages/CheckEligibility";

// useAuth Gobal Variables
import { useAuth } from "./store/auth";

function App() {
  const { propertyType, selectedCity } = useAuth();
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<Properties />} />
          <Route
            path="/:bhkType/:propertyCategory/in/:city"
            element={<Properties />}
          />
          <Route
            path="/:slug"
            element={<Properties />}
          />

          <Route path="/property-info/:id" element={<PropertyDetails />} />
          <Route path="/property-details" element={<PropertyDetails />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/cancellation-policy" element={<RefundPolicy />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />

          <Route path="/check-eligibility" element={<CheckEligibility />} />
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
