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
    <aside id="sidebar" className={`${openSidebarToggle ? "sidebar-responsive" : ""} bg-gray-900 p-4`}>
      <div className='sidebar-title'>
        <div className='sidebar-brand text-white flex align-middle '>
          <BsCart3 className='icon_header' /> Jobify 
        </div>
        <span className='icon close_icon text-white cursor-pointer' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/admin" className="flex items-center no-underline text-gray-500">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/admin/recruiters" className="flex items-center no-underline text-gray-500">
            <BsBuilding className='icon' /> Recruiters
          </a>
        </li>
      
        <li className='sidebar-list-item'>
                <a href="/admin/candidates" className="flex items-center no-underline text-gray-500">
                    <BsPeopleFill className='icon'/> candidates
                </a>
            </li>
          
            <li className='sidebar-list-item'>
                <a href="/admin/reports" className="flex items-center no-underline text-gray-500">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/admin/profile" className="flex items-center no-underline text-gray-500">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/admin/view-blocked" className="flex items-center no-underline text-gray-500">
                    <BsListCheck className='icon'/> Blocked costomers
                </a>
            </li>
            <li className='sidebar-list-item'>
          <a href="/admin/view-blocked" className="flex items-center no-underline text-gray-500">
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </a>
        </li>
        {/* Add classes for other list items as needed */}
      </ul>
    </aside>
  )
}

export default Side;
