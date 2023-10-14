import React, { useContext } from 'react';
import {Store } from '../../store/Store';

const JobDetails: React.FC = () => {
  const { state} = useContext(Store);
  const {selectedJob} = state
  return (
    <div>
      {selectedJob ? (
        <div>
          <h2>{selectedJob.title}</h2>
          <h3>{selectedJob.company}</h3>
          <p>Location: {selectedJob.location}</p>
          <p>{selectedJob.description}</p>
        </div>
      ) : (
        <p>Select a job from the list to view details.</p>
      )}
    </div>
  );
}

export default JobDetails;
