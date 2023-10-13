import React, { useState } from 'react'
import { FaAngry, FaEarlybirds, FaRegBell, FaSearch } from 'react-icons/fa'

const DashboardNav = () => {
    const [open,setOpen] = useState(false)
    const showDropdown = ()=>{
        setOpen(!open)
    }
  return (
    <div className='flex items-center justify-between h-[70px] shadow-lg px-[25px] '>
        <div className='flex items-center rounded-[5px]'>
            <input type="text"className='bg-[#F8F9FC] h-[40px] outline-none pl-[13px] w-[350px] rounded-tr-[5px] placeholder:text-[14px] leading-[20px]  ' placeholder='Search for ....'/>
            <div className='bg-[#4E73DF]  h-[40px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-[5px] rounded-br-[5px] '  >
                <FaSearch color='white'/>
            </div>
        </div>
        <div className='flex items-center gap-[15px] relative'>
            <div className='flex items-center gap-[25px] ' >
                <FaRegBell/>
                <FaEarlybirds/>
                <FaAngry/>
            </div>
            <div className='flex items-center gap-[15px] relative  ' onClick={showDropdown}>
                <p>naseef</p>
                <div className='h-[50px] rounded-full bg-[#4E73DF] cursor-pointer flex items-center justify-center' >
                    <img src="" alt="hlo" />
                </div>
                {
                    open && <div className='bg-white h-[120px] w-[150px] absolute bottom-[-135px] z-20 right-0 pt-[15px] pl-[15px]'>
                        < p className='cursor-pointer hover:text-[blue] font-semibold'>Profile</p>
                        < p className='cursor-pointer hover:text-[blue] font-semibold'>Profile</p>
                        < p className='cursor-pointer hover:text-[blue] font-semibold'>Profile</p>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default DashboardNav