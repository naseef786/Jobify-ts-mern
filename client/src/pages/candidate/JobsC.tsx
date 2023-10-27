import React, { useContext, useEffect, useState } from 'react';
import JobListComponent from '../../components/jobs/JobsP';
import JobDetailsComponent from '../../components/jobs/JobD';
import { Jobs } from '../../types/Jobs';
import LoadingBox from '../../components/loadingBox/LoadingBox';
import MessageBox from '../../components/messageBox/MessageBox';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import { useGetJobsQuery } from '../../hooks/jobHooks';
import { Store } from '../../store/Store';
import JobDetails from './JobDetails';




const UserPage: React.FC = () => {
 
  


  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const token = userInfo.token
  const { data: jobs, isLoading, error } = useGetJobsQuery(token);

  useEffect(() => {
    // Fetch jobs from your backend server
    if(jobs) dispatch({ type: 'STORE_JOBS', payload: jobs });
     
  }, [dispatch,jobs]);
  


    if (isLoading) {
        return <LoadingBox />;
      }
    
      if (error) {
        return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
      }

      






  return (<>
  
    <div>

    <div className="flex">
  <div className="w-1/2 p-4 "> {/* Adjust the width and padding as needed */}
    {/* Job Details */}
    <h2 className="text-xl font-bold mb-4  " >Job Details</h2>
    <JobListComponent />
   
  </div>
  <div className="w-1/2 p-4 bg-gray-100   right-7  items-center align-middle " > {/* Adjust the width and padding as needed */}
    {/* Job Listings */}
    <h2 className="text-xl font-bold mb-4    ">Job Listings</h2>
    {/* Add job listings content here */}
    <JobDetails  />
  </div>
</div>

     
       
    </div>
    </>
  );
}

export default UserPage;
