import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout/Layout";
import AdminLayout from "./components/layout/adminLayout";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import PropertyInfo from "./pages/PropertyInfo";
import AboutUs from "./pages/AboutUs";
import JoinOurTeam from "./pages/JoinOurTeam";
import ContactUs from "./pages/ContactUs";
import Flat from "./pages/Flat";
import Rental from "./pages/Rental";
import Lease from "./pages/Lease";
import RowHouse from "./pages/RowHouse";
import Plot from "./pages/Plot";
import NewProject from "./pages/NewProject";
import Resale from "./pages/Resale";
import FarmHouse from "./pages/FarmHouse";

// Partner Pages
import SalesPartner from "./pages/salespartner/page";
import TerritoryPartner from "./pages/territorypartner/page";
import OnboardingPage from "./pages/onboardingpartner/page";
import ProjectPartnerPage from "./pages/projectpartner/page";
import { useState } from "react";
import axios from "axios";
import Commercial from "./pages/Commercial";

// Policy Pages 
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";


// Layout wrapper with Footer only
const WithFooter = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

function App() {
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState("");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR",
    });

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/orders",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        //handle Razorpay screen
        handlePayment(response.data.amount);
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const handlePayment = async (amount) => {
    const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("error in load");
      return;
    }
    const options = {
      key: "rzp_test_bsPpTv7U0niMAp",
      amount: amount,
      currency: "INR",
      name: "Reparv",
      description: "",
      image: "",
      handler: function (response) {
        setResponseId(response.razorpa_payment_is);
      },
      prefill: {
        name: "kiran",
        email: "kiranugale120@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };
    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  const paymentFetch = (e) => {
    e.preventDefault();
    const paymentId = e.target.paymentId.value;
    axios

      .get(`http://localhost:4000/payment/${paymentId}`)
      .then((res) => {
        console.log(res.data);
        setResponseState(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes with main Layout */}
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/flat" element={<Flat />} />
          <Route path="/rental" element={<Rental />} />
          <Route path="/lease" element={<Lease />} />
          <Route path="/row-house" element={<RowHouse />} />
          <Route path="/plot" element={<Plot />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/resale" element={<Resale />} />
          <Route path="/farm-house" element={<FarmHouse />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/property-info/:id" element={<PropertyInfo />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/join-our-team" element={<JoinOurTeam />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          

          {/* Footer-only Routes (no Layout) */}
          <Route
            path="/salespartner"
            element={
              <WithFooter>
                <SalesPartner />
              </WithFooter>
            }
          />
          <Route
            path="/territorypartner"
            element={
              <WithFooter>
                <TerritoryPartner />
              </WithFooter>
            }
          />
          <Route
            path="/onboardingpartner"
            element={
              <WithFooter>
                <OnboardingPage />
              </WithFooter>
            }
          />
          <Route
            path="/projectpartner"
            element={
              <WithFooter>
                <ProjectPartnerPage />
              </WithFooter>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
