import React, { useState } from 'react'
import Side from '../../components/hirer_dash/Side'
import { Outlet } from 'react-router-dom'
import Header from '../../components/hirer_dash/Header'
import '../../components/hirer_dash/hirer.css'


function HirerPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Side openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Outlet />
    </div>
  )
}
export default HirerPage


