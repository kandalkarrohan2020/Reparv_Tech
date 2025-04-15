import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Overview from "./pages/Overview.jsx";
import Properties from "./pages/Properties.jsx";
import Builders from "./pages/Builders.jsx";
import Map from "./pages/Map.jsx";
import Calender from "./pages/Calender.jsx";
import Customers from "./pages/Customers.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import RawMaterials from "./pages/RawMaterials.jsx";
import Marketing from "./pages/Marketing.jsx";
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/customers" element={<Customers />} />
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
