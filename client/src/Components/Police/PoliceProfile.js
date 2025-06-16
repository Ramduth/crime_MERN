import React, { useEffect, useState } from 'react';
import './Police.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';
import { toast } from 'react-toastify';
import station from '../../Assets/Images/policestation.png';

const districts = [
  "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
  "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
  "Thiruvananthapuram", "Thrissur", "Wayanad"
];

function PoliceProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [formData, setFormData] = useState({
    policestationname: '',
    policestationcode: '',
    stationchargeofficers: '',
    totalofficers: '',
    aadhar: '',
    password: '',
    address: '',
    contact: '',
    district: '',
    email: '',
    idProof: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("policeId")) {
      navigate("/");
    }
  }, [navigate]);

  const id = localStorage.getItem('policeId');

  useEffect(() => {
    axiosInstance.post(`/viewpolice/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setUserDetails(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
        console.error("Error fetching police details:", err);
      });
  }, [id]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        policestationname: userDetails.policestationname || '',
        policestationcode: userDetails.policestationcode || '',
        stationchargeofficers: userDetails.stationchargeofficers || '',
        totalofficers: userDetails.totalofficers || '',
        aadhar: userDetails.aadhar || '',
        password: userDetails.password || '',
        address: userDetails.address || '',
        contact: userDetails.contact || '',
        district: userDetails.district || '',
        email: userDetails.email || '',
        idProof: null,
      });
    }
  }, [userDetails]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        img: prevState.img || formData.img,
      }));
    }
    setErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  function validateField(fieldName, value) {
    if (typeof value === 'string' && !value.trim()) {
      return `${fieldName} is required`;
    }
    if (!value) {
      return `${fieldName} is required`;
    }
    return '';
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    let errors = {};
    let formIsValid = true;

    // Validate each field
    errors.policestationname = validateField('Police Station Name', formData.policestationname);
    errors.policestationcode = validateField('Police Station Code', formData.policestationcode);
    errors.stationchargeofficers = validateField('Station Charge Officers', formData.stationchargeofficers);
    errors.totalofficers = validateField('Total Officers', formData.totalofficers);
    errors.address = validateField('Address', formData.address);
    errors.contact = validateField('Contact', formData.contact);
    errors.district = validateField('District', formData.district);
    errors.email = validateField('Email', formData.email);

    setErrors(errors);

    for (let key in errors) {
      if (errors[key]) {
        formIsValid = false;
        break;
      }
    }

    if (formIsValid) {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === 'idProof' && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      try {
        const res = await axiosInstance.post(`/editPoliceById/${id}`, formDataToSend);
        if (res.data.status === 200) {
          toast.success("Updated Successfully");
        } else {
          toast.warning(res.data.msg);
        }
      } catch (error) {
        toast.error("Updation Failed");
        console.error("Error updating police details:", error);
      }
    }
  };

  return (
    <div className="citizen_profile">
      <div className="citizen_profile_head navbar_bg">
        <div className="container citizen_profile_title d-flex justify-content-between">
          <div className="citizen_profile_name">
            <h4>PROFILE</h4>
            <p>{formData.policestationname}</p>
          </div>
        </div>
      </div>
      <div className="container citizen_profile_body">
        <form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-6'>
              <img src={station} className='img-fluid' alt="station" style={{ height: '300px' }} />
            </div>
            <div className='col-6'>
              <div className="row">
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="policestationname"
                    placeholder="Police Station Name"
                    name="policestationname"
                    value={formData.policestationname}
                    onChange={handleChange}
                  />
                  {errors.policestationname && (
                    <span className="text-danger">{errors.policestationname}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="policestationcode"
                    placeholder="Police Station Code"
                    name="policestationcode"
                    value={formData.policestationcode}
                    onChange={handleChange}
                  />
                  {errors.policestationcode && (
                    <span className="text-danger">{errors.policestationcode}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="address"
                    placeholder="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <span className="text-danger">{errors.address}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="stationchargeofficers"
                    placeholder="Station Charge Officers"
                    name="stationchargeofficers"
                    value={formData.stationchargeofficers}
                    onChange={handleChange}
                  />
                  {errors.stationchargeofficers && (
                    <span className="text-danger">{errors.stationchargeofficers}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="number"
                    className="form-control user_inp"
                    id="contact"
                    placeholder="Contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                  />
                  {errors.contact && (
                    <span className="text-danger">{errors.contact}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <input
                    type="text"
                    className="form-control user_inp"
                    id="totalofficers"
                    placeholder="Total Officers"
                    name="totalofficers"
                    value={formData.totalofficers}
                    onChange={handleChange}
                  />
                  {errors.totalofficers && (
                    <span className="text-danger">{errors.totalofficers}</span>
                  )}
                </div>
                <div className="col-6 mt-2">
                  <select
                    className="form-control user_inp"
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <span className="text-danger">{errors.district}</span>
                  )}
                </div>
                <div className="col-12 mt-2">
                  <input
                    type="email"
                    className="form-control user_inp"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="col-12 mt-2 text-center">
                  <button type="submit" className="button_bg w-25 mt-3">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PoliceProfile;
