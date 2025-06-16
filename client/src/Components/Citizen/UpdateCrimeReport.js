import React, { useEffect, useState } from "react";
import CaseDetails from "../Police/CaseDetails";
import { useParams } from "react-router-dom";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function UpdateCrimeReport() {
  const { id } = useParams();
  const [viewPoliceStation, setViewPoliceStation] = useState([]);
  const [data, setData] = useState({
    policestationname: "",
    victimname: "",
    victimgender: "",
    victimemail: "",
    victimaddress: "",
    incidentdate: "",
    incidenttime: "",
    incidentlocation: "",
    incidentcity: "",
    crimetype: "",
    crimeitem: "",
    witnessname: "",
    witnesscontact: "",
    witnessaddress: "",
    witnessstatement: "",
    numofsuspect: "",
    physicaldescription: "",
    evidencedescription: "",
    comments: "",
    audioevidence: null,
    videoevidence: null,
    photoevidence: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .post("/viewPolices")
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          setViewPoliceStation(response.data.data);
        } else {
          console.log("No data obtained");
        }
      })
      .catch((error) => {
        console.error("Error fetching furniture data:", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .post(`/viewCrimeById/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch user details");
      });
  }, [id]);

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
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContact = (contact) => {
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formIsValid = true;
    let newErrors = {};

    if (!data.policestationname) {
      newErrors.policestationname = "Police station name is required";
      formIsValid = false;
    }

    if (!data.victimname) {
      newErrors.victimname = "Victim name is required";
      formIsValid = false;
    }

    if (!data.incidentdate) {
      newErrors.incidentdate = "Incident Date is required";
      formIsValid = false;
    }
    if (!data.incidenttime) {
      newErrors.incidenttime = "Incident time is required";
      formIsValid = false;
    }
    if (!data.incidentlocation) {
      newErrors.incidentlocation = "Incident Location is required";
      formIsValid = false;
    }
    if (!data.crimetype) {
      newErrors.crimetype = "Crime Type is required";
      formIsValid = false;
    }

    if (!validateEmail(data.victimemail)) {
      newErrors.victimemail = "Invalid email format";
      formIsValid = false;
    }

    if (!validateContact(data.witnesscontact)) {
      newErrors.witnesscontact = "Invalid contact number";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      const formData = new FormData();
      formData.append("policestationname", data.policestationname);
      formData.append("victimname", data.victimname);
      formData.append("victimgender", data.victimgender);
      formData.append("victimemail", data.victimemail);
      formData.append("victimaddress", data.victimaddress);
      formData.append("incidentdate", data.incidentdate);
      formData.append("incidenttime", data.incidenttime);
      formData.append("incidentlocation", data.incidentlocation);
      formData.append("incidentcity", data.incidentcity);
      formData.append("crimetype", data.crimetype);
      formData.append("crimeitem", data.crimeitem);
      formData.append("witnessname", data.witnessname);
      formData.append("witnesscontact", data.witnesscontact);
      formData.append("witnessaddress", data.witnessaddress);
      formData.append("witnessstatement", data.witnessstatement);
      formData.append("numofsuspect", data.numofsuspect);
      formData.append("physicaldescription", data.physicaldescription);
      formData.append("evidencedescription", data.evidencedescription);
      formData.append("comments", data.comments);
      formData.append("audioevidence", data.audioevidence);
      formData.append("videoevidence", data.videoevidence);
      formData.append("photoevidence", data.photoevidence);

      try {
        console.log("data", data);
        const response = await axiosInstance.post(
          `/editCrimeById/${id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.status === 200) {
          toast.success("Crime Updates Successfully");
        } else {
          toast.error("Case Not Added");
        }
      } catch (error) {
        toast.error("Error", error);
      }
    }
  };

  return (
    <div>
      <div className="mb-5">
        <form onSubmit={handleSubmit}>
          <div className="text-center text-danger mt-5 mb-5">
            <h4 className="report-crime-h4">Report a Crime</h4>
          </div>
          <div className="report-crime-box container mt-5">
            <div className="container mt-5">
              <select
                className="report-crime-textbox ps-3"
                name="policestationname"
                onChange={handleChange}
                value={data.policestationname}
              >
                <option value="" disabled>
                  Select a Police Station
                </option>
                {viewPoliceStation.map((station, index) => (
                  <option key={index} value={station.policestationname}>
                    {station.policestationname}
                  </option>
                ))}
              </select>
              {errors.policestationname && (
                <div className="text-danger">{errors.policestationname}</div>
              )}
            </div>
            <div className=" text-center ">
              <div className="report-crime-victim  mt-4 pt-2">
                <span className="report-crime-victim-span">
                  Victim Information
                </span>
              </div>
            </div>
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Name</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="victimname"
                    onChange={handleChange}
                    value={data.victimname}
                  ></input>
                  {errors.victimname && (
                    <div className="text-danger">{errors.victimname}</div>
                  )}
                </div>
                <div className="mt-3">
                  <label>Email</label>
                </div>
                <div>
                  <input
                    type="email"
                    className="report-crime-textbox ps-3"
                    name="victimemail"
                    onChange={handleChange}
                    value={data.victimemail}
                  ></input>
                  {errors.victimemail && (
                    <div className="text-danger">{errors.victimemail}</div>
                  )}
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Gender</label>
                </div>
                <div className="mt-2">
                  <select
                    className="report-crime-textbox ps-3"
                    name="victimgender"
                    onChange={handleChange}
                    value={data.victimgender}
                  >
                    <option selected>Open this select menu</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="mt-3">
                  <label>Address</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="victimaddress"
                    onChange={handleChange}
                    value={data.victimaddress}
                  ></input>
                </div>
              </div>
            </div>
            <div className=" text-center ">
              <div className="report-crime-victim  mt-4 pt-2">
                <span className="report-crime-victim-span">
                  Incident Details
                </span>
              </div>
            </div>
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Date</label>
                </div>
                <div className="mt-2">
                  <input
                    type="date"
                    className="report-crime-textbox ps-3"
                    name="incidentdate"
                    onChange={handleChange}
                    value={data.incidentdate}
                  ></input>
                  {errors.incidentdate && (
                    <div className="text-danger">{errors.incidentdate}</div>
                  )}
                </div>
                <div className="mt-3">
                  <label>Location</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="incidentlocation"
                    onChange={handleChange}
                    value={data.incidentlocation}
                  ></input>
                  {errors.incidentlocation && (
                    <div className="text-danger">{errors.incidentlocation}</div>
                  )}
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Time</label>
                </div>
                <div className="mt-2">
                  <input
                    type="time"
                    className="report-crime-textbox ps-3"
                    name="incidenttime"
                    onChange={handleChange}
                    value={data.incidenttime}
                  ></input>
                  {errors.incidenttime && (
                    <div className="text-danger">{errors.incidenttime}</div>
                  )}
                </div>
                <div className="mt-3">
                  <label>City</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="incidentcity"
                    onChange={handleChange}
                    value={data.incidentcity}
                  ></input>
                </div>
              </div>
            </div>
            <div className=" text-center ">
              <div className="report-crime-victim  mt-4 pt-2">
                <span className="report-crime-victim-span">Crime Details</span>
              </div>
            </div>
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Select Type </label>
                </div>
                <div className="mt-2">
                  <select
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="crimetype"
                    onChange={handleChange}
                    value={data.crimetype}
                  >
                    <option selected>Open this select menu</option>
                    <option value="theft">Theft</option>
                    <option value="burglary">Burglary</option>
                    <option value="robbery">Robbery</option>
                    <option value="assault">Assault</option>
                    <option value="vandalism">Vandalism</option>
                    <option value="fraud">Fraud</option>
                  </select>
                  {errors.crimetype && (
                    <div className="text-danger">{errors.crimetype}</div>
                  )}
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Item Stolen </label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="crimeitem"
                    onChange={handleChange}
                    value={data.crimeitem}
                  ></input>
                </div>
              </div>
            </div>
            <div className=" text-center ">
              <div className="report-crime-victim  mt-4 pt-2">
                <span className="report-crime-victim-span">
                  Evidence Details
                </span>
              </div>
            </div>
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Upload Audio</label>
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    className="report-crime-textbox file_border ps-3 p-1"
                    name="audioevidence"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mt-3">
                  <label>Upload Photos</label>
                </div>
                <div>
                  <input
                    type="file"
                    className="report-crime-textbox file_border ps-3 p-1"
                    name="photoevidence"
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Upload Video</label>
                </div>
                <div className="mt-2">
                  <input
                    type="file"
                    className="report-crime-textbox file_border ps-3 p-1"
                    name="videoevidence"
                    onChange={handleChange}
                  ></input>
                </div>
                <div className="mt-3">
                  <label>Description</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="evidencedescription"
                    onChange={handleChange}
                    value={data.evidencedescription}
                  ></input>
                </div>
              </div>
            </div>
            <div className=" text-center ">
              <div className="report-crime-victim  mt-4 pt-2">
                <span className="report-crime-victim-span">
                  Witness Details
                </span>
              </div>
            </div>
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Witness Name</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="witnessname"
                    onChange={handleChange}
                    value={data.witnessname}
                  ></input>
                </div>
                <div className="mt-3">
                  <label>Address</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="witnessaddress"
                    onChange={handleChange}
                    value={data.witnessaddress}
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Contact</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="witnesscontact"
                    onChange={handleChange}
                    value={data.witnesscontact}
                  ></input>
                  {errors.witnesscontact && (
                    <div className="text-danger">{errors.witnesscontact}</div>
                  )}
                </div>
                <div className="mt-3">
                  <label>Witness Statement</label>
                </div>
                <div>
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="witnessstatement"
                    onChange={handleChange}
                    value={data.witnessstatement}
                  ></input>
                </div>
              </div>
            </div>
            <div className=" text-center ">
              <div className="report-crime-victim  mt-4 pt-2">
                <span className="report-crime-victim-span">
                  Suspect Information
                </span>
              </div>
            </div>
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>No of Supects</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="numofsuspect"
                    onChange={handleChange}
                    value={data.numofsuspect}
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Physical Description</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="physicaldescription"
                    onChange={handleChange}
                    value={data.physicaldescription}
                  ></input>
                </div>
              </div>
            </div>
            <div className=" text-center ">
              <div className="report-crime-victim  mt-4 pt-2">
                <span className="report-crime-victim-span">
                  Additional Inforamtion
                </span>
              </div>
            </div>
            <div className="container mt-4">
              <div>
                <label>Comments</label>
              </div>
              <div>
                <input
                  type="text"
                  className="report-crime-textbox1 mt-2 ps-3"
                  name="comments"
                  onChange={handleChange}
                  value={data.comments}
                ></input>
              </div>
            </div>
            <div className="text-center mt-5">
              <button type="submit" className="report-crime-crimebtn">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateCrimeReport;
