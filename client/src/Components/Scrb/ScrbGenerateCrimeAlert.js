import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import { Link } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

function ScrbGenerateCrimeAlert() {
  const [data, setData] = useState([]);
  // const [district, setDistrict] = useState([]);
  const [policeStations, setPoliceStations] = useState([]);
  const [caseTypes, setCaseTypes] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPoliceStation, setSelectedPoliceStation] = useState("");
  const [selectedCaseType, setSelectedCaseType] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const district = [
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

  const getData = () => {
    axiosInstance
      .post("/viewallcrime")
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getPoliceStations = () => {
    axiosInstance
      .post(`/viewPoliceByDistrict/${selectedDistrict}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setPoliceStations(res.data.data || []);
          axiosInstance
            .post("/viewCrimesbyDisrtict", { district: selectedDistrict })
            .then((res) => {
              console.log(res);
              if (res.data.status === 200) {
                setData(res.data.data || []);
              } else {
                setData([]);
              }
            })
            .catch((err) => {
              console.log("Error", err);
            });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getCaseTypes = () => {
    console.log("psId", selectedPoliceStation);
    axiosInstance
      .post("/viewCaseTypesbyFilter", {
        psId: selectedPoliceStation,
        district: selectedDistrict,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setCaseTypes(res.data.data || []);
          axiosInstance
            .post(`/viewAprvdCrimeByPolicStationId/${selectedPoliceStation}`)
            .then((res) => {
              console.log(res);
              if (res.data.status === 200) {
                setData(res.data.data || []);
              } else {
                setData([]);
              }
            })
            .catch((err) => {
              console.log("Error", err);
            });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const getCrimeByType = () => {
    axiosInstance
      .post("/viewCrimesByDistrictPSIDAndType", {
        psId: selectedPoliceStation,
        district: selectedDistrict,
        caseType: selectedCaseType,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getCaseTypes();
  }, [selectedPoliceStation]);

  useEffect(() => {
    getCrimeByType();
  }, [selectedCaseType]);

  useEffect(() => {
    if (selectedDistrict) {
      getPoliceStations(selectedDistrict);
    } else {
      setPoliceStations([]);
    }
    getData();
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedPoliceStation && selectedDistrict && selectedCaseType) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedPoliceStation, selectedDistrict, selectedCaseType]);

  const submit = (target) => {
    console.log(target);
    axiosInstance
      .post("/addNotification", {
        target: target,
        psId: selectedPoliceStation,
        district: selectedDistrict,
        caseType: selectedCaseType,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success(`Alert sent to ${target}`);
        } else {
          setData([]);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="pt-5">
          <h4 className="scrb-dash-h4">Welcome SCRB</h4>
          <p className="scrb-dash-para">All Systems are running smoothly</p>
        </div>
        <div className="text-center mt-5 text-danger">
          <div className="row">
            <h5>View All CasesSSSSSSSSSSS</h5>
          </div>
          <div className="row m-3">
            <div className="col-md-3 text-black align-left">Filter by</div>
            <div className="col-md-3">
              <select
                className="form-select text-black"
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {district.map((district) => (
                  <option value={district}>{district}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                onChange={(e) => setSelectedPoliceStation(e.target.value)}
              >
                <option value="">Select Police Station</option>
                {policeStations.map((station) => (
                  <option value={station._id}>
                    {station.policestationname}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                onChange={(e) => setSelectedCaseType(e.target.value)}
              >
                <option value="">Case Type</option>
                {caseTypes.map((caseType) => (
                  <option value={caseType}>{caseType}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-md-6 text-black">
              Filtered Case Details({data.length})
            </div>
            <div className="col-md-6">
              <div className="dropdown">
                <button
                  className="btn btn-danger dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={isButtonDisabled}
                >
                  Generate Alert
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => {
                        submit("all");
                      }}
                    >
                      All
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => {
                        submit("police");
                      }}
                    >
                      Police Station
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      onClick={() => {
                        submit("users");
                      }}
                    >
                      Users
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          {data.length === 0 && <h1>No Data Found</h1>}
          {data.length > 0 && (
            <table className="table table-bordered table-striped mt-4">
              <thead className="text-center newpolice-stationreq-thead">
                <tr>
                  <th scope="col">Sl/No</th>
                  <th scope="col">PoliceStation Name</th>
                  <th scope="col">Victim Name</th>
                  <th scope="col">Type of Crime</th>
                  <th scope="col">Witness Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Location</th>
                  <th scope="col">View Details</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.map((caseview, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{caseview.psId && caseview.psId.policestationname ? caseview.psId.policestationname : 'Not Assigned'}</td>
                    <td>{caseview.victimName}</td>
                    <td>{caseview.caseType}</td>
                    <td>{caseview.witnessName}</td>
                    <td>{caseview.incidentDate.slice(0, 10)}</td>
                    <td>{caseview.incidentLocation}</td>
                    <td>
                      <Link to={`/scrb_viewcasedetails/${caseview._id}`}>
                        <button className="viewallpolicest_icon">
                          <IoEyeSharp />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ScrbGenerateCrimeAlert;
