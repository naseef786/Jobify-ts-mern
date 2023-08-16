import React,{useState} from 'react'
import NavBar from '../../components/header/Navbar'
import Jobs from '../../components/jobs/Jobs'
import Footer from '../../components/footer/Footer'
import TileNav from '../../components/header/TileNav'
import SearchBox from '../../components/search/Search'
import Jobview from '../../components/jobs/Jobview'

function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
    <TileNav/>

    <SearchBox onSearch={handleSearch}/>
   
    <Jobview searchQuery={searchQuery}/>
    <Footer/>
    </>
  )
}

export default JobsPage