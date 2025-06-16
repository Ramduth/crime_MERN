import React, { useEffect, useState } from "react";
import "../../Assets/Styles/CitizenProfile.css";
import { useFormik } from "formik";
import { CitizenRegistrationSchema } from "../Constants/Schema";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const districts = [
  "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
  "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
  "Thiruvananthapuram", "Thrissur", "Wayanad"
];

function CitizenProfile() { 
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (localStorage.getItem("citizenToken") == null) {
      navigate("/");
    }
  }, [navigate]);

  const id = localStorage.getItem('citizenToken');

  useEffect(() => {
    axiosInstance
      .post(`/viewCitizenById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, [id]);

  const onSubmit = (values) => {
    const { confirmPassword, ...dataToSend } = values;

    axiosInstance
      .post(`/editCitizenById/${id}`, dataToSend)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Updated Successfully");
        } else {
          toast.warning(res.data.msg);
        }
      })
      .catch((err) => {
        toast.error("Updation Failed");
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const formattedDate = userDetails.dob ? formatDate(userDetails.dob) : "";

  const initialUserDetails = {
    firstname: userDetails.firstname || '',
    lastname: userDetails.lastname || '',
    email: userDetails.email || '',
    dob: formattedDate,
    contact: userDetails.contact || '',
    aadhar: userDetails.aadhar || '',
    password: userDetails.password || '',
    housename: userDetails.housename || '',
    street: userDetails.street || '',
    district: userDetails.district || '',
    nationality: userDetails.nationality || '',
    pincode: userDetails.pincode || '',
    gender: userDetails.gender || '',
    confirmPassword: userDetails.password || '',
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialUserDetails,
    validationSchema: CitizenRegistrationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <div className="citizen_profile">
      <div className="citizen_profile_head navbar_bg">
        <div className="container citizen_profile_title d-flex justify-content-between">
          <div className="citizen_profile_name">
            <h4>PROFILE</h4>
            <p>{values.firstname} {values.lastname}</p>
          </div>
        </div>
      </div>
      <div className="container citizen_profile_body">
        <form onSubmit={handleSubmit}>
          <div className="row">
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
                id="lastname"
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
                id="email"
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
            <div className="col-6 mt-2">
              <label>Date of Birth</label>
              <input
                type="date"
                className="form-control user_inp"
                id="dob"
                name="dob"
                max={today}
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.dob && touched.dob && (
                <span className="text-danger">{errors.dob}</span>
              )}
            </div>
            <div className="col-6 mt-2">
              <input
                type="number"
                className="form-control user_inp"
                id="contact"
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
                id="aadhar"
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
                id="housename"
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
                id="street"
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
                name="district"
                value={values.district}
                onChange={handleChange}
                onBlur={handleBlur}
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
                id="nationality"
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
            <div className="col-12 mt-2 text-center">
              <button type="submit" className="button_bg w-25 mt-3">
                Update
              </button>
              {errors.gender && touched.gender && (
                <span className="text-danger">{errors.gender}</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CitizenProfile;
