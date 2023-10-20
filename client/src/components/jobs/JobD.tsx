import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../store/Store';
import { useApplyJobMutation } from '../../hooks/userHooks';

const JobDetails: React.FC = () => {
  const { state } = useContext(Store);
  const { selectedJob,userInfo } = state;
  const [jobId, setJobId] = useState<string>('')
;

  const token = userInfo.token
  const {mutateAsync:applyJob} = useApplyJobMutation()
const handleApply = async (e:React.SyntheticEvent)=>{
e.preventDefault()

if(selectedJob){
  setJobId(selectedJob._id)
  console.log(selectedJob,"kkkkkkkkkkkkkkkkkkkkk");
  
  const response = await applyJob({jobId,token})
console.log(response);
}

console.log(jobId);

}
  return (
    
    <div className="  flex flex-col items-center justify-center h-screen overflow-y-hidden">
      {selectedJob ? (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">{selectedJob.title}</h1>
          <div className="flex mb-4">
            <div className="w-1/2">
              <p className="font-bold">Company:</p>
              <p>{selectedJob.company}</p>
            </div>
            <div className="w-1/2">
              <p className="font-bold">Location:</p>
              <p>{selectedJob.location}</p>
            </div>
          </div>
          <div className="mb-4">
            <p className="font-bold">Description:</p>
            <p>{selectedJob.description}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-blue-600">${selectedJob.salary}</p>
            <form onSubmit={handleApply}>
              <input type="text" hidden defaultValue={selectedJob.id} />
            <button type='submit' className= "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
              Apply Now
            </button>
            </form>
          </div>
        </div>
      ) : (
        <p>Select a job from the list to view details.</p>
      )}
    </div>
  );
};

export default JobDetails;
