import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../Constants/BaseUrl';

function ViewNotificationDetails() {
  const {id}=useParams();

  const [crimeAlerts,setCrimeAlerts]=useState([])

  useEffect(()=>{
    axiosInstance
    .post(`/viewAprvdCrimeByPolicStationId/${id}`)
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
    <div className='container'>
    <div className='pt-5'>
        <h4 className='scrb-dash-h4'>Welcome SCRB</h4>
        <p className='scrb-dash-para'>All System are running smoothly</p>
      </div>
      <div className="crime-alerts-container">
    <h2 className="title">Crime Alerts</h2>

    {crimeAlerts.length>0?<table className="crime-alerts-table">
      <thead>
        <tr>
          <th>Sl.No</th>
          <th>Police Station Name</th>
          <th>Victim Name</th>
          <th>Type of Crime</th>
          <th>Witness Name</th>
          <th>Date</th>
          <th>District</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {crimeAlerts.map((alert,i) => (
          <tr key={alert.id}>
            <td>{i+1}</td>
            <td>{alert.psId.policestationname}</td>
            <td>{alert.victimName}</td>
            <td>{alert.caseType}</td>
            <td>{alert.witnessName}</td>
            <td>{alert.incidentDate.slice(0,10)}</td>
            <td>{alert.district}</td>
            <td>
              <Link to={`/admin_viewcasedetails/${alert._id}`}>
              <button className="view-not-det-details-button">View Details</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>:<h1>No Data Found</h1>
    
  }

    
  </div>
  </div>
  )
}

export default ViewNotificationDetails