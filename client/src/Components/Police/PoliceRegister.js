import React, { useState } from "react";
import "../../Assets/Styles/CitizenRegistration.css";
import { Link, useNavigate } from "react-router-dom";
import policereg from "../../Assets/Images/policereg.png";
import "./Police.css";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function PoliceRegister() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    policestationname: "",
    policestationcode: "",
    stationchargeofficers: "",
    totalofficers: "",
    password: "",
    address: "",
    contact: "",
    district: "",
    email: "",
    confirmpassword: "",
    idProof: null,
  });
  const [errors, setErrors] = useState({
    policestationname: "",
    policestationcode: "",
    stationchargeofficers: "",
    totalofficers: "",
    password: "",
    address: "",
    contact: "",
    district: "",
    email: "",
    confirmpassword: "",
    idProof: "",
  });
  const districts = [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ];

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setData(prevData => ({
  //     ...prevData,
  //     [name]: value
  //   }));
  //   setErrors(prevErrors => ({
  //     ...prevErrors,
  //     [name]: ''
  //   }));
  // };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  function validateField(fieldName, value) {
    if (!value) {
      return `${fieldName} is required`;
    }

    if (fieldName === "Email" && !value.endsWith("@gmail.com")) {
      return "Email must be a valid Gmail address.";
    }
    return "";
  }

  function validateContact(fieldName, value) {
    if (!value.trim()) {
      return `${fieldName} is required`;
    } else if (value.length !== 10) {
      return "Please enter a valid Contact Number";
    }
    return "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    errors.policestationname = validateField(
      "Policestationname",
      data.policestationname
    );
    errors.policestationcode = validateField(
      "policestationcode",
      data.policestationcode
    );
    errors.stationchargeofficers = validateField(
      "Stationchargeofficers",
      data.stationchargeofficers
    );
    errors.totalofficers = validateField("Totalofficers", data.totalofficers);
    errors.address = validateField("Address", data.address);
    errors.contact = validateContact("Contact", data.contact);
    errors.district = validateField("District", data.district);
    errors.email = validateField("Email", data.email);
    errors.idProof = validateField("idProof", data.idProof);

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    if (!data.password.trim()) {
      formIsValid = false;
      errors.password = "Password is required";
    } else if (!passwordRegex.test(data.password)) {
      // Pass the password to the test method
      errors.password =
        "Password must contain at least one number, one special character, and one capital letter";
    }

    if (!data.confirmpassword.trim()) {
      formIsValid = false;
      errors.confirmpassword = "Confirm Password is required";
    } else if (data.confirmpassword !== data.password) {
      formIsValid = false;
      errors.confirmpassword = "Passwords do not match";
    }
    if (!data.contact.trim()) {
      formIsValid = false;
      errors.contact = "Contact is required";
    } else if (data.contact.length !== 10) {
      formIsValid = false;
      errors.contact = "Please enter a valid Contact Number";
    }

    setErrors(errors);
    if (formIsValid) {
      console.log("data", data);

      axiosInstance
        .post("/policeregister", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response:", response);
          if (response.data.status === 200) {
            console.log("Login Successful");
            toast.success("Registered Successfully");
            navigate("/police_login");
          } else if (response.data.status === 409) {
            toast.warning(response.data.msg);
          } else {
            console.log("Login Failed");
            alert("Login Failed");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-6 container-fluid">
            <img src={policereg} className="img"></img>
          </div>
          <div className="col-6">
            <div>
              <h3 className="policereg">Police Station Registration </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <input
                  type="text"
                  className="textbox"
                  placeholder="Police Station Name"
                  name="policestationname"
                  value={data.policestationname}
                  onChange={handleChange}
                  required
                />
                {errors.policestationname && (
                  <div className="text-danger color">
                    {errors.policestationname}
                  </div>
                )}
              </div>
              <div className="row">
                <div className="col-6 container-fluid">
                  <div className="mt-4">
                    <input
                      type="text"
                      className="text"
                      placeholder="Police Station Code "
                      name="policestationcode"
                      value={data.policestationcode}
                      onChange={handleChange}
                      required
                    />
                    {errors.policestationcode && (
                      <div className="text-danger color">
                        {errors.policestationcode}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      className="text"
                      placeholder="Station Incharge Officers"
                      name="stationchargeofficers"
                      value={data.stationchargeofficers}
                      onChange={handleChange}
                      required
                    />
                    {errors.stationchargeofficers && (
                      <div className="text-danger color">
                        {errors.stationchargeofficers}
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <input
                      type="text"
                      className="text"
                      placeholder="Total Officers"
                      name="totalofficers"
                      value={data.totalofficers}
                      onChange={handleChange}
                      required
                    />
                    {errors.totalofficers && (
                      <div className="text-danger color">
                        {errors.totalofficers}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <div className="mt-4">
                    <input
                      type="text"
                      className="text"
                      placeholder="Address"
                      name="address"
                      value={data.address}
                      onChange={handleChange}
                      required
                    />
                    {errors.address && (
                      <div className="text-danger color">{errors.address}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <input
                      type="number"
                      className="text"
                      placeholder="Contact"
                      name="contact"
                      value={data.contact}
                      onChange={handleChange}
                      required
                    />
                    {errors.contact && (
                      <div className="text-danger color">{errors.contact}</div>
                    )}
                  </div>
                  <div className="mt-4">
                    <select
                      className="text"
                      name="district"
                      value={data.district}
                      onChange={handleChange}
                      required
                    >
                      <option>Select District</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <div className="text-danger color">{errors.district}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 mt-4">
                  <input
                    type="text"
                    className="text"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <div className="text-danger color">{errors.email}</div>
                  )}
                </div>
                <div className="col-6 mt-4">
                  <input
                    type="file"
                    className=""
                    name="idProof"
                    id="idProof"
                    onChange={handleChange}
                    required
                  />  
                  {/* <label htmlFor="idProof" className="">
                    <i className="ri-upload-2-fill"></i> Upload ID Proof
                  </label> */}
                  {errors.idProof && (
                    <div className="text-danger color">{errors.idProof}</div>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="mt-4">
                    <input
                      type="password"
                      className="text"
                      placeholder="Password "
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && (
                      <div className="text-danger color">{errors.password}</div>
                    )}
                  </div>
                </div>
                <div className="col-6 container-fluid">
                  <div className="mt-4">
                    <input
                      type="password"
                      className="text"
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      value={data.confirmpassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmpassword && (
                      <div className="text-danger color">
                        {errors.confirmpassword}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="btnsign">
                  Sign In
                </button>
              </div>
              <p className="login mt-4">
                Already have an account?{" "}
                <Link to="/police_login" className="lognow">
                  Login now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoliceRegister;
