import React from 'react';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBuilding
} from 'react-icons/bs';
import { Link } from 'react-router-dom';

interface SideProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Side: React.FC<SideProps> = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside id="sidebar" className={`${openSidebarToggle ? "sidebar-responsive" : ""}  p-4`}>
      <div className='sidebar-title'>
        <div className='sidebar-brand text-white flex align-middle '>
          <BsCart3 className='icon_header' /> Jobify 
        </div>
        <span className='icon close_icon text-white cursor-pointer' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
      <li className='sidebar-list-item'>
    <Link to="/hirer" className="flex items-center no-underline text-gray-500">
      <BsGrid1X2Fill className='icon' /> Dashboard
    </Link>
  </li>
  <li className='sidebar-list-item'>
    <Link to="/hirer/jobposts" className="flex items-center no-underline text-gray-500">
      <BsFillGrid3X3GapFill className='icon' /> Job Posts
    </Link>
  </li>
  <li className='sidebar-list-item'>
    <Link to="/hirer/candidates" className="flex items-center no-underline text-gray-500">
      <BsPeopleFill className='icon'/> Candidates
    </Link>
  </li>
  <li className='sidebar-list-item'>
    <Link to="/hirer/create-job" className="flex items-center no-underline text-gray-500">
      <BsListCheck className='icon'/> Create a Job Post
    </Link>
  </li>
  <li className='sidebar-list-item'>
    <Link to="/hirer/reports" className="flex items-center no-underline text-gray-500">
      <BsMenuButtonWideFill className='icon'/> Reports
    </Link>
  </li>
  <li className='sidebar-list-item'>
    <Link to="/hirer/settings" className="flex items-center no-underline text-gray-500">
      <BsFillGearFill className='icon'/> Settings
    </Link>
  </li>
        {/* Add classes for other list items as needed */}
      </ul>
    </aside>
  )
}

export default Side;
