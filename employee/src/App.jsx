import React from "react";
import "./App.css";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Map from "./pages/Map.jsx";
import Calender from "./pages/Calender.jsx";
import Customers from "./pages/Customers.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import BrandAccessories from "./pages/BrandAccessories.jsx";
import MarketingContent from "./pages/MarketingContent.jsx";
import Login from "./pages/Login.jsx";
import Employee from "./pages/Employee.jsx";
import Builders from "./pages/Builders.jsx";
import Promoter from "./pages/Promoter.jsx";
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
import GuestUser from "./pages/guestUser.jsx";
import Blogs from "./pages/Blogs.jsx";
import Trends from "./pages/Trends.jsx";
import ApkUpload from "./pages/ApkUpload.jsx";
import UsersLoanEligibility from "./pages/UsersLoanEligibility.jsx";
import UpdateEMI from "./components/usersLoanEligibility/UpdateEMI.jsx";
import { useAuth } from "./store/auth.jsx";
import PropertyAuthority from "./pages/PropertyAuthority.jsx";
import Subscription from "./pages/Subscription.jsx";

const App = () => {
  const { URI, setLoading, user } = useAuth();
  const [menus, setMenus] = useState([
    {
      name: "Enquirers",
      menu: <Route path="/enquirers" element={<Enquirers />} />,
    },
    {
      name: "Properties",
      menu: <Route path="/properties" element={<Properties />} />,
    },
    { name: "Map", menu: <Route path="/map" element={<Map />} /> },
    {
      name: "Calender",
      menu: <Route path="/calender" element={<Calender />} />,
    },
    {
      name: "Customers",
      menu: <Route path="/customers" element={<Customers />} />,
    },
    {
      name: "Employees",
      menu: <Route path="/employees" element={<Employee />} />,
    },
    {
      name: "Guest Users",
      menu: <Route path="/guest-users" element={<GuestUser />} />,
    },
    {
      name: "Subscription Pricing",
      menu: <Route path="/subscription-pricing" element={<Subscription />} />,
    },
    {
      name: "Builders",
      menu: <Route path="/builders" element={<Builders />} />,
    },
    {
      name: "Promoters",
      menu: <Route path="/promoters" element={<Promoter />} />,
    },
    {
      name: "Sales Persons",
      menu: <Route path="/salespersons" element={<SalesPerson />} />,
    },
    {
      name: "Onboarding Partners",
      menu: <Route path="/onboardingpartner" element={<OnBoardingPartner />} />,
    },
    {
      name: "Project Partners",
      menu: <Route path="/projectpartner" element={<ProjectPartner />} />,
    },
    {
      name: "Territory Partners",
      menu: <Route path="/territorypartner" element={<TerritoryPartner />} />,
    },
    { name: "Roles", menu: <Route path="/role" element={<Role />} /> },
    {
      name: "Departments",
      menu: <Route path="/department" element={<Department />} />,
    },
    {
      name: "Authorities",
      menu: <Route path="/property-authorities" element={<PropertyAuthority />} />,
    },
    {
      name: "Tickets",
      menu: <Route path="/tickets" element={<Ticketing />} />,
    },
    { name: "Slider", menu: <Route path="/slider" element={<Slider />} /> },
    {
      name: "Testimonial",
      menu: <Route path="/testimonial" element={<Testimonial />} />,
    },
    {
      name: "Users Loan Eligibility",
      menu: (
        <Route
          path="/users-loan-eligibility"
          element={<UsersLoanEligibility />}
        />
      ),
    },
    {
      name: "Apk Upload",
      menu: <Route path="/apk-upload" element={<ApkUpload />} />,
    },
    { name: "Blogs", menu: <Route path="/blogs" element={<Blogs />} /> },
    { name: "Trends", menu: <Route path="/trends" element={<Trends />} /> },
    {
      name: "Brand Accessories",
      menu: <Route path="/brand-accessories" element={<BrandAccessories />} />,
    },
    {
      name: "Marketing Content",
      menu: <Route path="/marketing-content" element={<MarketingContent />} />,
    },
  ]);

  const dynamicRoutes = menus.filter((menu) =>
    user?.assignMenus?.includes(menu.name)
  );

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/user-loan-eligibility-data-update/:id"
            element={<UpdateEMI />}
          />
          {/* Menu Wise Dynamic Routes */}
          {dynamicRoutes.map((menu, index) => (
            <React.Fragment key={index}>{menu.menu}</React.Fragment>
          ))}
        </Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </>
  );
};

export default App;
