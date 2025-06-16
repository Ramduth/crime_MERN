import React from "react";
import "../../Assets/Styles/About.css";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import contact from "../../Assets/Images/contact.png";

function ContactUs() {
  return (
    <div className="contactus_main_div p-5">
      <div className="container">
        <div className="row">
          <div className="col-6 contact_first_col">
            <h3 className="mt-4 mb-4">Contact Us</h3>
            <p className="contact_first_p mt-5 mb-5">
              Contact us for any query regarding your legal issues. Our expert
              <br />
              legal team will connect with you at the earliest.
            </p>
            <p>You could also get in touch at</p>
            <div className="row">
              <div className="col-7">
                <MdOutlineMail className="contact_icon" />
                crimereporting@gmail.com
              </div>
              <div className="col-5">
                <IoCallOutline className="contact_icon" />
                {/* 9856789880 */}
                (+91)1234567890
              </div>
            </div>
            {/* <h3 className="mt-5 mb-4">Our Workspace</h3>
            <p>
              Second Floor ,Srishti Innovative,
              <br />
              Technopark,Kazhakoodam 695582, 
              <br />
              thiruvananthapuram
            </p> */}
          </div>
          <div className="col-6 text-center">
            <img src={contact} className="img-fluid contact_img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
