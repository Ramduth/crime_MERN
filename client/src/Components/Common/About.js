import React from "react";
import "../../Assets/Styles/About.css";
import about from "../../Assets/Images/about.jpg";

function About() {
  return (
    <div>
      <div className="about_page">
        <div className="about_page_head">
          <p className="about_page_title1">About Us</p>
          <p className="about_page_title2">
            Driving Community Safety Through Innovation
          </p>
        </div>
        <div className="container">
          <div className="row about_page_body">
            <div className="col-lg-6 col-md-6 col-sm-12 about_page_body_left">
              <img src={about} />
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 about_page_body_right mt-2">
                <p className="about_page_body_right_para" >At our core, we believe in empowering individuals to actively contribute to the security of their neighborhoods. Our platform goes beyond traditional reporting, fostering collaboration between citizens and law enforcement. By embracing cutting-edge technology, we provide a seamless experience for incident reporting, enabling users to contribute crucial information effortlessly. With features like multimedia attachments and anonymous reporting, we prioritize transparency and create a culture of reporting without fear.</p>
                <p className="about_page_body_right_para" >At the heart of our mission is the vision for safer communities. We invite you to be the catalyst for change, joining us in building a secure future through proactive engagement. The Crime Reporting System is not just a platform; it's a movement towards community-driven safety. Explore the possibilities, be part of the change, and together, let's create neighborhoods where every voice matters in ensuring a safer and connected environment.</p>

            </div>
            <div>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
