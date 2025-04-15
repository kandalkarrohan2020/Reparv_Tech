import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Overview from "./pages/Overview.jsx";
import Enquirers from "./pages/Enquirers.jsx";
import Properties from "./pages/Properties.jsx";
import Calender from "./pages/Calender.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

//property Routes 
import Flat from "./propertyPages/Flat.jsx";
import Plot from "./propertyPages/Plot.jsx";
import Rental from "./propertyPages/Rental.jsx";
import Resale from "./propertyPages/Resale.jsx";
import RowHouse from "./propertyPages/RowHouse.jsx";
import Lease from "./propertyPages/Lease.jsx";
//import NewProject from "./propertyPages/NewProject.jsx";
import FarmHouse from "./propertyPages/FarmHouse.jsx";
import PropertyInfo from "./propertyPages/PropertyInfo.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

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
          <Route path="/calender" element={<Calender />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="/flat" element={<Flat />} />
          <Route path="/rental" element={<Rental/>} />
          <Route path="/lease" element={<Lease/>} />
          <Route path="/row-house" element={<RowHouse/>} />
          <Route path="/plot" element={<Plot/>} />
          
          <Route path="/resale" element={<Resale/>} />
          <Route path="/farm-house" element={<FarmHouse/>} />
          <Route path="/property-info/:id" element={<PropertyInfo />} />
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
