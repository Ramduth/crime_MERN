import React from 'react'
import '../../Assets/Styles/AdminHome.css'
import AdminSidebar from './AdminSidebar'
import AdminDashboard from './AdminDashboard'

function AdminHome() {
  return (
    <div>
      <div className='admin_home' >
          <div className='admin_home_sidebar' >
            <AdminSidebar/>
          </div>
          <div className='admin_home_body' >
            <AdminDashboard/>
          </div>
      </div>
    </div>
  )
}

export default AdminHome
