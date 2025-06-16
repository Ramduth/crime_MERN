import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Assets/Styles/CitizenRegistration.css";
import axiosInstance from "../Constants/BaseUrl";
import { useFormik } from "formik";
import { CitizenRegistrationSchema } from "../Constants/Schema";
import { toast } from "react-toastify";

const districts = [
  "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
  "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
  "Thiruvananthapuram", "Thrissur", "Wayanad"
];

function CitizenRegistration() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const onSubmit = (e) => {
    // e.preventDefault();
    const { confirmPassword, ...dataToSend } = values;

    axiosInstance.post('/registerCitizen', dataToSend)
      .then((res) => {
        console.log('working', res);
        if (res.data.status == 200) {
          axiosInstance.post('/loginCitizen', { email: dataToSend.email, password: dataToSend.password })
            .then((res) => {
              console.log('working', res);
              if (res.data.status === 200) {
                localStorage.setItem('citizenToken', res.data.data._id);
                toast.success("Registration Successful");
                navigate('/citizen_login');
              } else if (res.data.status === 405) {
                toast.warning(res.data.msg);
              } else {
                toast.error('Registration Failed');
              }
            })
            .catch((err) => {
              toast.error('Login Failed');
            });

        } else if (res.data.status == 409) {
          toast.warning(res.data.msg)
        } else {
          toast.error('Registration Failed')
        }
      })
      .catch((err) => {
        toast.error('Registration Failed')
      })
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstname: "",
        lastname: "",
        contact: "",
        email: "",
        dob: "",
        aadhar: "",
        password: "",
        housename: "",
        street: "",
        district: "", // new field
        nationality: "",
        pincode: "",
        gender: "",
        confirmPassword: ""
      },
      validationSchema: CitizenRegistrationSchema,
      onSubmit,
    });

  return (
    <div>
      <div className="container">
        <div className="row citizen_reg_box">
          <div className="col-lg-5 col-md-4 col-sm-6 citizen_reg_left"></div>
          <div className="col-lg-7 col-md-8 col-sm-6 citizen_reg_right">
            <h2 className="citizen_reg_title">Citizen Registration</h2>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="citizen_reg_input_grp row">
                <div className="col-6">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="firstname"
                    placeholder="First Name"
                    name="firstname"
                    value={values.firstname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstname && touched.firstname && (
                    <span className="text-danger">{errors.firstname}</span>
                  )}
                </div>

                <div className="col-6">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Second Name"
                    name="lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastname && touched.lastname && (
                    <span className="text-danger">{errors.lastname}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="email"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>

                <div className="col-6 d-flex justify-content-between mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={values.gender === "male"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-check-label">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={values.gender === "female"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-check-label">
                      Female
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value="others"
                      checked={values.gender === "others"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="form-check-label">
                      Others
                    </label>
                  </div>
                  {errors.gender && touched.gender && (
                    <span className="text-danger">{errors.gender}</span>
                  )}
                </div>

                <div className="col-6 d-flex justify-content-between mt-2">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    max={today}
                  />
                  {errors.dob && touched.dob && (
                    <span className="text-danger">{errors.dob}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="number"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Contact"
                    name="contact"
                    value={values.contact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.contact && touched.contact && (
                    <span className="text-danger">{errors.contact}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Aadhaar"
                    name="aadhar"
                    value={values.aadhar}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.aadhar && touched.aadhar && (
                    <span className="text-danger">{errors.aadhar}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="House Name"
                    name="housename"
                    value={values.housename}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.housename && touched.housename && (
                    <span className="text-danger">{errors.housename}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Street Name"
                    name="street"
                    value={values.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.street && touched.street && (
                    <span className="text-danger">{errors.street}</span>
                  )}
                </div>

                <div className="col-6 mt-2">
                  <select
                    className="form-control user_inp"
                    id="district"
                    value={values.district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="district"
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && touched.district && (
                    <span className="text-danger">{errors.district}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Nationality"
                    value={values.nationality}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="nationality"
                  />
                  {errors.nationality && touched.nationality && (
                    <span className="text-danger">{errors.nationality}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="number"
                    className="form-control user_inp"
                    id="pincode"
                    placeholder="Pincode"
                    value={values.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="pincode"
                  />
                  {errors.pincode && touched.pincode && (
                    <span className="text-danger">{errors.pincode}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="password"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                  />
                  {errors.password && touched.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="password"
                    className="form-control user_inp"
                    id="exampleFormControlInput1"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    name="confirmPassword"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <span className="text-danger">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
                <div className="col-12 mt-2">
                  <button
                    type="submit"
                    className="button_bg w-100 mt-3"
                  >
                    Sign Up
                  </button>
                </div>

                <p className="citizen_reg_log_link fs-6">
                  Already have an account?{" "}
                  <Link to="/citizen_login">Login now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CitizenRegistration;
