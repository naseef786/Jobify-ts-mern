import React, { useState,useEffect,useContext} from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { useGetJobsQuery, useSearchJobsQuery } from '../../hooks/jobHooks';
import LoadingBox from '../loadingBox/LoadingBox';
import MessageBox from '../messageBox/MessageBox';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';
import { Job, Jobs } from '../../types/Jobs';
import { Store } from '../../store/Store';
import { useNavigate } from 'react-router-dom';

// interface JobListProps {
//   searchTerm: string;
//   token:string;
// }




const Jobview:React.FC= () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const { userInfo,searchTerm } = state
  const token = userInfo.token
  function selectJob(job:Job){
    dispatch({ type: 'SELECT_JOBS', payload: job })
    navigate('/jobs/:id')
}
  const { data: jobs, isLoading, error } = useSearchJobsQuery(searchTerm,token);

// useEffect(() => {
//   // Fetch jobs from your backend server
//   if(fetchedJobs) dispatch({ type: 'STORE_JOBS', payload: fetchedJobs });
   
// }, [jobs,searchTerm]);

 

    if (isLoading) {
        return <LoadingBox />;
      }
    
      if (error) {
        return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
      }

      
    return (
        <div>
             <Helmet>
            <title>jobify - Jobs</title>
          </Helmet>
            <div className='jobContainer flex gap-10 justify-center flex-wrap items-center py-10'>
            {jobs && jobs.length > 0 ? (
                 jobs.map((job) => (
                <div key={job.id} className='group group/item singleJob w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyish-400/700 hover:shadow-lg'  onClick={()=>selectJob(job)} >
                    <span className='flex justify-between items-center gap-4'>
                        <h1 className='text-[16px] font-semibold text-black group-hover:text-white'>{job.title} </h1>
                        <span className='flex items-center text-[#ccc] gap-1'>
                            <BiTimeFive />Now
                        </span>
                    </span>
                    <h6 className='text-[#ccc]'>{job.location} </h6>
                    <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-black'>
                        {job.description}
                    </p>
                    <div className='logo flex items-center gap-2'>
                        <img src="" alt="logo" className='w-[10%]' />
                        <span className='text-[14px] py-[1rem] block text-[#959595] group-hover:text-black'>{job.benefits} </span>
                    </div>
                    <button className='border-2 rounded-[10px] block p-[10px] text-[14px] font-semibold text-textColor hover:bg-white group-hover:item:text-slate-400 group-hover:text-black'>
                        Apply Now
                    </button>
                    
                </div>))):(
                    <MessageBox variant="info">No jobs found.</MessageBox> /* Display a message when 'jobs' is empty or undefined */ 
                )}
            </div>
        </div>
    );
}

export default Jobview;
