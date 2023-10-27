import { Routes, Route, Navigate } from 'react-router-dom';
import {useContext} from 'react'
import HomePage from '../../pages/candidate/HomePage';
import Loginpage from '../../pages/candidate/Loginpage';
import SignupPage from '../../pages/candidate/SignupPage';
import JobsPage from '../../pages/candidate/JobsPage';
import About from '../../pages/candidate/About';
import NewNav from '../../components/header/NewNav'
import Job from '../../components/jobs/Jobs'
import Help from '../../components/test/Help';
import Contact from  '../../pages/candidate/Contact'
import Applyform from '../../components/applyform/Applyform';
import Forgetpass from '../../components/forgetpassword/Forget'
import JobC from '../../pages/candidate/JobsC'
import {Store}  from '../../store/Store'
import Otp from '../../pages/candidate/Otp';
import ResetPassword from '../../components/reset/ResetPassword';
import JobDetails from '../../pages/candidate/JobDetails';
import UserProfile from '../../components/user_dash/UserProfile';
import Footer from '../../components/footer/Footer';

function CandidteRouter() {
    const {state} = useContext(Store)
    const {userInfo} = state
    return(
        <main className='bg-[#f7fdfd]'>
            <NewNav/>
        <Routes>
             <Route  path='/' element={<HomePage />}  />
             <Route  path="/signin" element={<Loginpage/>} />
             <Route path="/signup" element={<SignupPage/>} />
             <Route path='/otp' element={<Otp/>}/>
             <Route path='/jobs'  element={userInfo ? <JobsPage/>: <Navigate to='/signin'/> } />
             <Route path='/jobs/:id'  element={userInfo ? <JobDetails/>: <Navigate to='/signin'/> } />
             <Route path='/applied'  element={userInfo ? <JobC/>: <Navigate to='/signin'/> } />
             <Route path='/contact'  element={<Contact/>}/>
             <Route
            path={
              userInfo && "user-profile" 
            }
            element={<UserProfile />}
          />
             <Route path='/recovery'  element={<Forgetpass/>}/>
             <Route path='/reset'  element={<ResetPassword/>}/>
             <Route path='/about-us'  element={<About/>}/>
             <Route path='/contact-us'  element={<Contact/>}/>
             <Route path='/help'  element={<Help/>}/>
             <Route path='/applyform' element={<Applyform/>}/>
        </Routes>
    <Footer/>

        </main>
    )
}
export default CandidteRouter