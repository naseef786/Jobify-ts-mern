import React, { useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'

interface SearchBoxProps {
    onSearch: (query: string) => void;
  }
  const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    };
    const handleSearch = () => {
        onSearch(query);
      };

    return (
        <div className='searchDiv grid gap-10  bg-gradient-to-br bg-slate-300 rounded-[10px] p-[3rem] '>
           
                <div className='first flex justify-between items-center rounded-[8px] gap-[10px] bg-white shadow-lg shadow-grayish-700'>
                    <div className='flex gap-2 items-center  h-24'>

                        <AiOutlineSearch className="text-[25px] icon" />
                        <input
                        type="text" value={query} onChange={handleQueryChange}
                            className="bg-transparent text-blue-500 border border-blue-500 border-solid border-opacity-50 focus:outline-none w-full py-2 px-4 rounded-md"
                            placeholder="Search Job Here ..."
                        />
                        <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon ' />
                    </div>
                    <div className='flex gap-2 items-center '>

                        <BsHouseDoor className="text-[25px] icon" />
                        <input
                            type="text"
                            className="bg-transparent text-blue-500 border border-blue-500 border-solid border-opacity-50 focus:outline-none w-full py-2 px-4 rounded-md"
                            placeholder="Searcc By Company"
                        />
                        <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon ' />
                    </div>
                    <div className='flex gap-2 items-center '>

                        <CiLocationOn className="text-[25px] icon" />
                        <input
                            type="text"
                            className="bg-transparent text-blue-500 border border-blue-500 border-solid border-opacity-50 focus:outline-none w-full py-2 px-4 rounded-md"
                            placeholder="Search By Location"
                        />

                        <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon ' />
                    </div>
                    <button className='bg-blue-600 h-full p-2 text-white m-3 px-10 rounded-[10px]  cursor-pointer hover:bg-blue-400' onClick={handleSearch}>
                        Search
                    </button>

                </div>
          
            <div className='secDiv flex items-center gap-10 justify-center'>

                <div className="singleSearch flex items-center gap-2">
                    <label htmlFor="relevance" className="text-[#808080] font-semibold">
                        Sort by:
                        <select
                            name="relevance"
                            id="relevance"
                            className=" w-36 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Relevance</option>
                            <option value="">Inclusive</option>
                            <option value="">Starts With</option>
                            <option value="">Contains</option>
                        </select>
                    </label>
                </div>
                <div className="singleSearch flex items-center gap-2">
                    <label htmlFor="relevance" className="text-[#808080] font-semibold">
                        Sort by:
                        <select
                            name="relevance"
                            id="relevance"
                            className=" w-36 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Relevance</option>
                            <option value="">Inclusive</option>
                            <option value="">Starts With</option>
                            <option value="">Contains</option>
                        </select>
                    </label>
                </div>
                <div className="singleSearch flex items-center gap-2">
                    <label htmlFor="relevance" className="text-[#808080] font-semibold">
                        Sort by:
                        <select
                            name="relevance"
                            id="relevance"
                            className=" w-36 border border-gray-300 rounded-md p-1 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            <option value="">Relevance</option>
                            <option value="">Inclusive</option>
                            <option value="">Starts With</option>
                            <option value="">Contains</option>
                        </select>
                    </label>
                </div>



            </div>
        </div>
    )
}

export default SearchBox