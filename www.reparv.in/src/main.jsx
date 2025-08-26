import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./store/auth.jsx";
import { PropertyFilterProvider } from "./store/propertyFilter.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <PropertyFilterProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </PropertyFilterProvider>
    </AuthProvider>
  </HelmetProvider>
);
