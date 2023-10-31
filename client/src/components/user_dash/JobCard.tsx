import React, { Dispatch } from "react";
import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link, Navigate, useNavigate } from "react-router-dom";


interface Job {
  id: string;
  company: {
    profileUrl: string;
    name: string;
  };
  jobTitle: string;
  location: string;
  detail: Array<{
    desc: string;
  }>;
  
  
  recruiterId:number
  title: string;
  qualification: string;
  profileUrl:string
  requirements:string
  salary: string;
  description: string;
  shifts: string;
  jobType:string;
  benefits:string;
  createdAt:string;
  vaccancy:string
  applicants:[]
  countOfStaffNeeded: string;
}

interface JobCardProps {
  job: Job;
  dispatch: React.Dispatch<any>
}

const JobCard: React.FC<JobCardProps> = ({ job,dispatch }) => {
const navigate = useNavigate()
  function selectJob(job:Job){
    dispatch({ type: 'SELECT_JOBS', payload: job })
    navigate('/jobs/:id')
}

  return (
  
      <div
        className="w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
                rounded-md px-3 py-5 " onClick={()=>selectJob(job)}
      >
        <div className="flex gap-3">
          <img
            src={job?.profileUrl}
            alt={job?.title}
            className="w-14 h-14"
          />

          <div className="">
            <p className="text-lg font-semibold truncate">{job?.title}</p>
            <span className="flex gap-2 items-center">
              <GoLocation className="text-slate-900 text-sm" />
              {job?.location}
            </span>
          </div>
        </div>

        <div className="py-3">
          <p className="text-sm">
            {job?.requirements}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm">
            {job?.jobType}
          </p>
          <span className="text-gray-500 text-sm">
            {moment(job?.createdAt).fromNow()}
          </span>
        </div>
      </div>
  
  );
};

export default JobCard;
