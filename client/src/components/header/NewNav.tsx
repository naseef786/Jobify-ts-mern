import React, { Fragment, useState, MouseEventHandler, useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "../button/CustomButton";
import { Store } from "../../store/Store";
import { UserInfo } from "../../types/UserInfo";
import jobify from '../../assets/jobify.png'



    

interface MenuListProps {
  user: UserInfo
  onClick: MouseEventHandler;
  dispatch: React.Dispatch<any>
}



const MenuList: React.FC<MenuListProps> = ({ user, onClick,dispatch }) => {
  const handleLogout = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    
    window.location.href = '/signin'
  };
  console.log(user.cvUrl);
  
  

  return (
    <div>
     <Menu as='div' className='inline-block text-left '>
        <div className='flex'>
          <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20 '>
            <div className='leading[80px] flex flex-col items-start'>
              <p className='text-sm font-semibold '>
                {user?.firstName ?? user?.name}
              </p>
              <span className='text-sm text-blue-600 '>
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            <img
              src={user?.profileUrl}
              alt='user profile'
              className='w-10 h-10 rounded-full object-cover '
            />
            <BiChevronDown
              className='h-8 w-8 text-slate-600'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none '>
            <div className='p-1 '>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={'/user-profile'}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }  decoration-transparent group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    User Profilee
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const Navbar: React.FC = () => {
    
    const { state, dispatch } = useContext(Store);
    const {userInfo} = state;
    let user = userInfo;
  
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className='relative  z-50' >
        <nav className='container mx-auto flex items-center justify-between p-5'>
          <div>
            <Link to='/' className='text-blue-600 font-bold text-xl decoration-transparent'>
              {/* Job<span className='text-[#d2dbe2cb]'>ify</span> */}
              <img src={jobify} alt=""  className='w-100 h-10 ' />
            </Link>
          </div>

          {userInfo &&  <ul className='hidden lg:flex gap-10 text-base'>
            <li >
              <Link className=" decoration-transparent" to='/jobs'>Find Job</Link>
            </li>
            <li>
              <Link className=" decoration-transparent" to='/recruiters'>Find Recruiters</Link>
            </li>
            <li>
              <Link className=" decoration-transparent" to='/about-us'>About-us</Link>
            </li><li>
              <Link className=" decoration-transparent" to='/applied'>Applications</Link>
            </li>
           
          </ul>}

          <div className='hidden lg:block'>
            {!user?.token ? (
              <Link to='/signin'>
                <CustomButton
                  title='Sign In'
                  containerStyles='text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600'
                />
              </Link>
            ) : (
              <div>
                <MenuList dispatch={dispatch} onClick={handleCloseNavbar} user={user} />
              </div>
            )}
          </div>

          <button
            className='block lg:hidden text-slate-900'
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        {userInfo &&
        <div
          className={`${
            isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
        >
          
          <Link className=" decoration-transparent" to='/' onClick={handleCloseNavbar}>
            Find Job
          </Link>
          <Link className=" decoration-transparent" to='/recruiters' onClick={handleCloseNavbar}>
            Recruiters
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={
             "applied" 
            }
          >
            Applications
          </Link>
          <Link to='/about-us' onClick={handleCloseNavbar}>
            About
          </Link>

          <div className='w-full py-10'>
            {!user?.token ? (
              <a href='/signin'>
                <CustomButton
                  title='Sign In'
                  containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                />
              </a>
            ) : (
              <div>
                <MenuList  dispatch={dispatch} user={user} onClick={handleCloseNavbar} />
              </div>
            )}
          </div>
        </div>}
      </div>
    </>
  );
};

export default Navbar;
