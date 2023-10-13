import React from 'react';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsBuilding
} from 'react-icons/bs';

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
          <a href="/hirer" className="flex items-center no-underline text-gray-500">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
        </li>
        {/* <li className='sidebar-list-item'>
          <a href="/admin/users" className="flex items-center no-underline text-gray-500">
            <BsBuilding className='icon' /> Recruiters
          </a>
        </li> */}
        <li className='sidebar-list-item'>
          <a href="/hirer/jobposts" className="flex items-center no-underline text-gray-500">
            <BsFillGrid3X3GapFill className='icon' />Job Posts
          </a>
        </li>
        <li className='sidebar-list-item'>
                <a href="/hirer/candidates" className="flex items-center no-underline text-gray-500">
                    <BsPeopleFill className='icon'/> Candidates
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/hirer/create-job" className="flex items-center no-underline text-gray-500">
                    <BsListCheck className='icon'/> create a job post
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/hirer" className="flex items-center no-underline text-gray-500">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/hirer/settings" className="flex items-center no-underline text-gray-500">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
              <li className='sidebar-list-item'>
                <a href="/hirer/reports" className="flex items-center no-underline text-gray-500">
                    <BsFillGearFill className='icon'/> Reports
                </a>
            </li>
        {/* Add classes for other list items as needed */}
      </ul>
    </aside>
  )
}

export default Side;
