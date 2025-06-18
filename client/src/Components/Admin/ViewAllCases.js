import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl'; 
import { Link } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { FaSearch } from 'react-icons/fa';
import '../../Assets/Styles/Searchbox.css'

function ViewAllCases() {
    const[data,setData]=useState([])
    const getData=()=>{
        axiosInstance.post("/viewallcrime")
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                setData(res.data.data || [])
            }
            else{
                setData([])
            }
        })
        .catch((err) =>{
            console.log("Error",err);
        })
    }
        useEffect (() => {
        getData()
        },[])
  return (
    <div>
    <div className='container'>
            <div className='pt-5'>
            <h4 className='admin-dash-h4'>Welcome Admin</h4>
            <p className='admin-dash-para'>All System are running smoothly</p>
            </div>
            <div className=' text-center mt-5 text-danger'>
                <div className='row'>
                    <div className='col-md-9'>
                        <h5>View All CasesSSS</h5>
                    </div>
                    <div className='col-md-3'>
                        {/* <div className="search-box">
                        <input type="text" placeholder="Search all Cases" />
                        <button type="submit">
                            <FaSearch />
                        </button>
                        </div> */}
                    </div>
                </div>
            </div>
            <div>
                {data.length === 0 && (
                    <h1>No Data Found</h1>
                )}
                {data.length > 0 && (
                    <table  class="table table-bordered table-striped mt-4">
                    <thead className='text-center newpolice-stationreq-thead'>
                        <tr className=''>
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
                    <tbody className='text-center'>
                        {data.map ((caseview,index) => (
                            <tr>
                            <th>{index +1}</th>
                            <td>{caseview.psId && caseview.psId.policestationname ? caseview.psId.policestationname : 'Not Assigned'}</td>
                            <td>{caseview.victimName}</td>
                            <td>{caseview.caseType}</td>
                            <td>{caseview.witnessName}</td>
                            <td>{caseview.incidentDate.slice(0,10)}</td>
                            <td>{caseview.incidentLocation}</td>
                            <td >
                                <Link to={`/admin_viewcasedetails/${caseview._id}`}>
                                <button className='viewallpolicest_icon'>
                                    <IoEyeSharp/>
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
  )
}

export default ViewAllCases