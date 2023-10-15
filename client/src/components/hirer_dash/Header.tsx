import React, { useContext, useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { Store } from '../../store/Store';

interface HeaderProps {
  OpenSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
const {state,dispatch} = useContext(Store)
const {hirerInfo} =state
console.log(hirerInfo.name);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Do something with the searchTerm (e.g., filter data)
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
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
      </div>
      <div className='flex space-x-5'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <BsPersonCircle className='icon' />
        <img src={hirerInfo.image} alt="" />
      </div>
    </header>
  );
}

export default Header;
