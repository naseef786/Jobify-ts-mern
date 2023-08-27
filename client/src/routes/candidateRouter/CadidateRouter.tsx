import { Routes, Route, Navigate } from 'react-router-dom';
import {useContext} from 'react'
import HomePage from '../../pages/Home/HomePage';
import Loginpage from '../../pages/candidate/Loginpage';
import SignupPage from '../../pages/candidate/SignupPage';
import JobsPage from '../../pages/candidate/JobsPage';
import About from '../../components/test/About';
import Help from '../../components/test/Help';
import Contact from '../../components/test/Contact';
import Applyform from '../../components/applyform/Applyform';
import Forgetpass from '../../components/forgetpassword/Forget'
import {Store}  from '../../store/Store'

function CandidteRouter() {
    const {state} = useContext(Store)
    const {userInfo} = state
    return(
        <Routes>
             <Route  path='/' element={<HomePage />}  />
             <Route  path="/signin" element={<Loginpage/>} />
             <Route path="/signup" element={<SignupPage/>} />
             <Route path='/jobs'  element={userInfo ? <JobsPage/>: <Navigate to='/signin'/> } />
             <Route path='/contact'  element={<Contact/>}/>
             <Route path='/forgetpassword'  element={<Forgetpass/>}/>
             <Route path='/about'  element={<About/>}/>
             <Route path='/help'  element={<Help/>}/>
             <Route path='/applyform' element={<Applyform/>}/>

        
       {/* <Route element={<OtpPage />} path='/otp' />
      <Route element={<LoginPage />} path='/login' />
      <Route element={<SignupPage />} path='/signup' />i */}
        </Routes>
    )
}
export default CandidteRouter