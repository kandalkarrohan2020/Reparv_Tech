import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import SalesPerson from "./pages/SalesPerson.jsx";
import OnBoardingPartner from "./pages/OnBoardingPartner.jsx";
import ProjectPartner from "./pages/projectPartner.jsx";
import TerritoryPartner from "./pages/TerritoryPartner.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/salespersons" element={<SalesPerson />} />
          <Route path="/onboardingpartner" element={<OnBoardingPartner />} />
          <Route path="/projectpartner" element={<ProjectPartner />} />
          <Route path="/territorypartner" element={<TerritoryPartner />} />
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
