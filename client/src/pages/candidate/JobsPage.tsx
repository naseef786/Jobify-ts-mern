import React from 'react'
import NavBar from '../../components/header/Navbar'
import Jobs from '../../components/jobs/Jobs'
import Footer from '../../components/footer/Footer'
import TileNav from '../../components/header/TileNav'
import SearchBox from '../../components/search/Search'

function JobsPage() {
  return (
    <>
    <TileNav/>
    <SearchBox/>
    <Jobs/>
    <Footer/>
    </>
  )
}

export default JobsPage