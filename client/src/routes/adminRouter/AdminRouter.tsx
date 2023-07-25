import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
function AdminRouter() {
  return (
    <Routes>
             <Route path='/' element={<AdminPage/>}  />
      {/* <Route element={<OtpPage />} path='/otp' />
      <Route element={<LoginPage />} path='/login' />
      <Route element={<SignupPage />} path='/signup' />i */}
        </Routes>
  )
}

export default AdminRouter