import React,{useState} from 'react'
import NavBar from '../../components/header/Navbar'
import JobN from '../../components/jobs/Jobs'
import Footer from '../../components/footer/Footer'
import NewNav from '../../components/header/NewNav'
import SearchBox from '../../components/search/Search'
import Jobview from '../../components/jobs/Jobview'
import FindJobs from './FindJobs'

function JobsPage() {
 

  return (
    <>
    <NewNav/>
    {/* <SearchBox/> */}
    <FindJobs/>
    <Jobview />
    <Footer/>
    </>
  )
}

export default JobsPage