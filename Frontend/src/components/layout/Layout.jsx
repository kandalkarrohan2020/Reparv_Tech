import React from 'react'
import "./Layout.css"
import reparvMainLogo from "../../assets/layout/reparvMainLogo.png"
import calenderIcon from "../../assets/layout/calenderIcon.png"
import customersIcon from "../../assets/layout/customersIcon.png"
import enquirersIcon from "../../assets/layout/enquirersIcon.png"
import mapIcon from "../../assets/layout/mapIcon.png"
import materialIcon from "../../assets/layout/materialIcon.png"
import overviewIcon from "../../assets/layout/overviewIcon.png"
import partnerIcon from "../../assets/layout/partnerIcon.png"
import ticketingIcon from "../../assets/layout/ticketingIcon.png"
import marketingIcon from "../../assets/layout/marketingIcon.png"
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="layout">
      <div className="sidebarContainer">
        <div className="sidebar">
    
          <div className="reparvLogo">
           <img src={reparvMainLogo} alt="" />
          </div>

          <NavLink to="/" className="navlink">
            <div className="icon">
              <img src={overviewIcon} alt="" />
            </div>
            <div className="text">
                <p>Overview</p>
            </div>
          </NavLink>

          <NavLink to="enquirers" className="navlink">
            <div className="icon">
              <img src={enquirersIcon} alt="" />
            </div>
            <div className="text">
                <p>Enquirers</p>
            </div>
          </NavLink>

          <NavLink to="map" className="navlink">
            <div className="icon">
              <img src={mapIcon} alt="" />
            </div>
            <div className="text">
                <p>Map</p>
            </div>
          </NavLink>

          <NavLink to="calender" className="navlink">
            <div className="icon">
              <img src={calenderIcon} alt="" />
            </div>
            <div className="text">
                <p>Calender</p>
            </div>
          </NavLink>

          <NavLink to="customers" className="navlink">
            <div className="icon">
              <img src={customersIcon} alt="" />
            </div>
            <div className="text">
                <p>Customers</p>
            </div>
          </NavLink>

          <NavLink to="partners" className="navlink">
            <div className="icon">
              <img src={partnerIcon} alt="" />
            </div>
            <div className="text">
                <p>Parteners</p>
            </div>
          </NavLink>

          <NavLink to="ticketing" className="navlink">
            <div className="icon">
              <img src={ticketingIcon} alt="" />
            </div>
            <div className="text">
                <p>Ticketing</p>
            </div>
          </NavLink>

          <NavLink to="raw-materials" className="navlink">
            <div className="icon">
              <img src={materialIcon} alt="" />
            </div>
            <div className="text">
                <p>Raw Materials</p>
            </div>
          </NavLink>

          <NavLink to="marketing" className="navlink">
            <div className="icon">
              <img src={marketingIcon} alt="" />
            </div>
            <div className="text">
                <p>Marketing Templates</p>
            </div>
          </NavLink>

        </div>
      </div>

      <Outlet/>
    </div>
  )
}

export default Layout