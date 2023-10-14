import React, { useContext, useState } from 'react'
import { AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai';
import { BsHouseDoor } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom';
import { Store } from '../../store/Store';


const SearchBox: React.FC = () => {
    const { state, dispatch } = useContext(Store)
    const [search, setState] = useState('')
const {searchTerm} = state

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleSearch = (e:React.FormEvent ) => {
    e.preventDefault();
    dispatch({ type: 'SEARCH_JOBS', payload: search })
  console.log(searchTerm,"kkkkkkkkkkk");
  
  };
  

    return (
        <div className='searchDiv grid gap-10  bg-gradient-to-br bg-slate-300 rounded-[10px] p-[3rem] ' style={{
            background:

                "linear-gradient(to right, #020620, #020722E6, #22338BCC, #626FB678, #B1B5CC9B, #020A3500)",
        }}>

            <div className='first flex  justify-center items-center rounded-[8px] gap-[10px] bg-white shadow-lg shadow-grayish-700'>
                <div className='flex gap-2 items-center  h-24'>
                    <form onSubmit={handleSearch}>
                        <AiOutlineSearch className="text-[25px] icon" />
                        <input
                            type="text"
                            value={search}
                            onChange={handleInputChange}
                            className="bg-transparent text-blue-500 border border-blue-500 border-solid border-opacity-50 focus:outline-none w-full py-2 px-4 rounded-md"
                            placeholder="Search Job Here ..."
                        />
                        <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon ' />
                        <button type='submit'>search</button>
                    </form>
                </div>
                {/* <div className='flex gap-2 items-center '>

                        <BsHouseDoor className="text-[25px] icon" />
                        <input
                            type="text"
                            onChange={handleInputChange}
                            className="bg-transparent text-blue-500 border border-blue-500 border-solid border-opacity-50 focus:outline-none w-full py-2 px-4 rounded-md"
                            placeholder="Search By Company"
                        />
                        <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon ' />
                    </div> */}
                {/* <div className='flex gap-2 items-center '>

                        <CiLocationOn className="text-[25px] icon" />
                        <input
                            type="text"
                            onChange={handleInputChange}
                            className="bg-transparent text-blue-500 border border-blue-500 border-solid border-opacity-50 focus:outline-none w-full py-2 px-4 rounded-md"
                            placeholder="Search By Location"
                        />

                        <AiOutlineCloseCircle className='text-[30px] text-[#a5a6a6] hover:text-textColor icon ' />
                    </div> */}
                {/* <button className='bg-blue-600 h-full p-2 text-white m-3 px-10 rounded-[10px]  cursor-pointer hover:bg-blue-400' type='submit' >
                        Search
                    </button> */}

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