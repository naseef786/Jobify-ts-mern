import React,{useState} from 'react'
import NavBar from '../../components/header/Navbar'
import JobN from '../../components/jobs/Jobs'
import Footer from '../../components/footer/Footer'
import TileNav from '../../components/header/TileNav'
import SearchBox from '../../components/search/Search'
import Jobview from '../../components/jobs/Jobview'

function JobsPage() {
 

  return (
    <>
    <TileNav/>
    <SearchBox/>
    <JobN />
    <Footer/>
    </>
  )
}

export default JobsPage