import React,{useState} from 'react'
import NavBar from '../../components/header/Navbar'
import Jobs from '../../components/jobs/Jobs'
import Footer from '../../components/footer/Footer'
import TileNav from '../../components/header/TileNav'
import SearchBox from '../../components/search/Search'
import Jobview from '../../components/jobs/Jobview'

function JobsPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <>
    <TileNav/>
    <SearchBox setSearchTerm={setSearchTerm}/>
    <Jobview searchTerm={searchTerm}/>
    <Footer/>
    </>
  )
}

export default JobsPage