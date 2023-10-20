import React, { useContext, useEffect } from 'react';
import { GoLocation } from "react-icons/go"
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useGetJobsQuery, useSearchJobsQuery } from '../../hooks/jobHooks';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../../store/Store';
import moment from 'moment';


const JobN: React.FC = () => {
const navigate = useNavigate()
const {state,dispatch} = useContext(Store)
const {userInfo,searchTerm} = state

const token = userInfo.token

const { data: jobs, isLoading, error } = useSearchJobsQuery(searchTerm,token)




  if (isLoading) {
    return <LoadingBox />;
  }

  if (error) {
    return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
  }

  return (<>

    <div className='page-wrapper' style={{background:'white'}}>
     
     
    <div className='w-full flex flex-wrap gap-4'>
          <Helmet>
            <title>jobify - Jobs</title>
          </Helmet>
          {jobs && jobs.length > 0 ? ( /* Add a check for 'jobs' and its length before mapping */
            jobs.map((job) => (
              <Link to={`/job-detail/${job?.id}`}>
              <div
                className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
                        rounded-md px-3 py-5 '
              >
                <div className='flex gap-3'>
                  {/* <img
                    src={job?.company?.profileUrl}
                    alt={job?.company?.name}
                    className='w-14 h-14'
                  /> */}
        
                  <div className=''>
                    <p className='text-lg font-semibold truncate'>{job?.title}</p>
                    <span className='flex gap-2 items-center'>
                      <GoLocation className='text-slate-900 text-sm' />
                      {job?.location}
                    </span>
                  </div>
                </div>
        
                <div className='py-3'>
                  <p className='text-sm'>
                  {job.description}
                    {/* {job?.detail[0]?.desc?.slice(0, 150) + "..."} */}
                  </p>
                </div>
        
                <div className='flex items-center justify-between'>
                  <p className='bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm'>
                    {job?.jobType}
                  </p>
                  <span className='text-gray-500 text-sm'>
                    {moment(job?.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            </Link>
            ))
          ) : (
            <MessageBox variant="info">No jobs found.</MessageBox> /* Display a message when 'jobs' is empty or undefined */
          )}
    
  </div>
     
      </div>
      
 
      </>
  );
};

export default JobN;
