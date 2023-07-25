import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/candidate/HomePage';
import Loginpage from '../../pages/candidate/Loginpage';
import SignupPage from '../../pages/candidate/SignupPage';


function CandidteRouter() {
    return(
        <Routes>
             <Route  path='/' element={<HomePage />}  />
             <Route  path="/login" element={<Loginpage/>} />
             <Route path="/signup" element={<SignupPage/>} />
      {/* <Route element={<OtpPage />} path='/otp' />
      <Route element={<LoginPage />} path='/login' />
      <Route element={<SignupPage />} path='/signup' />i */}
        </Routes>
    )
}
export default CandidteRouter