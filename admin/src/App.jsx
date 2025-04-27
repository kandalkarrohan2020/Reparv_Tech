import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Overview from "./pages/Overview.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Map from "./pages/Map.jsx";
import Calender from "./pages/Calender.jsx";
import Customers from "./pages/Customers.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import RawMaterials from "./pages/RawMaterials.jsx";
import Marketing from "./pages/Marketing.jsx";
import Login from "./pages/Login.jsx";
import Employee from "./pages/Employee.jsx";
import Builders from "./pages/Builders.jsx";
import SalesPerson from "./pages/SalesPerson.jsx";
import AuctionMembers from "./pages/AuctionMembers.jsx";
import Properties from "./pages/Properties.jsx";
import Role from "./pages/Role.jsx";
import Department from "./pages/Department.jsx";
//import PropertyType from "./pages/PropertyType.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Slider from "./pages/Slider.jsx";
import Testimonial from "./pages/Testimonial.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import OnBoardingPartner from "./pages/OnBoardingPartner.jsx";
import ProjectPartner from "./pages/projectPartner.jsx";
import TerritoryPartner from "./pages/TerritoryPartner.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/salespersons" element={<SalesPerson />} />
          <Route path="/onboardingpartner" element={<OnBoardingPartner />} />
          <Route path="/projectpartner" element={<ProjectPartner />} />
          <Route path="/territorypartner" element={<TerritoryPartner />} />
          <Route path="/auctionmembers" element={<AuctionMembers />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/role" element={<Role />} />
          <Route path="/department" element={<Department />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/slider" element={<Slider/>} />
          <Route path="/testimonial" element={<Testimonial/>} />
          <Route path="/raw-materials" element={<RawMaterials />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
