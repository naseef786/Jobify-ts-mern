import React, { useContext, useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../store/Store';

const SearchBox: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const [search, setSearch] = useState('');
  const { searchTerm } = state;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SEARCH_JOBS', payload: search });
  };

  return (
    <div className="searchDiv grid gap-10 bg-gradient-to-br bg-slate-300 rounded-[10px] p-[3rem]">
      <div className="first flex justify-center items-center rounded-[8px] gap-[10px] bg-white shadow-lg shadow-grayish-700">
        <form onSubmit={handleSearch} className="flex gap-2 items-center h-24">
          <AiOutlineSearch className="text-[25px] icon" />
          <input
            type="text"
            value={search}
            onChange={handleInputChange}
            className="bg-transparent text-blue-500 border border-blue-500 border-opacity-50 focus:outline-none w-full py-2 px-4 rounded-md"
            placeholder="Search Job Here ..."
          />
          <AiOutlineCloseCircle className="text-[30px] text-[#a5a6a6] hover:text-textColor icon" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-400">
            Search
          </button>
        </form>
      </div>
      <div className="secDiv flex items-center gap-10 justify-center">
        {/* ... (Your other elements) */}
      </div>
    </div>
  );
};

export default SearchBox;
