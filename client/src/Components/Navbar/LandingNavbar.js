import React from "react";
import "../../Assets/Styles/Navbar.css";
import logo from "../../Assets/Images/logo.png";
import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar_bg">
        <div className="container-fluid">
          <Link to='/' className="text-decoration-none">
            <div className="navbar_logo">
              <img src={logo} className="img-fluid" alt="logo" />
              <div>
                <p className="navbar_title">
                  Crime <span>Buster</span>
                </p>
                <p className="navbar_slogan">Stay connected stay safe</p>
              </div>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-grow-0 mt-3" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="text_color_white">
              <li className="nav-item m-3">
                <Link
                  to='/'
                  className="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item m-3">
                <Link to="/about" className="nav-link" id="text_color_white">
                  About Us
                </Link>
              </li>
              <li className="nav-item m-3">
                <Link to="/contact" className="nav-link" id="text_color_white">
                  Contact Us
                </Link>
              </li>
              
              <div className="dropdown-center" >
              <li className="nav-item m-3">
                <Link
                  to="#"
                  className="nav-link "
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="text_color_white"
                >
                  Sign In
                </Link>
                <ul className="dropdown-menu landing_dropdown_style" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/citizen_login" className="dropdown-item">
                      Citizen Login
                    </Link>
                  </li>
                 
                  <li>
                    <Link to="/police_login" className="dropdown-item">
                      Police Login
                    </Link>
                  </li>

                  <li>
                    <Link to="/scrb_login" className="dropdown-item">
                      Scrb Login
                    </Link>
                  </li>
                </ul>
              </li>
              </div>
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LandingNavbar;
