import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../Assets/Images/logo.png";


function PoliceNavbar() {

    const navigate=useNavigate();

  useEffect(() => {
    if (localStorage.getItem("policeId") == null) {
      navigate("/");
    }
  });

  const id = localStorage.getItem('policeId');


    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
      };

      useEffect(() => {
        if (localStorage.getItem('policestationName') == null) {
          navigate('/');
        }
      }, [navigate]);
        
        const policestationname=localStorage.getItem('policestationName')

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar_bg police_nav_main">
        <div class="container-fluid">
         
        <Link to='/police_home' className="text-decoration-none" >
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
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse flex-grow-0 mt-3">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 " id="text_color_white">
              <li class="nav-item m-3">
                <Link
                to={'/police_home'}
                  class="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  Home
                </Link>
              </li>

              <li class="nav-item m-3">
                <Link
                to={`/policeviewcases`}
                  class="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  New Crime
                </Link>
              </li>

              <li class="nav-item m-3">
                <Link
                to='/policeviewApprovedcases'
                  class="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  Cases
                </Link>
              </li>

              <li class="nav-item m-3">
                <Link
                to={`/police_view_alerts`}
                  class="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  Alerts
                </Link>
              </li>
              <div className='dropdown-center'>
              <li className="nav-item m-3">
                <Link
                  to="#"
                  className="nav-link "
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="text_color_white"
                >
                  Settings
                </Link>
                <ul className="dropdown-menu landing_dropdown_style" aria-labelledby="navbarDropdown">
                  {/* <li>
                    <Link to="/police_forgotpassword" className="dropdown-item">
                      Change Password
                    </Link>
                  </li> */}
                 
                  <li>
                    <Link to={`/policeprofile/${id}`} className="dropdown-item">
                      View Profile
                    </Link>
                  </li>

                  <li>
                  <Link to={'/'} onClick={handleLogout} className='dropdown-item'>
                    Logout
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
  )
}

export default PoliceNavbar
