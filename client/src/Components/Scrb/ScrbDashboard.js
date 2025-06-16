import React, { useEffect, useState } from "react";
import axiosInstance from "../Constants/BaseUrl";
import ScrbBarChart from "./ScrbBarChart";

function ScrbDashboard() {
  const [citizen, setCitizen] = useState([]);
  const [policeStation, setPoliceStation] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    axiosInstance.post("/viewCitizens").then((response) => {
      console.log(response);
      if (response.data.data != null) setCitizen(response.data.data);
      else setCitizen([]);
    });
    axiosInstance.post("/viewallcrime").then((response) => {
      console.log(response);
      if (response.data.data != null) setPoliceStation(response.data.data);
      else setPoliceStation([]);
    });
    axiosInstance.post("/viewPolices").then((response) => {
      console.log(response);
      if (response.data.data != null) setCrimes(response.data.data);
      else setCrimes([]);
    });
    
  }, []);

  const [crimeAlerts,setCrimeAlerts]=useState([])

      useEffect(()=>{
        axiosInstance
        .post("/viewAllNotifications")
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            setCrimeAlerts(res.data.data || []);
          } else {
            setCrimeAlerts([]);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
      },[])

  return (
    <div>
      <div className="container">
        <div className="pt-5">
          <h4 className="scrb-dash-h4">Welcome SCRB</h4>
          <p className="scrb-dash-para">All System are running smoothly</p>
        </div>
        <div className="row pt-4">
          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="admin-dash-revenue-box pt-3  ">
              <div className="text-center">
                <span className="scrb-dash-span">Citizen</span>
              </div>
              <div className="pt-5 ms-4">
                <span className="scrb-dash-span">
                  {citizen.length > 0 ? citizen.length : 0}
                </span>
                <span className="scrb-dash-span ms-5">Active</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="admin-dash-revenue-box pt-3 ">
              <div className="text-center">
                <span className="scrb-dash-span">Police Station</span>
              </div>
              <div className="pt-5 ms-4">
                <span className="scrb-dash-span">
                  {policeStation.length > 0 ? policeStation.length : 0}
                </span>
                <span className="scrb-dash-span ms-5">Active</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="admin-dash-revenue-box pt-3 ">
              <div className="text-center">
                <span className="scrb-dash-span">Alerts</span>
              </div>
              <div className="pt-5 ms-4">
                <span className="scrb-dash-span">{crimeAlerts.length > 0 ? crimeAlerts.length : 0}</span>
                <span className="scrb-dash-span ms-5">Active</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="admin-dash-revenue-box pt-3 text-center">
              <div>
                <span className="scrb-dash-span">Crimes</span>
              </div>
              <div className="pt-5 ms-4">
                <span className="scrb-dash-span">
                  {crimes.length > 0 ? crimes.length : 0}
                </span>
                <span className="scrb-dash-span ms-5">Active</span>
              </div>
            </div>
          </div>
        </div>

        <ScrbBarChart />
      </div>
    </div>
  );
}

export default ScrbDashboard;
