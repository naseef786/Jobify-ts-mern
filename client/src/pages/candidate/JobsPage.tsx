import React from 'react'
import NavBar from '../../components/header/Navbar'
import Jobs from '../../components/jobs/Jobs'
import Footer from '../../components/footer/Footer'
import TileNav from '../../components/header/TileNav'

function JobsPage() {
  return (
    <>
    <TileNav/>
    <Jobs/>
    <Footer/>
    </>
  )
}

export default JobsPage