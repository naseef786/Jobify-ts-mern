import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
import DashboardNav from '../../components/dashboard/Dashboardnav';
import Main from '../../components/dashboard/main';
function AdminRouter() {
  return (
    <Routes>
             <Route path='/' element={<AdminPage/>}  />
             <Route index element={<Main/> }/>

      {/* <Route element={<OtpPage />} path='/otp' />
      <Route element={<LoginPage />} path='/login' />
      <Route element={<SignupPage />} path='/signup' />i */}
        </Routes>
  )
}

export default AdminRouter