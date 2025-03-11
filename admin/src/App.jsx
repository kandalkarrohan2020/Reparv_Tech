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
import PropertyType from "./pages/PropertyType.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/enquirers" element={<Enquirers />} />
          <Route path="/propertytypes" element={<PropertyType />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/salespersons" element={<SalesPerson />} />
          <Route path="/auctionmembers" element={<AuctionMembers />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/role" element={<Role />} />
          <Route path="/department" element={<Department />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/raw-materials" element={<RawMaterials />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
