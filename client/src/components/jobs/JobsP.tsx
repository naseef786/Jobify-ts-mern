import React, { useContext } from 'react';
import { Store } from '../../store/Store';
import { Job, Jobs } from '../../types/Jobs';

const JobList: React.FC = () => {
  const { state,dispatch } = useContext(Store);
const {jobs} = state
function selectJob(job:Job){
    dispatch({ type: 'SELECT_JOBS', payload: job })
}

  return (
    
    <div>
        
      <h2>Available Jobs</h2>
      <ul>
        
        {jobs && jobs.map((job) => (
          <li key={job.id} onClick={() => selectJob(job)}>
            <strong>{job.title}</strong> dd- {job.company} ({job.location})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
