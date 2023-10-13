import React, { useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import AdminPage from '../../pages/admin/AdminPage';
import DashboardNav from '../../components/admin_dash/DashboardNav';
import Main from '../../components/admin_dash/Main';

import Signup from '../../pages/admin/Signup';
import Login from '../../pages/admin/Login';

import { Store } from '../../store/Store';
import Users from '../../components/admin_dash/Candidates';
import Home from '../../components/admin_dash/Home';
import Recruiters from '../../components/admin_dash/Recruiters';
import ViewCandidate from '../../components/admin_dash/ViewCandidate';
import ViewRecrui from '../../components/admin_dash/ViewRecrui';
import Profile from '../../components/admin_dash/Profile';
import Reports from '../../components/admin_dash/Reports';
import Blocked from '../../components/admin_dash/Blocked';
function AdminRouter() {
  const { state } = useContext(Store)
  const { adminInfo } = state
  return (
    <Routes>

      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/' element={adminInfo ? <AdminPage /> : <Navigate to={'/admin/signin'} />} >


         <Route index element={<Home/>} />
         <Route path='/recruiters' element={<Recruiters/>} />
         <Route path='/candidates/:id' element={<ViewCandidate/>} />
         <Route path='/candidates' element={<Users/>} />
         <Route path='/recruiters/:id' element={<ViewRecrui/>} />
         <Route path='/reports' element={<Reports/>} />
         <Route path='/profile' element={<Profile/>} />
         <Route path='/view-blocked' element={<Blocked/>} />


      </Route>

      {/* <Route element={<OtpPage />} path='/otp' />
     
      <Route element={<SignupPage />} path='/signup' />i */}
    </Routes>
  )
}

export default AdminRouter