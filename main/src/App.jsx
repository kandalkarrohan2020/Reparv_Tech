import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import PropertyInfo from './pages/PropertyInfo'
import AboutUs from './pages/AboutUs'
import JoinOurTeam from './pages/JoinOurTeam'
import ContactUs from './pages/ContactUs'
import Flat from './pages/Flat'
import Rental from './pages/Rental'
import Lease from './pages/Lease'
import ScrollToTop from './components/ScrollToTop'
import RowHouse from './pages/RowHouse'
import Plot from './pages/Plot'
import NewProject from './pages/NewProject'
import Resale from './pages/Resale'
import FarmHouse from './pages/FarmHouse'
import Commercial from './pages/Commercial'

// privacy Pages
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import RefundPolicy from './pages/RefundPolicy'


function App() {
  
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/flat" element={<Flat />} />
          <Route path="/rental" element={<Rental/>} />
          <Route path="/lease" element={<Lease/>} />
          <Route path="/row-house" element={<RowHouse/>} />
          <Route path="/plot" element={<Plot/>} />
          <Route path="/new-project" element={<NewProject/>} />
          <Route path="/resale" element={<Resale/>} />
          <Route path="/farm-house" element={<FarmHouse/>} />
          <Route path="/commercial" element={<Commercial/>} />
          <Route path="/property-info/:id" element={<PropertyInfo />} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
