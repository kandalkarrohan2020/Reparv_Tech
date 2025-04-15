import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Overview from "./pages/Overview.jsx";
import Builders from "./pages/Builders.jsx";
import Properties from "./pages/Properties.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import ErrorPage from "../../admin/src/pages/ErrorPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/builders" element={<Builders />} />
          <Route path="/tickets" element={<Ticketing />} />
          <Route path="*" element={<ErrorPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
