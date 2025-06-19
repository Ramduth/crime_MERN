import React, { useEffect } from "react";
import "../../Assets/Styles/Navbar.css";
import logo from "../../Assets/Images/logo.png";
import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {

  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("adminId") == null) {
      navigate("/");
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar_bg">
        <div className="container-fluid">
          <Link to='/admin_home' className="text-decoration-none">
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
                  to='/admin_home'
                  className="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  Home
                </Link>
              </li>
              {/* <div className="dropdown-center" >
              <li className="nav-item m-3">
                <Link
                  to="#"
                  className="nav-link "
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="text_color_white"
                >
                  Privacy Policy
                </Link>
                <ul className="dropdown-menu landing_dropdown_style" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to="/admin-addprivacypolicy" className="dropdown-item">
                      Add Privacy Policy
                    </Link>
                  </li>
                 
                  <li>
                    <Link to="/admin-viewprivacypolicy" className="dropdown-item">
                      View Privacy Policy
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin-editprivacypolicy" className="dropdown-item">
                      Edit Privacy Policy
                    </Link>
                  </li>
                </ul>
              </li>
              </div> */}
              <li className="nav-item m-3">
                <Link
                  to='/'
                  onClick={handleLogout}
                  className="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  Logout
                </Link>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AdminNavbar
