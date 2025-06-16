import React from "react";
import "../../Assets/Styles/Services.css";

function Services() {
  return (
    <div>
      <div className="services">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <p className="services_sub_title">Our Services</p>
              <p className="services_title">
                Our Comprehensive Crime Reporting Services
              </p>
              <p className="services_para">
                Welcome to our Crime Reporting System, where community safety is
                our top priority. Explore our comprehensive services designed to
                empower citizens, enhance law enforcement capabilities, and
                ensure effective system management. With our user-friendly
                Citizen Module, reporting crimes becomes seamless and secure.
                Our innovative Witness Community module allows citizens to
                contribute actively to neighborhood safety, fostering a
                collaborative approach. For law enforcement, our Police Module
                serves as a dynamic hub for incident management and resolution,
                promoting transparent communication with the community. The
                Admin Module ensures the seamless functioning of our system,
                providing administrators with tools for user and incident
                management, insightful analytics, and robust oversight. Join us
                in building a more secure and connected community with our
                services – making a lasting impact on the safety and well-being
                of neighborhoods.
              </p>
            </div>
            <div className="col-6 services_right ">
              <div className="row d-flex justify-content-around">
                <div className="col-6 services_small_box mb-5">
                  <div className="services_white_box">
                  <i class="ri-megaphone-line"></i>
                  </div>
                  <p className="services_small_box_title">
                    Incident Reporting Management
                  </p>
                </div>
                <div className="col-6 services_small_box mb-5">
                  <div className="services_red_box">
                  <i class="ri-community-line"></i>
                  </div>
                  <p className="services_small_box_title">
                    Community Engagement
                  </p>
                </div>
                <div className="col-6 services_small_box mb-5">
                  <div className="services_green_box">
                  <i class="ri-hand-heart-line"></i>
                  </div>
                  <p className="services_small_box_title">
                    Law Enforcement Support
                  </p>
                </div>
                <div className="col-6 services_small_box mb-5">
                  <div className="services_yellow_box">
                  <i class="ri-shield-user-line"></i>
                  </div>
                  <p className="services_small_box_title">
                    System Administration
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
