import React from 'react';

import jobify from '../../assets/jobify.png'

import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBuilding
} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { FaRegWindowClose } from 'react-icons/fa';

interface SideProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Side: React.FC<SideProps> = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside id="sidebar" className={`${openSidebarToggle ? "sidebar-responsive" : ""}  p-4`}>
      <div className='sidebar-title items-center justify-center '>
        <div>
          <Link to='/hirer' className='text-blue-600 font-bold text-xl decoration-transparent'>
            {/* Job<span className='text-[#d2dbe2cb]'>ify</span> */}
            <img src={jobify} alt="" className='w-100 h-10 ' />
          </Link>
        </div>
        
        <span className='icon close_icon  cursor-pointer text-black' onClick={OpenSidebar}><FaRegWindowClose className="icon cursor-pointer  close_icon " onClick={OpenSidebar} /></span>
      </div>

      <ul className='sidebar-list'>

        <li className='sidebar-list-item'>
          <Link to="/hirer" className="flex items-center no-underline  justify-evenly text-gray-500">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/hirer/jobposts" className="flex items-center no-underline  justify-evenly text-gray-500">
            <BsFillGrid3X3GapFill className='icon' /> Job Posts
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/hirer/candidates" className="flex items-center no-underline  justify-evenly text-gray-500">
            <BsPeopleFill className='icon' /> Candidates
          </Link>
        </li>
        {/* <li className='sidebar-list-item'>
          <Link to="/hirer/upload-job" className="flex items-center no-underline  justify-evenly text-gray-500">
            <BsListCheck className='icon' /> Upload a Job Post
          </Link>
        </li> */}
        <li className='sidebar-list-item'>
          <Link to="/hirer/reports" className="flex items-center no-underline  justify-evenly text-gray-500">
            <BsMenuButtonWideFill className='icon' /> Reports
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/hirer/settings" className="flex items-center no-underline  justify-evenly text-gray-500">
            <BsFillGearFill className='icon' /> Settings
          </Link>
        </li>

      </ul>
    </aside>
  )
}

export default Side;
