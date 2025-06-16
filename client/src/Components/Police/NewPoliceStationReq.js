import React, { useEffect, useState } from 'react'
import axiosInstance from '../Constants/BaseUrl'
import { IoEyeSharp } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import './Police.css';
import { Link } from 'react-router-dom';
function NewPoliceStationReq() {

    const[data,setData]=useState([])
const getData=()=>{
    axiosInstance.post("/viewallPolicesforadmin")
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

    const handleApprove = (id) => {
        console.log("in btn", id);
        axiosInstance.post(`/acceptPoliceById/${id}`)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    const updatedData = data.map((newpolicestationreq) => {
                        if (newpolicestationreq._id === id) {
                            return { ...newpolicestationreq, adminApproved: true };
                        }
                        return newpolicestationreq;
                    });
                    setData(updatedData);
                    window.location.reload()
                    getData();
                } else {
                    console.error("No data obtained");
                }
            })
            .catch((error) => {
                console.error("Error", error);
            });
    };
    

    const handleReject = (id) => {
        axiosInstance.post(`rejectPoliceById/${id}`)
        .then((res) => {
            if(res.data.status ==200){
                const updatedData = data.map((newpolicestationreq) => {
                    if(newpolicestationreq._id === id){
                        return { ... newpolicestationreq,adminApproved:false}
                    }
                    return newpolicestationreq;
                });
                setData(updatedData);
                window.location.reload();
            }
        })
        .catch((err) => {
            console.error("Error",err);
        })
    }

  return (
    <div>
        <div className='container'>
        <div className='pt-5'>
          <h4 className='admin-dash-h4'>Welcome Admin</h4>
          <p className='admin-dash-para'>All System are running smoothly</p>
        </div>
            <div className=' text-center mt-5 text-danger'>
                <h5>New Police Station Request</h5>
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
                        <th scope="col">Station Incharge</th>
                        <th scope="col">PoliceStation Code</th>
                        <th scope="col">District</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {data.map ((newpolicestationreq,index) => (
                            <tr>
                            <th>{index +1}</th>
                            <td>{newpolicestationreq.policestationname}</td>
                            <td>{newpolicestationreq.stationchargeofficers}</td>
                            <td>{newpolicestationreq.policestationcode}</td>
                            <td>{newpolicestationreq.district}</td>
                            <td >
                                <Link to={`/viewallpolicereq/${newpolicestationreq._id}`}>
                                <button className='newpolice-stationreq-eye'>
                                    <IoEyeSharp/>
                                </button>
                                </Link>
                                                               
                                <button className='ms-4 newpolice-stationreq-tick' onClick={()=>handleApprove(newpolicestationreq._id)}>
                                    <TiTick  />
                                </button>
                               <button  className='ms-4 newpolice-stationreq-cross' onClick={()=>handleReject(newpolicestationreq._id)}>
                                    <RxCross2/>
                               </button>
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

export default NewPoliceStationReq
