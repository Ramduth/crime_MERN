import React, { useEffect, useState } from "react";
import "../../Assets/Styles/CitizenLogin.css";
import axiosInstance from "../Constants/BaseUrl";
import { toast } from "react-toastify";

function ReportCrime() {
  const [formData, setFormData] = useState({
    district: "",
    psId: "",
    victimName: "",
    victimGender: "",
    victimEmail: "",
    victimAddress: "",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    incidentCity: "",
    witnessName: "",
    witnessContact: "",
    witnessAddress: "",
    witnessStatement: "",
    caseDescription: "",
    caseType: "",
    theftStolenItems: "",
    theftStolenSuspected: "",
    assaultInjuries: "",
    assaultMedicalAttention: "",
    vandalismDescription: "",
    vandalismCostOfDamage: "",
    missingPersonName: "",
    missingPersonDescription: "",
    domesticViolenceDescription: "",
    domesticViolenceInjuries: "",
    fraudDescription: "",
    fraudFinancialLoss: "",
    others: "",
    files: [],
    citizenId: localStorage.getItem('citizenToken')
  });

  const [viewPoliceStation, setViewPoliceStation] = useState([]);
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [CaseTypeSuggestions, setCaseTypeSuggestions] = useState([]);
  const [image, setImage] = useState([]);

  const districts = [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
    "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
    "Thiruvananthapuram", "Thrissur", "Wayanad"
  ];

  const caseTypes = [
    "Theft", "Assault", "Vandalism", "Missing Person", "Domestic Violence",
    "Fraud", "Others"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCaseTypeChange = (e) => {
    handleChange(e);
    setSelectedCaseType(e.target.value);
  };

  const handleFileChange = (e) => {
    setImage([...e.target.files]);
  };

  const resetForm = () => {
    setFormData({
      district: "",
      psId: "",
      victimName: "",
      victimGender: "",
      victimEmail: "",
      victimAddress: "",
      incidentDate: "",
      incidentTime: "",
      incidentLocation: "",
      incidentCity: "",
      witnessName: "",
      witnessContact: "",
      witnessAddress: "",
      witnessStatement: "",
      caseDescription: "",
      caseType: "",
      theftStolenItems: "",
      theftStolenSuspected: "",
      assaultInjuries: "",
      assaultMedicalAttention: "",
      vandalismDescription: "",
      vandalismCostOfDamage: "",
      missingPersonName: "",
      missingPersonDescription: "",
      domesticViolenceDescription: "",
      domesticViolenceInjuries: "",
      fraudDescription: "",
      fraudFinancialLoss: "",
      others: "",
      files: [],
      citizenId: localStorage.getItem('citizenToken')
    });
    setImage([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key !== "files") {
        data.append(key, formData[key]);
      }
    });
    image.forEach((file) => {
      data.append("files", file);
    });

    axiosInstance
      .post("/addcrime", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if(res.data.status==200){
          toast.success("Crime reported successfully");
          resetForm();
        }else{
          toast.warning("Something went wrong");
        }
        
      })
      .catch((err) => {
        console.log("Failed to report crime", err);
        toast.error("Failed to report crime");
      });
  };

  useEffect(() => {
    if (formData.district) {
      axiosInstance
        .post(`/viewPoliceByDistrict/${formData.district}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setViewPoliceStation(res.data.data || []);
          }
        })
        .catch((err) => {
          console.log("Failed to fetch police stations", err);
        });
    }
  }, [formData.district]);

  useEffect(() => {
    if (formData.caseDescription) {
      axiosInstance
        .post(`/getCaseType`, { caseDescription: formData.caseDescription })
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setCaseTypeSuggestions(res.data.data || []);
          }
        })
        .catch((err) => {
          console.log("Failed to fetch case type suggestions", err);
        });
    }
  }, [formData.caseDescription]);

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit}>
        <div className="text-center text-danger mt-5 mb-5">
          <h4 className="report-crime-h4">Report a Crime</h4>
        </div>
        <div className="report-crime-box container mt-5">
          <div className="container mt-5">
            <div className="row">
              <div className="col-6">
                <select
                  className="report-crime-textbox ps-3"
                  name="district"
                  value={formData.district}
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
              </div>
              <div className="col-6">
                <select
                  className="report-crime-textbox ps-3"
                  name="psId"
                  value={formData.psId}
                  onChange={handleChange}
                  required
                >
                  <option>Select Police Station</option>
                  {viewPoliceStation.map((station, index) => (
                    <option key={index} value={station._id}>
                      {station.policestationname}
                    </option>
                  ))}
                </select>
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
                <label>Case Description </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  className="report-crime-textbox ps-3"
                  name="caseDescription"
                  value={formData.caseDescription}
                  onChange={handleChange}
                  required
                ></input>
              </div>
            </div>
            <div className="col mt-3">
              <div>
                <label>Select Type </label>
              </div>
              <div className="mt-2">
                <select
                  className="report-crime-textbox ps-3"
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleCaseTypeChange}
                  required
                >
                  <option>Select Type</option>
                  {caseTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex">
                {CaseTypeSuggestions.length
                  ? CaseTypeSuggestions.map((e, i) => (
                      <p key={i} className="bg-danger rounded p-1 px-2 text-light mx-1 mt-2">
                        {e}
                      </p>
                    ))
                  : ""}
              </div>
            </div>
          </div>
          {selectedCaseType === "Theft" && (
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Stolen Items</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="theftStolenItems"
                    value={formData.theftStolenItems}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Suspected Perpetrator (Description)</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="theftStolenSuspected"
                    value={formData.theftStolenSuspected}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
          )}
          {selectedCaseType === "Assault" && (
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Injuries Sustained (Description)</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="assaultInjuries"
                    value={formData.assaultInjuries}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Medical Attention Received (Details)</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="assaultMedicalAttention"
                    value={formData.assaultMedicalAttention}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
          )}
          {selectedCaseType === "Vandalism" && (
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Damage Description</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="vandalismDescription"
                    value={formData.vandalismDescription}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Estimated Cost of Damage</label>
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    className="report-crime-textbox ps-3"
                    name="vandalismCostOfDamage"
                    value={formData.vandalismCostOfDamage}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
          )}
          {selectedCaseType === "Missing Person" && (
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Missing Person's Name</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="missingPersonName"
                    value={formData.missingPersonName}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Missing Person's Description</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="missingPersonDescription"
                    value={formData.missingPersonDescription}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
          )}
          {selectedCaseType === "Domestic Violence" && (
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Incident Description</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="domesticViolenceDescription"
                    value={formData.domesticViolenceDescription}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Injuries Sustained</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="domesticViolenceInjuries"
                    value={formData.domesticViolenceInjuries}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
          )}
          {selectedCaseType === "Fraud" && (
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Fraud Description</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="fraudDescription"
                    value={formData.fraudDescription}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
              <div className="col mt-3">
                <div>
                  <label>Estimated Financial Loss</label>
                </div>
                <div className="mt-2">
                  <input
                    type="number"
                    className="report-crime-textbox ps-3"
                    name="fraudFinancialLoss"
                    value={formData.fraudFinancialLoss}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
          )}
          {selectedCaseType === "Others" && (
            <div className="row container">
              <div className="col mt-3">
                <div>
                  <label>Description</label>
                </div>
                <div className="mt-2">
                  <input
                    type="text"
                    className="report-crime-textbox ps-3"
                    name="others"
                    value={formData.others}
                    onChange={handleChange}
                    required
                  ></input>
                </div>
              </div>
            </div>
          )}

<div className="text-center ">
            <div className="report-crime-victim mt-4 pt-2">
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
                  name="victimName"
                  value={formData.victimName}
                  onChange={handleChange}
                  required
                ></input>
                
              </div>
              <div className="mt-3">
                <label>Email</label>
              </div>
              <div>
                <input
                  type="email"
                  className="report-crime-textbox ps-3"
                  name="victimEmail"
                  value={formData.victimEmail}
                  onChange={handleChange}
                  required
                ></input>
              
              </div>
            </div>
            <div className="col mt-3">
              <div>
                <label>Gender</label>
              </div>
              <div className="mt-2">
                <select
                  className="report-crime-textbox ps-3"
                  name="victimGender"
                  value={formData.victimGender}
                  onChange={handleChange}
                  required
                >
                  <option>Select Gender</option>
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
                  name="victimAddress"
                  value={formData.victimAddress}
                  onChange={handleChange}
                  required
                ></input>
              
              </div>
            </div>
          </div>
          <div className=" text-center ">
            <div className="report-crime-victim  mt-4 pt-2">
              <span className="report-crime-victim-span">Incident Details</span>
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
  name="incidentDate"
  value={formData.incidentDate}
  onChange={handleChange}
  max={new Date().toISOString().split("T")[0]} // Sets the max attribute to today's date
  required
></input>
                
              </div>
              <div className="mt-3">
                <label>Location</label>
              </div>
              <div>
                <input
                  type="text"
                  className="report-crime-textbox ps-3"
                  name="incidentLocation"
                  value={formData.incidentLocation}
                  onChange={handleChange}
                  required
                ></input>
             
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
                  name="incidentTime"
                  value={formData.incidentTime}
                  onChange={handleChange}
                  required
                ></input>
              
              </div>
              <div className="mt-3">
                <label>City</label>
              </div>
              <div>
                <input
                  type="text"
                  className="report-crime-textbox ps-3"
                  name="incidentCity"
                  value={formData.incidentCity}
                  onChange={handleChange}
                  required
                ></input>
              
              </div>
            </div>
          </div>
          <div className=" text-center ">
            <div className="report-crime-victim  mt-4 pt-2">
              <span className="report-crime-victim-span">Evidence Details</span>
            </div>
          </div>

          <div className="container mt-5">
            <div className="row">
              <div className="col-6">
                <label htmlFor="file">Upload Files</label>
                <input
                  type="file"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                  required
                /><br/>
<label htmlFor="file"><small className="text-warning" >( Supported Formats - jpg, jpeg, mp4, mp3. Accepts only 5 files )</small></label>

              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="report-crime-victim mt-4 pt-2">
              <span className="report-crime-victim-span">Witness Details</span>
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
                  name="witnessName"
                  value={formData.witnessName}
                  onChange={handleChange}
                  required
                />
              
              </div>
              <div className="mt-3">
                <label>Address</label>
              </div>
              <div>
                <input
                  type="text"
                  className="report-crime-textbox ps-3"
                  name="witnessAddress"
                  value={formData.witnessAddress}
                  onChange={handleChange}
                  required
                />
               
              </div>
            </div>
            <div className="col mt-3">
              <div>
                <label>Contact</label>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  className="report-crime-textbox ps-3"
                  name="witnessContact"
                  value={formData.witnessContact}
                  onChange={handleChange}
                  required
                />
               
              </div>
              <div className="mt-3">
                <label>Witness Statement</label>
              </div>
              <div>
                <input
                  type="text"
                  className="report-crime-textbox ps-3"
                  name="witnessStatement"
                  value={formData.witnessStatement}
                  onChange={handleChange}
                  required
                />
                
              </div>
            </div>
          </div>


          <div className="container mt-5">
            <div className="row">
              <div className="col text-center">
                <button className="btn btn-danger mb-3" type="submit">
                  Report Crime
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ReportCrime;
