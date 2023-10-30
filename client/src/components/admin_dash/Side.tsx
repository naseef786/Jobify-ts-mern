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
    <aside id="sidebar" className={`${openSidebarToggle ? "sidebar-responsive" : ""} p-4 bg-slate-50` }
    //  style={{
    //   background:
    //   "linear-gradient(to right,rgba(187, 164, 193, 0.85), rgba(70, 87, 145, 1), rgba(104, 135, 99, 0), rgba(82, 103, 130, 0.66),rgba(0, 0, 0, 0.2))",
    // }}
    >
      <div className='sidebar-title'>
        <div className='sidebar-brand  text-zinc-600 flex align-middle '>
          <BsCart3 className='icon_header  text-zinc-800' /> Jobify 
        </div>
        <span className='icon close_icon text-white cursor-pointer' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <a href="/admin" className="flex items-center no-underline  text-purple-700">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
        </li>
        <li className='sidebar-list-item'>
          <a href="/admin/recruiters" className="flex items-center no-underline text-purple-700">
            <BsBuilding className='icon' /> Recruiters
          </a>
        </li>
      
        <li className='sidebar-list-item'>
                <a href="/admin/candidates" className="flex items-center no-underline text-purple-700">
                    <BsPeopleFill className='icon'/> candidates
                </a>
            </li>
          
            <li className='sidebar-list-item'>
                <a href="/admin/reports" className="flex items-center no-underline text-purple-700">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/admin/profile" className="flex items-center no-underline text-purple-700">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/admin/view-blocked" className="flex items-center no-underline text-purple-700">
                    <BsListCheck className='icon'/> Blocked costomers
                </a>
            </li>
            <li className='sidebar-list-item'>
          <a href="/admin/view-blocked" className="flex items-center no-underline text-purple-700">
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </a>
        </li>
        {/* Add classes for other list items as needed */}
      </ul>
    </aside>
  )
}

export default Side;
