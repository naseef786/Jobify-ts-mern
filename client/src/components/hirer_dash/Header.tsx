import React, { Fragment, useContext, useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { Store } from '../../store/Store';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../button/CustomButton';

interface HeaderProps {
  OpenSidebar: () => void;
}


function classNames(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {



  const [searchTerm, setSearchTerm] = useState('');
  const { state, dispatch } = useContext(Store)
  const { hirerInfo } = state
  console.log(hirerInfo.name);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the searchTerm (e.g., filter data)
    console.log('Searching for:', searchTerm);
  };

  const signoutHandler = () => {
    dispatch({ type: 'HIRER_SIGNOUT' })
    localStorage.removeItem('hirerInfo')
    
    window.location.href = '/hirer/signin'
  }
  const navigate = useNavigate()
  const nav = ()=>{
    navigate('/hirer/upload-job')
  }

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon justify-start' onClick={OpenSidebar} />
      </div>
      {/* <div className='header-left'>
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 rounded-md focus:outline-none"
            placeholder="Search..."
          />
          <button type="submit" className="ml-2">
            <BsSearch className='icon' />
          </button>
        </form>
      </div> */}
      <div className='flex space-x-5'>
      <CustomButton
                  onClick={nav}
                  containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                  title='Upload a job'
                  type='button'
                />
        <BsFillBellFill className='icon' />
      
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
        
             {hirerInfo ? (<Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={hirerInfo.image}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* <Menu.Item>
                        {({ active }) => (
                          
                          <a
                            href="/hirer/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700  decoration-transparent')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          
                          <Link to='/hirer/profile' className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 decoration-transparent')}>  Your Profile</Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 decoration-transparent')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 decoration-transparent')}
                     
                      onClick={signoutHandler}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>):(
                  <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative  rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center justify-center">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                    
                      <p className='flex items-center justify-center cursor-pointer bg-white '>hello...</p>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/signin"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                          log in
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/signup"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                           sign up
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                )}
      </div>
    </header>
  );
}

export default Header;
