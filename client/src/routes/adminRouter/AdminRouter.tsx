import React, { useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
import DashboardNav from '../../components/dashboard/DashboardNav';
import Main from '../../components/dashboard/Main';

import Signup from '../../pages/admin/Signup';
import Login from '../../pages/admin/Login';

import { Store } from '../../store/Store';
function AdminRouter() {
  const { state } = useContext(Store)
  const { adminInfo } = state
  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={adminInfo ? <AdminPage /> : <Navigate to={'/admin/signin'} />} >


        <Route index element={<Main />} />
      </Route>

      {/* <Route element={<OtpPage />} path='/otp' />
     
      <Route element={<SignupPage />} path='/signup' />i */}
    </Routes>
  )
}

export default AdminRouter