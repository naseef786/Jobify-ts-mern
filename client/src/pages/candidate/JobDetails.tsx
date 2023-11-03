import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Store } from '../../store/Store';
import { useApplyJobMutation } from '../../hooks/userHooks';
import moment from 'moment';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import JobCard from '../../components/user_dash/JobCard';
import Footer from '../../components/footer/Footer';
import NewNav from '../../components/header/NewNav'
import { useGetJobsQuery } from '../../hooks/jobHooks';
import CustomButton from '../../components/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loadingBox/Loading';
import { useDeleteJobMutation } from '../../hooks/adminHooks';
import { toast } from 'react-toastify';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';



const JobDetails: React.FC = () => {
  const [selected, setSelected] = useState("0");
  const { state, dispatch } = useContext(Store);
  const [isFetching, setFetching] = useState(false)
  const navigate = useNavigate()
  const [jobId,setJobId]=useState('')



  const { selectedJob, jobs, userInfo, hirerInfo } = state;
  useEffect(() => {
    
    if (!selectedJob) {
      if(userInfo)navigate('/jobs')
      else if(hirerInfo.token)navigate('/hirer/jobposts')
      
    }
  }, [])
  // const token = userInfo.token
  // const { data, isLoading, error } = useGetJobsQuery(token);
  // useEffect(() => {
  //   // Fetch jobs from your backend server
  //   setFetching(true)

  //   setTimeout(() => {
  //     if (data) dispatch({ type: 'STORE_JOBS', payload: data });
  //     setFetching(false)
  //   }, 2000);

  //   window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

  // }, [dispatch, jobs]);

  const job = selectedJob;

    const {mutateAsync:applyJob} = useApplyJobMutation()
  const handleApply = async (e:React.SyntheticEvent)=>{

  e.preventDefault()
  try {

    const token = userInfo.token
    if(selectedJob){
      setJobId(selectedJob._id)
      console.log(selectedJob,"kkkkkkkkkkkkkkkkkkkkk");
  
      const response = await applyJob({jobId,token})
    console.log(response.message);
    toast.success('applieded to the job successfully')
    navigate('/jobs')
    }
   
    
  } catch (err) {
    toast.error(getError(err as ApiError))
  }


  }


  const { mutateAsync: deletePost } = useDeleteJobMutation()

//   useEffect(()=>{
// navigate('/jobs')
//   },[handleApply])


  const handleDeletePost = useMemo(() => async () => {
    const jobId = job?._id;
    if (jobId) {
      const token = hirerInfo.token
      const res = await deletePost({ jobId, token })
      if (res.success) {
        alert(res?.message);
        navigate('/hirer/jobs')
      }
    }
  }, [deletePost, job]);
  
  return (
    <div className='main-container  container mx-auto'>
      <div className='w-full flex flex-col md:flex-row gap-10'>
        {/* LEFT SIDE */}




        <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
          <div className='w-full flex items-center justify-between'>
            <div className='w-3/4 flex gap-2'>
              <img
                src={job?.recruiterId.profileUrl}
                alt={job?.recruiterId.name}
                className='w-20 h-20 md:w-24 md:h-20 rounded'
              />

              <div className='flex flex-col'>
                <p className='text-xl font-semibold text-gray-600'>
                  {job?.jobTitle}
                </p>

                <span className='text-base'>{job?.location}</span>

                <span className='text-base text-blue-600'>
                  {job?.recruiterId.name}
                </span>

                <span className='text-gray-500 text-sm'>
                  {moment(job?.createdAt).fromNow()}
                </span>
              </div>
            </div>

            <div className=''>
              <AiOutlineSafetyCertificate className='text-3xl text-blue-500' />
            </div>
          </div>

          <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
            <div className='bg-[#bdf4c8] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Salary</span>
              <p className='text-lg font-semibold text-gray-700'>
                $ {job?.salary}
              </p>
            </div>

            <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Job Type</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.jobType}
              </p>
            </div>

            <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>No. of Applicants</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.applicants?.length}
              </p>
            </div>

            <div className='bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>No. of Vacancies</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.vaccancy}
              </p>
            </div>
          </div>

          <div className='w-full flex gap-4 py-5'>
            <CustomButton
              onClick={() => setSelected("0")}
              title='Job Description'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${selected === "0"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
                }`}
            />

            <CustomButton
              onClick={() => setSelected("1")}
              title='Company'
              containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${selected === "1"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
                }`}
            />
          </div>

          <div className='my-6'>
            {selected === "0" ? (
              <>
                <p className='text-xl font-semibold'>Job Decsription</p>

                <span className='text-base'>{job?.description}</span>

                {job?.requirements && (
                  <>
                    <p className='text-xl font-semibold mt-8'>Requirement</p>
                    <span className='text-base'>
                      {job?.requirements}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='mb-6 flex flex-col'>
                  <p className='text-xl text-blue-600 font-semibold'>
                    {job?.recruiterId.name}
                  </p>
                  <span className='text-base'>{job?.location}</span>
                  <span className='text-sm'>{job?.recruiterId.name}</span>
                </div>

                <p className='text-xl font-semibold'>About Company</p>
                <span>{job?.recruiterId.about}</span>
              </>
            )}
          </div>

          <div className='w-full '>

          {hirerInfo ? (
  <CustomButton
    title='Delete'
    onClick={handleDeletePost}
    containerStyles={`w-full flex items-center justify-center text-white bg-red-700 py-3 px-5 outline-none rounded-full text-base`}
  />
) : (
  job?.applicants.some(applicantId => applicantId === userInfo._id) ? (
    <CustomButton
      title='Applied'
      containerStyles={`w-full flex items-center justify-center text-white   bg-slate-600 py-3 px-5 outline-none rounded-full text-base`}
    />
  ) : (
    <CustomButton
      title='Apply Now'
      onClick={handleApply}
      containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
    />
  ))
}





          </div>
        </div>



        {userInfo && (
  isFetching ? (
    <Loading />
  ) : (
    <div className='w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0'>
      <p className='text-gray-500 font-semibold'>Similar Job Post</p>

      <div className='w-full flex flex-wrap gap-4'>
        {jobs?.slice(0, 6).map((job, index) => (
          <JobCard dispatch={dispatch} job={job} key={index} />
        ))}
      </div>
    </div>
  )
)}


      </div>
    </div>

  );
};

export default JobDetails;









