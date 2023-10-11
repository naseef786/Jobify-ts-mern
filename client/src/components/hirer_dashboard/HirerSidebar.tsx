import React from 'react'
import {useState} from 'react'
import Collasp from '../../assets/img.png' 
import LogoImage from '../../assets/logo.png'  
import ChartImg from "../../assets/Chart.png"
import ChatImg from "../../assets/Chat.png"
import UserImg from "../../assets/User.png"
import SettingImg from "../../assets/Setting.png"
import SearchImg from "../../assets/Search.png"
import Backgrounds from './Bg'
import Dashboard from './Dashboard'


const  HirerSidebar = () => {
const [open, setOpen] = useState(true);
const [selectedOption, setSelectedOption] = useState('dashboard')

const handleOptionClick = (option:string) => {
    setSelectedOption(option);
  };

const [data,setData] =useState(Backgrounds)
const handleOnClick = () => setOpen((prevState) => !prevState)


  return (
    <div className='contain'>
    <div className={`${open ? 'w-64' : 'w-20'} basis-[20%] h-[100vh] border  duration-500  p-5 pt-8 bg-slate-900 relative md:w-30` } >
        <img src={Collasp}
            alt='collasp'
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 bg-cyan-500 ${!open && "rotate-180"}`}
            onClick={() => handleOnClick()} />
        <div className='flex gap-x-4 items-center'>
            <img src={LogoImage}
                alt='play-logo'
                className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
            />
            <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>Jobify</h1>
        </div>
        {/* ListItems */}
        <ul className="pt-6 menu">
            {/* Item1 */}
            <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900 rounded-md
mt-2 menu-items `}>
                <img src={ChartImg} alt="dashboard" />
                <span className={` origin-left duration-200 ${!open && "hidden"}`}   onClick={() => handleOptionClick("dashboard")}>
                    Dashboard
                </span>
            </li>
            {/* Item2 */}
            <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900 rounded-md
mt-2 menu-items `} >
                <img src={ChatImg} alt="ideas" />
                <span className={` origin-left duration-200 ${!open && "hidden"}`}>
                    Ideas
                </span>
            </li>
            {/* Item3 */}
            <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900 rounded-md
mt-2 menu-items `} >
                <img src={UserImg} alt="join" />
                <span className={` origin-left duration-200 ${!open && "hidden"}`}>
                    Join
                </span>
            </li>
            {/* Item4 */}
            <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900 rounded-md
mt-9 menu-items `} >
                <img src={SettingImg} alt="build" />
                <span className={` origin-left duration-200 ${!open && "hidden"}`}>
                    Build
                </span>
            </li>
            {/* Item5 */}
            <li
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-50 hover:text-slate-900 rounded-md
mt-2  menu-items `} >
                <img src={SearchImg} alt="search" />
                <span className={`origin-left duration-200 ${!open && "hidden"}`}>
                    Search
                </span>
            </li>
        </ul>
    </div>

     <div className="lg:ml-64 md:ml-30 sm:ml-20 mt-4 p-4">
        {selectedOption === 'dashboard' && <Dashboard />}
        {/* {selectedOption === 'ideas' && <Ideas />}
        {selectedOption === 'join' && <Join />}
        {selectedOption === 'build' && <Build />}
        {selectedOption === 'search' && <Search />} */}
      </div>
</div>
            
  )
}

export default HirerSidebar




   
{/* {data.map((values) => {
                     const { id, image, title, description, statement, url } = values
                     return (
                         <>
                             <div  key={id}>
                                 <img src={image} alt={"card-images"} className={`images`} />  

                               
                                 <div className='hover'>
                                     <h2 className='heading'>{title}</h2> 
                                     <div className='text1'>{description}</div> 
                                     <a href={url}> <button className='button'>{statement}</button></a>
                                 </div>
                             </div>
                         </>
                     )
                 })} */}