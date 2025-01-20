import React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Overview from "./pages/Overview";
import Enquirers from "./pages/Enquirers";
import Map from "./pages/Map";
import Calender from "./pages/Calender";
import Customers from "./pages/Customers";
import Partners from "./pages/Partners";
import Ticketing from "./pages/Ticketing";
import RawMaterials from "./pages/Rawmaterials";
import Marketing from "./pages/Marketing";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="" element={<Layout/>}>
                <Route path="/" element={<Overview/>} />
                <Route path="/overview" element={<Overview/>} />
                <Route path="/enquirers" element={<Enquirers/>} />
                <Route path="/map" element={<Map/>} />
                <Route path="/calender" element={<Calender/>} />
                <Route path="/customers" element={<Customers/>} />
                <Route path="/partners" element={<Partners/>} />
                <Route path="/ticketing" element={<Ticketing/>} />
                <Route path="/raw-materials" element={<RawMaterials/>} />
                <Route path="/marketing" element={<Marketing/>} />
              </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
