import React, { useState,useEffect,useContext} from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { useGetJobsQuery, useSearchJobsQuery, usegetJobsMutation } from '../../hooks/jobHooks';
import LoadingBox from '../loadingBox/LoadingBox';
import MessageBox from '../messageBox/MessageBox';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import { Helmet } from 'react-helmet-async';

import { Jobs } from '../../types/Jobs';
import { Store } from '../../store/Store';
import { useNavigate } from 'react-router-dom';
import JobCard from '../user_dash/JobCard';
import Find from '../../pages/candidate/FindJobs';

// interface JobListProps {
//   searchTerm: string;
//   token:string;
// }




const Jobview:React.FC= () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const {hirerInfo,searchTerm } = state
  const token = hirerInfo.token

  const { mutateAsync:fetchJobs } = usegetJobsMutation();

  const fetchedJobs= async() =>{
    const newUrl = {

    }
const res = fetchJobs({newUrl,token})

console.log(res);

  }

// useEffect(() => {
//   // Fetch jobs from your backend server
//   if(fetchedJobs) dispatch({ type: 'STORE_JOBS', payload: fetchedJobs });
   
// }, [jobs,searchTerm]);

// const Jobs = jobs?.filter(job => job.recruiterId._id === hirerInfo._id);

//     if (isLoading) {
//         return <LoadingBox />;
//       }
    
//       if (error) {
//         return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
//       }

      
    return (
        <div className='main-container'>
             <Helmet>
            <title>jobify - Jobs_recruiter view</title>
          </Helmet>
       
          <Find/>
         
          {/* <div className='w-full flex flex-wrap gap-4'>
                {Jobs?.slice(0, 6).map((job, index) => (
                  <JobCard dispatch={dispatch} job={job} key={index} />
                ))}
              </div> */}
        </div>
    );
}

export default Jobview;


/* <div className=' jobContainer flex gap-10 justify-center flex-wrap items-center py-10'>
{Jobs && Jobs.length > 0 ? (
     Jobs?.map((job) => (
    <div key={job._id} className='group group/item singleJob w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyish-400/700 hover:shadow-lg'>
        <span className='flex justify-between items-center gap-4'>
            <h1 className='text-[16px] font-semibold text-black group-hover:text-white'>{job.jobTitle} </h1>
            <span className='flex items-center text-[#ccc] gap-1'>
                <BiTimeFive />Now
            </span>
        </span>
        <h6 className='text-[#ccc]'>{job.location} </h6>
        <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-black'>
            {job.description}
        </p>
        <div className='logo flex items-center gap-2'>
            <img src={job.profileUrl} alt="logo" className='w-[10%]' />
            <span className='text-[14px] py-[1rem] block text-[#959595] group-hover:text-black'>{job.jobTitle} </span>
        </div>
        <button className='border-2 rounded-[10px] block p-[10px] text-[14px] font-semibold text-textColor hover:bg-white group-hover:item:text-slate-400 group-hover:text-black'>
            Apply Now
        </button>
        
    </div>))):(
        <MessageBox variant="info">No jobs found.</MessageBox> /* Display a message when 'jobs' is empty or undefined */ 
//     )}
// </div> */}