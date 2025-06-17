import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoMdEye } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import "./Police.css";
import axiosInstance from "../Constants/BaseUrl";
import { Link, useNavigate, useParams } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";

function PoliceViewCases({type}) {
  const navigate = useNavigate(); 
  const [data, setData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const pId = localStorage.getItem("policeId");

  useEffect(() => {
    const policestationname = localStorage.getItem("policestationName");
    if (!policestationname) {
      navigate("/");
    } else {
      getData(policestationname);
    }
  }, [navigate]);

  const getData = (policestationname) => {
    console.log(policestationname);
    if(type=='request'){
      axiosInstance
      .post(`/viewPendingCrimeByPolicStationId/${pId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else if (res.data.status === 404) {
          setData([]);
          console.log("No data found for this police station");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
    }else{
      axiosInstance
      .post(`/viewAprvdCrimeByPolicStationId/${pId}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data || []);
        } else if (res.data.status === 404) {
          setData([]);
          console.log("No data found for this police station");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
    }
    
  };

  const handleApprove = (caseId) => {
    setLoadingStates(prev => ({ ...prev, [caseId]: 'approving' }));
    
    axiosInstance
      .post(`/acceptCrimeById/${caseId}`)
      .then((res) => {
        if (res.data.status === 200) {
          setData(
            data.map((caseData) =>
              caseData._id === caseId
                ? { ...caseData, adminApproved: true }
                : caseData
            )
          );
          navigate("/policeviewcases");
          window.location.reload();
        } else {
          console.error("Failed to approve");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(() => {
        setLoadingStates(prev => ({ ...prev, [caseId]: null }));
      });
  };

  const handleReject = (caseId) => {
    setLoadingStates(prev => ({ ...prev, [caseId]: 'rejecting' }));
    
    axiosInstance
      .post(`/rejectCrimeById/${caseId}`)
      .then((res) => {
        if (res.data.status === 200) {
          console.log("Rejected");
          navigate("/policeviewcases");
          window.location.reload();
        } else {
          console.error("Failed to reject");
        }
      })
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(() => {
        setLoadingStates(prev => ({ ...prev, [caseId]: null }));
      });
  };

  return (
    <div className="container mb-5 police_view_case_main">
      {/* <div className='pt-5'>
          <h4 className='admin-dash-h4'>Welcome Admin</h4>
          <p className='admin-dash-para'>All System are running smoothly</p>
        </div> */}
      <div className="container ms-5 mt-5 text-danger">
        <h4>Recent Cases</h4>
      </div>
      <div>
        {data.length === 0 && <h1>No Data Found</h1>}
        {data.length > 0 && (
          <table className="table table-striped border">
            <thead>
              <tr>
                {type=='view'?<th>Crime Id</th>:''}
                
                <th>Victim Name</th>
                {/* <th>Aadhar Number</th>
                <th>Mobile Number</th> */}
                <th>Type of Crime</th>
                <th>Witness Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((caseData) => (
                <tr key={caseData._id}>
                  {type=='view'?<td>ID{caseData._id.slice(19,24)}</td>:''}
                  <td>{caseData.victimName}</td>
                  {/* <td>{caseData.aadhar}</td>
                  <td>{caseData.mobile}</td> */}
                  <td>{caseData.caseType}</td>
                  <td>{caseData.witnessName}</td>
                  <td>{caseData.incidentDate.slice(0, 10)}</td>
                  <td>{caseData.incidentTime}</td>
                  <td>{caseData.incidentLocation}</td>
                  {type == "request" ? (
                    <td>
                      <button
                        className="policeview-cases-cross"
                        onClick={() => handleReject(caseData._id)}
                        disabled={loadingStates[caseData._id]}
                      >
                        {loadingStates[caseData._id] === 'rejecting' ? (
                          <div className="btn-loading-spinner"></div>
                        ) : (
                          <RxCross2 />
                        )}
                      </button>
                      <button
                        className="policeview-cases-tick ms-3"
                        onClick={() => handleApprove(caseData._id)}
                        disabled={loadingStates[caseData._id]}
                      >
                        {loadingStates[caseData._id] === 'approving' ? (
                          <div className="btn-loading-spinner"></div>
                        ) : (
                          <TiTick />
                        )}
                      </button>
                      <Link to={`/casedetails/${caseData._id}`}>
                        <button className="policeview-cases-eye ms-3">
                          <IoMdEye />
                        </button>
                      </Link>
                    </td>
                  ) : type == "view" ? (
                    <Link to={`/approvedcasedetails/${caseData._id}`}>
                      <button className="policeview-cases-eye1 ms-3">
                        <IoMdEye />
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default PoliceViewCases;
