import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Customers from "./pages/Customers.jsx";
import Properties from "./pages/Properties.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Ticketing from "./pages/Ticketing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const App = () => {
  return (
    <>
        <ScrollToTop />
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/tickets" element={<Ticketing />} />
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </>
  );
};

export default App;
