import React from "react";
import "../../Assets/Styles/HomePage.css";
import img from "../../Assets/Images/landingmain.jpg";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div>
      <div className="home_page">
        <div className="home_page_head">
          <p className="home_page_head_title">
            Secure Neighborhoods:
            <br />
            Unveiling the Crime Buster System
          </p>
          <p className="home_page_head_para">
            Be the catalyst for change—report, engage, and build a secure future
            for your community with the Crime Buster System.
          </p>
          
          {/* Report Crime Button */}
          <div className="text-center mt-4">
            <Link 
              to="/report-crime" 
              className="btn btn-danger report-crime-btn-banner"
              style={{
                padding: '12px 30px',
                fontSize: '1.2rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                backgroundColor: '#dc3545',
                border: 'none',
                color: 'white',
                display: 'inline-block',
                marginTop: '20px'
              }}
            >
              Report a Crime
            </Link>
          </div>
        </div>

        <div className="col-12 home_page_img">
          <img src={img} className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default Banner;