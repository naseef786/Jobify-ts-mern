import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import DashboardNav from '../../components/dashboard/Dashboardnav'
// import NavBar from '../../components/header/Navbar'
// import Test from '../../components/test/Test'
// import Footer from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'
function AdminPage() {
  return (
    <div className='flex'>
    <div className='basis-[20%] h-[100vh] border' >
     <Sidebar/>
    </div>
    <div className='basis-[80%] border ' >
    <DashboardNav/>
    <div>
    <Outlet/>
    </div>
    </div>
</div>
  )
}

export default AdminPage