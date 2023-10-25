import React, { useContext } from 'react';
import { Store } from '../../store/Store';
import { Job, Jobs } from '../../types/Jobs';
import MessageBox from '../messageBox/MessageBox';
import { BiTimeFive } from 'react-icons/bi';
import { Helmet } from 'react-helmet-async';
import moment from 'moment';

const JobList: React.FC = () => {
  const { state,dispatch } = useContext(Store);
const {jobs} = state
function selectJob(job:Job){
    dispatch({ type: 'SELECT_JOBS', payload: job })
}

  return (
    <div>
    <Helmet>
   <title>jobify - Jobs</title>
 </Helmet>
   <div className='jobContainer flex gap-10 justify-center flex-wrap items-center py-10' >
   {jobs && jobs.length > 0 ? (
        jobs.map((job) => (
       <div key={job.id} className='group group/item singleJob w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-blueColor shadow-lg shadow-greyish-400/700 hover:shadow-lg' onClick={() => selectJob(job)}>
           <span className='flex justify-between items-center gap-4'>
               <h1 className='text-[16px] font-semibold text-black group-hover:text-white'>{job.title} </h1>
               <span className='flex items-center text-[#ccc] gap-1'>
                   <BiTimeFive /><span className='text-gray-500 text-sm'>
            {moment(job?.createdAt).fromNow()}
          </span>
               </span>
           </span>
           <h6 className='text-[#ccc]'>{job.location} </h6>
           <p className='text-[13px] text-[#959595] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-black'>
               {job.description}
           </p>
           <div className='logo flex items-center gap-2'>
               <img src="" alt="logo" className='w-[10%]' />
               <span className='text-[14px] py-[1rem] block text-[#959595] group-hover:text-black'>{job.company} </span>
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

export default JobList;
