import React from "react";
import "../../Assets/Styles/Footer.css";
import logo from "../../Assets/Images/logo.png";
import fb from "../../Assets/Images/fb.png";
import insta from "../../Assets/Images/insta.png";
import browser from "../../Assets/Images/browser.png";

function Footer() {
  return (
    <div>
      <div className="footer ">
        <div className="container footer_box">
          <div className="footer_logo">
            <div>
              <img src={logo} />
            </div>
            <div className="footer_logo_content">
              <p className="footer_logo_title">
                Crime <span>Buster</span>
              </p>
              <p className="footer_logo_sub_title">Stay connect stay safe</p>
            </div>
          </div>
          <div>
            <p className="footer_title">Terms & Policies</p>
            <p className="footer_content">Terms of Service</p>
            <p className="footer_content">Privacy Policy</p>
          </div>
          <div>
            <p className="footer_title">Contact</p>
            <p className="footer_content">(+91)1234567890</p>
            <p className="footer_content">crimebuster@gmail.com</p>
          </div>
          <div>
            <p className="footer_title">Location</p>
            <p className="footer_content">abc building</p>
            <p className="footer_content">crimebuster@gmail.com</p>
          </div>
          <div>
            <p className="footer_title">Keep In Touch</p>
            <div className="footer_links">
              <a href="https://www.facebook.com/login/" ><img src={fb} className="img-fluid" alt="facebook_logo" /></a>
              <a href="https://www.instagram.com/accounts/login/?hl=en" ><img src={insta} className="img-fluid" alt="instagram_logo" /></a>
              <a href="https://accounts.google.com/signin/v2/identifier?service=mail" ><img src={browser} className="img-fluid" alt="browser" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
