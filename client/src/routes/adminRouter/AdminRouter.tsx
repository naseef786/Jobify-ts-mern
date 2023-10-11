import React, { useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
import DashboardNav from '../../components/admin_dash/DashboardNav';
import Main from '../../components/admin_dash/Main';

import Signup from '../../pages/admin/Signup';
import Login from '../../pages/admin/Login';

import { Store } from '../../store/Store';
import Users from '../../components/admin_dash/Users';
import Home from '../../components/admin_dash/Home';
function AdminRouter() {
  const { state } = useContext(Store)
  const { adminInfo } = state
  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={adminInfo ? <AdminPage /> : <Navigate to={'/admin/signin'} />} >


        <Route index element={<Home/>} />
         <Route path='/users' element={<Users/>} />
         <Route path='/items' element={<Main/>} />

      </Route>

      {/* <Route element={<OtpPage />} path='/otp' />
     
      <Route element={<SignupPage />} path='/signup' />i */}
    </Routes>
  )
}

export default AdminRouter