import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Overview from "./pages/Overview.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Map from "./pages/Map.jsx";
import Calender from "./pages/Calender.jsx";
import Customers from "./pages/Customers.jsx";
import Partners from "./pages/Partners.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import RawMaterials from "./pages/RawMaterials.jsx";
import Marketing from "./pages/Marketing.jsx";
import Login from "./pages/Login.jsx";
import Employee from "./pages/Employee.jsx";
import Builders from "./pages/Builders.jsx";
import SalesPerson from "./pages/SalesPerson.jsx";
import AuctionMembers from "./pages/AuctionMembers.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/sales" element={<SalesPerson />} />
          <Route path="/auction" element={<AuctionMembers />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/ticketing" element={<Ticketing />} />
          <Route path="/raw-materials" element={<RawMaterials />} />
          <Route path="/marketing" element={<Marketing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
