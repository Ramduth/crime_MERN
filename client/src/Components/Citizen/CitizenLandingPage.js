import React, { useEffect } from "react";
import Banner from "../Common/Banner";
import { useNavigate } from "react-router-dom";
import "../../Assets/Styles/CitizenLandingPage.css";
import img1 from "../../Assets/Images/citizenlanding2.png";
import img2 from "../../Assets/Images/citizenlanding1.png";
import img3 from "../../Assets/Images/checkmarkIcon.png";

function CitizenLandingPage() {
  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("citizenToken") == null) {
      navigate("/");
    }
  });

  return (
    <div>
      <div className="container citizen_landingpage">
        <p className="citizen_landingpage_content">
          Crime reporting is an important beat of journalism. In order to report
          crime related news, it is necessary that the reporter should have good
          knowledge of law, police and court. Connect and live more safely.
          Citizen is a personal safety network that empowers you to protect
          yourself and the people and places you care about. Download for access
          to real-time 911 alerts, instant help from crisis responders, and
          safety tracking for friends and families. Although there are many
          different kinds of crimes, criminal acts can generally be divided into
          five primary categories: crimes against a person, crimes against
          property, inchoate crimes, statutory crimes, and financial crimes.A
          crime is a deliberate act that causes physical or psychological harm,
          damage to or loss of property, and is against the law.
        </p>

        <div className="row">
          <div className="col-6">
            <div className="d-flex">
              <div className="citizen_img1">
                <img src={img1} className="img-fluid" />
              </div>
              <div className="citizen_img2">
                <img src={img2} className="img-fluid" />
                <div className="citizen_imgbox">
                  <p>“Cops Work For A Cause , Not Applause.”</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="citizen_img_content">
              <p className="citizen_img_content_head mt-3">
                We’ve Been Protecting The Community Since 1980
              </p>
              <p className="citizen_img_content_para mt-2">
                Lorem ipsum dolor sit amet,consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor .Aenean massa.cum sociis natoque
                peanatibus et magnis dis parturient montes nascetur ridiculus
                mus dolore magna
              </p>
              <div className="d-flex justify-content-between">
                <div className="mt-4" >
                  <div className="citizen_img_content_points d-flex mb-3">
                    <img src={img3} />
                    <p className="px-3">Protect The Society</p>
                  </div>
                  <div className="citizen_img_content_points d-flex mb-3">
                    <img src={img3} />
                    <p className="px-3">On The Public Side</p>
                  </div>
                  <div className="citizen_img_content_points d-flex mb-3">
                    <img src={img3} />
                    <p className="px-3">Open Minded</p>
                  </div>
                </div>
                <div className="mt-4" >
                <div className="citizen_img_content_points d-flex mb-3">
                    <img src={img3} />
                    <p className="px-3">Professional</p>
                  </div>
                  <div className="citizen_img_content_points d-flex mb-3">
                    <img src={img3} />
                    <p className="px-3">Advocating Justice</p>
                  </div>
                  <div className="citizen_img_content_points d-flex mb-3">
                    <img src={img3} />
                    <p className="px-3">The Society Frontliner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitizenLandingPage;
