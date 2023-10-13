import React, { useState } from 'react'
import Side from '../../components/admin_dash/Side'
import { Outlet } from 'react-router-dom'
import Header from '../../components/admin_dash/Header'
import '../../components/admin_dash/admin.css'


function AdminPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
    <Header OpenSidebar={OpenSidebar}/>
    <Side  openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <Outlet/>
  </div>
  )
}

export default AdminPage


// <div className='flex'>
// <div className='basis-[20%] h-[100vh] border' >
//  <Sidebar/>
// </div>
// <div className='basis-[80%] border ' >
// <DashboardNav/>
// <div>
// 
// </div>
// </div>
// </div>