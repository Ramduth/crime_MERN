import React, { useEffect, useState } from "react";
import "../../Assets/Styles/ViewCrimeReport.css";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import axiosInstance from "../Constants/BaseUrl";

function ViewCrimeReport() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const id = localStorage.getItem("citizenToken");



  const getData = () => {
    axiosInstance
      .post(`/viewCitizenById/${id}`) 
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setUser(res.data.data);
        } else if (res.data.status === 404) {
          setUser([]);
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });


    
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(()=>{
    axiosInstance
      .post(`/viewCrimesByDistrict/${user.district}`) 
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else if (res.data.status === 404) {
          setData([]);
          console.log("No data found");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  },[user])



  return (
    <div className="citizen_viewcrime_main_div container">
      <div className="text-center text-danger mt-5 mb-5">
        <h4 className="report-crime-h4">View Cases</h4>
      </div>
      <div>
        {data.length === 0 && <h1>No Data Found</h1>}
        {data.length > 0 && (
          <table className="table table-striped border">
            <thead>
              <tr>
                {/* <th>Victim Name</th> */}
                <th>Type of Crime</th>
                {/* <th>Witness Name</th> */}
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                {/* <th>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((caseData) => (
                <tr key={caseData._id}>
                  {/* <td>{caseData.victimName}</td> */}
                  <td>{caseData.caseType}</td>
                  {/* <td>{caseData.witnessName}</td> */}
                  <td>{caseData.incidentDate.slice(0, 10)}</td>
                  <td>{caseData.incidentTime}</td>
                  <td>{caseData.incidentLocation}</td>
                  {/* <td>
                    <Link to={`/viewcrimedetails/${caseData._id}`}>
                      <button className="policeview-cases-eye ms-3">
                        <IoMdEye />
                      </button>
                    </Link>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewCrimeReport;
