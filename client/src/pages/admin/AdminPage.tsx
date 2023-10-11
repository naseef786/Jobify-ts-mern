import React, { useState } from 'react'
import Sidebar from '../../components/admin_dash/Sidebar'
import Side from '../../components/admin_dash/Side'
import DashboardNav from '../../components/admin_dash/DashboardNav'
// import NavBar from '../../components/header/Navbar'
// import Test from '../../components/test/Test'
// import Footer from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import Header from '../../components/admin_dash/header'
import Home from '../../components/admin_dash/Home'
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