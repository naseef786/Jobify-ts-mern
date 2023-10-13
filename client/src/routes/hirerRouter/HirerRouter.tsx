import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../pages/Home/HomePage';
import HirerSidebar from '../../components/hirer_dash/HirerSidebar';
import HirerPage from '../../pages/hirer/HirerPage';
import { Store } from '../../store/Store';
import Login from '../../pages/hirer/Login';
import Signup from '../../pages/hirer/Signup';
import Home from '../../components/hirer_dash/Home';
import Candidates from '../../components/hirer_dash/Candidates';
import Main from '../../components/hirer_dash/Main';
function HirerRouter() {
  const { state } = useContext(Store)
  const { hirerInfo } = state
  return (
    <Routes>
      <Route element={<Login />} path='/signin' />
      <Route element={<Signup />} path='/signup' />
      <Route element={hirerInfo ? <HirerPage /> : <Navigate to={'/hirer/signin'} />} path='/' >
        <Route index element={<Home />} />
        <Route path='/candidates' element={<Candidates />} />
        <Route path='/jobs' element={<Main/>} />
      </Route>

    </Routes>
  )
}

export default HirerRouter