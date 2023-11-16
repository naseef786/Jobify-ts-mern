import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import HirerPage from '../../pages/hirer/HirerPage';
import { Store } from '../../store/Store';
import Login from '../../pages/hirer/Login';
import Signup from '../../pages/hirer/Signup';
import Home from '../../components/hirer_dash/Home';
import Candidates from '../../components/hirer_dash/Candidates';
import Applyform from '../../components/applyform/Applyform';
import Profile from '../../components/hirer_dash/Profile';
import JobPosts from '../../components/hirer_dash/JobPosts';
import Reports from '../../components/hirer_dash/Reports';
import UploadJob from '../../components/hirer_dash/forms/UploadJob';
import JobDetails from '../../pages/candidate/JobDetails';
function HirerRouter() {
  const { state } = useContext(Store)
  const { hirerInfo } = state
  const storedToken = localStorage.getItem('hirerInfo');

// if (storedToken) {
//   console.log('Token found in local storage:');
// } else {
//   console.log('No token found in local storage');
// }

  return (
    <Routes>
      <Route element={<Login />} path='/signin' />
      <Route element={<Signup />} path='/signup' />
      <Route element={storedToken ? <HirerPage /> : <Navigate to={'/hirer/signin'} />} path='/' >
        <Route index element={<Home />} />
        <Route path='/candidates' element={<Candidates />} />
        <Route path='/jobposts' element={<JobPosts/>} />
        <Route path='/jobposts/:id' element={<JobDetails/>} />
        <Route path='/upload-job' element={<UploadJob/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/applied' element={<Applyform />} />
        <Route path='/applied/:id' element={<Applyform />} />
        <Route path='/create-job' element={<Applyform />} />
        <Route path='/settings' element={<Profile />} />
        <Route path='/reports' element={<Reports />} />
      </Route>

    </Routes>
  )
}

export default HirerRouter