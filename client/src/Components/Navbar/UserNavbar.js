import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/Images/logo.png";
import axiosInstance from "../Constants/BaseUrl";

function UserNavbar() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({});


  useEffect(() => {
    if (localStorage.getItem("citizenToken") == null) {
      navigate("/");
    }
  }, [navigate]);

  const id=localStorage.getItem('citizenToken')

  useEffect(() => {
    axiosInstance
      .post(`/viewCitizenById/${id}`)
      .then((res) => {
        console.log("woking", res);
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        }
      })
      .catch((err) => {
        // toast.error("Registration Failed");
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      {/* <nav className="navbar navbar_bg">
        <div className="container-fluid container navbar_box">
          <div className="navbar_logo">
            <img src={logo} className="img-fluid" alt="logo" />
            <div>
              <p className="navbar_title">
                Crime <span>Reporting</span>
              </p>
              <p className="navbar_slogan">Stay connected stay safe</p>
            </div>
          </div>
          <div className="navbar_sub_title d-flex justify-content-between">
            <p>
              <Link to="/citizen_home">Home</Link>
            </p>
            <p>
              <Link to="/citizen_profile">Profile</Link>
            </p>
            <p>
              <Link to="/" onClick={handleLogout}>
                <i className="ri-logout-box-r-line fs-6"></i>
              </Link>
            </p>
          </div>
        </div>
      </nav> */}
      <nav class="navbar navbar-expand-lg navbar_bg">
        <div class="container-fluid">
         
        <Link to='/citizen_home' className="text-decoration-none" >
          <div className="navbar_logo">
            <img src={logo} className="img-fluid" alt="logo" />
            <div>
              <p className="navbar_title">
                Crime <span>Reporting</span>
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
                to={'/citizen_home'}
                  class="nav-link"
                  aria-current="page"
                  id="text_color_white"
                >
                  Home
                </Link>
              </li>
              <li class="nav-item m-3">

              <div className="dropdown-center" >
              <li className="nav-item">
                <Link
                  to="#"
                  className="nav-link "
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="text_color_white"
                >
                  Crime
                </Link>
                <ul className="dropdown-menu landing_dropdown_style" aria-labelledby="navbarDropdown">
                  <li>
                  <Link to='/citizen/reportcrime' class="nav-link"  id="text_color_black">
                        Add Crime
                      </Link>
                      <Link to='/crimestatus' class="nav-link"  id="text_color_black">
                        View Crime Status
                      </Link>
                      <Link to='/viewcrimestatus' class="nav-link"  id="text_color_black">
                        Nearby Cases
                      </Link>
                  </li>
                </ul>
              </li>
              </div>
               
                {/* <div class="dropdown-center">
                  <button
                    class=" button_bg dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  > Crime
                  </button>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link to='/citizen/reportcrime' class="nav-link"  id="text_color_white">
                        Add Crime
                      </Link>
                      <Link to='/viewcrimestatus' class="nav-link"  id="text_color_white">
                        View Crime
                      </Link>
                    </li>
                   
                  </ul>
                </div> */}
              </li>

              {/* <li class="nav-item m-3">
                <Link to='/citizen/reportcrime' class="nav-link"  id="text_color_white">
                  Crime
                </Link>
              </li>
              <li class="nav-item m-3">
                <Link to='/viewcrimestatus' class="nav-link"  id="text_color_white">
                  View Crime
                </Link>
              </li> */}

              <li class="nav-item m-3">
                <Link to='/user_view_police' class="nav-link" href="#" id="text_color_white">
                  Police Stations
                </Link>
              </li>
              <li class="nav-item m-3">
                <Link to='/addcomplaints' class="nav-link" href="#" id="text_color_white">
                  Complaints
                </Link>
              </li>
              <li class="nav-item m-3">
                <Link class="nav-link" to='/viewnotification' id="text_color_white">
                  View Alerts
                </Link>
              </li>
       
              
              <li class="nav-item m-3">
               
                <div class="dropdown-center">
                  <button
                    class=" button_bg dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userDetails.firstname} {userDetails.lastname}
                  </button>
                  <ul class="dropdown-menu dropdown-menu-dark">
                    <li>
                      <Link to={'/citizen_profile'} class="dropdown-item" href="#">
                        Profile
                      </Link>
                      <Link to={'/'} onClick={handleLogout} class="dropdown-item" href="#">
                        Logout
                      </Link>
                    </li>
                   
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserNavbar;
