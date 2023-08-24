import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../pages/Home/HomePage';
import HirerSidebar from '../../components/hirer_dashboard/HirerSidebar';
import HirerPage from '../../pages/hirer/HirerPage';
import { Store } from '../../store/Store';
import Login from '../../pages/hirer/Login';
import Signup from '../../pages/hirer/Signup';
function HirerRouter() {
  const {state} = useContext(Store)
  const{ hirerInfo} = state 
  return (
    <Routes>
       <Route element={<Login />} path='/login' />
      <Route element={<Signup/>} path='/signup' />
             <Route element={hirerInfo?<HirerPage/> : <Navigate to={'/hirer/login'} />} path='/' />
      {/* <Route element={<OtpPage />} path='/otp' />
     i */}
        </Routes>
  )
}

export default HirerRouter