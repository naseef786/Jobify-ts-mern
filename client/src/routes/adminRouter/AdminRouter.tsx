import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
import DashboardNav from '../../components/dashboard/DashboardNav';
import Main from '../../components/dashboard/Main';
import Login from '../../pages/admin/Login';
import Signup from '../../pages/admin/Signup';
function AdminRouter() {
  return (
    <Routes>
       <Route element={<Login />} path='/login' />
       <Route element={<Signup />} path='/signup' />
             <Route path='/' element={<AdminPage/>} >
             <Route  index element={<Main/> }/>
             </Route>

      {/* <Route element={<OtpPage />} path='/otp' />
     
      <Route element={<SignupPage />} path='/signup' />i */}
        </Routes>
  )
}

export default AdminRouter