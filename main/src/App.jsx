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
import Plot from './pages/Plot'
import FarmVilla from './pages/FarmVilla'
import Farm from './pages/Farm'
import Lease from './pages/Lease'
import ScrollToTop from './components/ScrollToTop'

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
          <Route path="/plot" element={<Plot />} />
          <Route path="/farmvilla" element={<FarmVilla/>} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/lease" element={<Lease/>} />
          <Route path="/property" element={<PropertyInfo />} />
          <Route path="/about-us" element={<AboutUs/>} />
          <Route path="/join-our-team" element={<JoinOurTeam />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
