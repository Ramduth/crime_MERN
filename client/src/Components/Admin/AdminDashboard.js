import React, { useEffect, useState } from 'react'
import '../../Assets/Styles/AdminHome.css'
import axiosInstance from '../Constants/BaseUrl';
import AdminPieChart from './AdminPieChart';

function AdminDashboard() {

  const[citizen,setCitizen]=useState([]);
  const[policeStation,setPoliceStation]=useState([]);
  const[complaints,setComplaints]=useState([]);
  const[crimes,setCrimes]=useState([]);

  useEffect(() => {
    axiosInstance.post("/viewCitizens").then((response) => {
      console.log(response);
      if(response.data.data!=null)
      setCitizen(response.data.data)
    else 
    setCitizen([])
    });
    axiosInstance.post("/viewPolices").then((response) => {
      console.log(response);
      if(response.data.data!=null)
      setPoliceStation(response.data.data)
    else
    setPoliceStation([])
    });
    axiosInstance.post("/viewallcrime").then((response) => {
      console.log(response);
      if(response.data.data!=null)
        setCrimes(response.data.data)
    else
    setCrimes([])
    });
    axiosInstance.post("/viewAllComplaints").then((response) => {
      console.log(response);
      if(response.data.data!=null)
        setComplaints(response.data.data)
    else
    setComplaints([])
    });
  },[]);

  return (
    <div>
      <div className='container'>
        <div className='pt-5'>
          <h4 className='admin-dash-h4'>Welcome Admin</h4>
          <p className='admin-dash-para'>All System are running smoothly</p>
        </div>
        <div className='row pt-4'>

          <div className='col-12 col-sm-6 col-md-3 mb-4'>
            <div className='admin-dash-revenue-box pt-3  '>
              <div className='text-center'>
                <span className='admin-dash-span'>Citizen</span>
              </div>
              <div className='pt-5 ms-4'>
                <span className='admin-dash-span'>{(citizen.length)>0?citizen.length:0}</span>
                <span className='admin-dash-span ms-5'>Active</span>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-3 mb-4'>
            <div className='admin-dash-revenue-box pt-3 '>
              <div className='text-center'>
                <span className='admin-dash-span'>Police Station</span>
              </div>
              <div className='pt-5 ms-4'>
                <span className='admin-dash-span'>{(policeStation.length)>0?policeStation.length:0}</span>
                <span className='admin-dash-span ms-5'>Active</span>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-3 mb-4'>
            <div className='admin-dash-revenue-box pt-3 '>
              <div className='text-center'>
               <span className='admin-dash-span'>Complaints</span>
              </div>
              <div className='pt-5 ms-4'>
                <span className='admin-dash-span'>{(complaints.length)>0?complaints.length:0}</span>
                <span className='admin-dash-span ms-5'>Active</span>
              </div>
            </div>
          </div>

          <div className='col-12 col-sm-6 col-md-3 mb-4'>
            <div className='admin-dash-revenue-box pt-3 text-center'>
              <div>
                <span className='admin-dash-span'>Crimes</span>
              </div>
              <div className='pt-5 ms-4'>
                <span className='admin-dash-span'>{(crimes.length)>0?crimes.length:0}</span>
                <span className='admin-dash-span ms-5'>Active</span>
              </div>
            </div>
          </div>
        </div>

      <AdminPieChart/>

      </div>
    </div>
  )
}

export default AdminDashboard
