import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl'
import { IoEyeSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';


function ViewAllCitizen() {
    const [data,setData]=useState([])
    const getData=()=>{
        axiosInstance.post('/viewCitizens')
        .then((res)=>{
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
    <div className='container'>
        <div className='pt-5'>
          <h4 className='admin-dash-h4'>Welcome Admin</h4>
          <p className='admin-dash-para'>All System are running smoothly</p>
        </div>
        <div className=' text-center mt-5 text-danger'>
                <h5>View All Citizens</h5>
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
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Contact</th>
                        <th scope="col">District</th>
                        <th scope="col">Nationalty</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {data.map ((citizenview,index) => (
                            <tr>
                            <th>{index +1}</th>
                            <td>{citizenview.firstname} {citizenview.lastname}</td>
                            <td>{citizenview.gender}</td>
                            <td>{citizenview.contact}</td>
                            <td>{citizenview.district}</td>
                            <td>{citizenview.nationality}</td>
                            <td>{citizenview.pincode}</td>
                            <td >
                                <Link to={`/viewcitizenprofile/${citizenview._id}`}>
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
  )
}

export default ViewAllCitizen