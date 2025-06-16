import React, { useEffect } from 'react'
import '../../Assets/Styles/Scrb.css'
import { Link, useNavigate } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";
import { FaPoll } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

import { PiBuildingOfficeFill } from "react-icons/pi";
import { FaFileLines } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { MdNotificationAdd } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { TbFileReport } from "react-icons/tb";
function ScrbSidebar() {

  const navigate = useNavigate(); 

  useEffect(() => {
    if (localStorage.getItem("scrbId") == null) {
      navigate("/");
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className='scrb-sidebar-backgroundcolor'>
        <div className="pt-5 ms-5 ">
            <Link  to='/scrb-dashboard' className='scrb-sidebar-h5'><h5 className="pt-5 fw-light"><MdDashboard/> Dashboard</h5></Link>
            {/* <Link className='scrb-sidebar-h5'><h5 className="pt-4"><IoIosNotifications/> Crime Alerts</h5></Link>
            <Link className='scrb-sidebar-h5'><h5 className="pt-4"><FaCalendarAlt/> Date  of Crime</h5></Link>
            <Link className='scrb-sidebar-h5'><h5 className="pt-4"><FaSearch/> Search</h5></Link>
            <Link className='scrb-sidebar-h5'><h5 className="pt-4"><MdLock/> Change Password</h5></Link>
            <Link className='scrb-sidebar-h5'><h5 className="pt-4"><PiNotepadFill/> Privacy Policy</h5></Link>
            <Link className='scrb-sidebar-h5'><h5 className="pt-4"><FaPoll/> Reports</h5></Link>
             */}


            <Link to='/scrb-viewallpolicestation' className='scrb-sidebar-h5'><h5 className="pt-4 fw-light"><PiBuildingOfficeFill /> Police Station</h5></Link>
            {/* <Link to='/scrb_viewallcases'className='scrb-sidebar-h5'><h5 className="pt-4 fw-light"><FaFileLines /> Crimes</h5></Link> */}
            <Link to="/scrb-generatealert" className='scrb-sidebar-h5'><h5 className="pt-4 fw-light"><FaBell /> Generate Crime Alerts</h5></Link>
            <Link to='/scrb-viewNotification' className='scrb-sidebar-h5'><h5 className="pt-4 fw-light"><MdNotificationAdd /> View Crime Alerts</h5></Link>
            <Link to='/scrb-viewcasereport' className='scrb-sidebar-h5'><h5 className="pt-4 fw-light"><TbFileReport /> Case Report</h5></Link>
            {/* <Link className='scrb-sidebar-h5'><h5 className="pt-4 fw-light"><IoSearch /> Search</h5></Link> */}
            <Link to='/' className='scrb-sidebar-h5' onClick={handleLogout} ><h5 className="pt-4 fw-light"><MdOutlineLogout/> Logout</h5></Link>
        </div>
      </div>
    </div>
  )
}

export default ScrbSidebar
