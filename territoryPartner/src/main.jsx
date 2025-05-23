import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/auth.jsx'
import { PropertyFilterProvider } from './store/propertyFilter.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <PropertyFilterProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </PropertyFilterProvider>
  </AuthProvider>
)
