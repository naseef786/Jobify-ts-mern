import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/candidate/HomePage';
import HirerSidebar from '../../components/hirer_dashboard/HirerSidebar';
import HirerPage from '../../pages/hirer/HirerPage';
function HirerRouter() {
  return (
    <Routes>
             <Route element={<HirerPage/>} path='/' />
      {/* <Route element={<OtpPage />} path='/otp' />
      <Route element={<LoginPage />} path='/login' />
      <Route element={<SignupPage />} path='/signup' />i */}
        </Routes>
  )
}

export default HirerRouter