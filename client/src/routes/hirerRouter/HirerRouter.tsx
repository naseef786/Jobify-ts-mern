import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/candidate/HomePage';
function HirerRouter() {
  return (
    <Routes>
             <Route element={<HomePage />} path='/' />
      {/* <Route element={<OtpPage />} path='/otp' />
      <Route element={<LoginPage />} path='/login' />
      <Route element={<SignupPage />} path='/signup' />i */}
        </Routes>
  )
}

export default HirerRouter