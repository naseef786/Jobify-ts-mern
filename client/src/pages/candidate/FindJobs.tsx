import React, { useState, ChangeEvent, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import Header from "../../components/header/Header";
import { experience, getError, jobTypes } from "../../utils";
import  CustomButton from "../../components/button/CustomButton";
import JobCard from "../../components/user_dash/JobCard";
import ListBox from "../../components/user_dash/ListBox";
import { Store } from "../../store/Store";
import { useGetJobsQuery, usegetJobsMutation } from "../../hooks/jobHooks";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import MessageBox from "../../components/messageBox/MessageBox";
import { ApiError } from "../../types/ApiError";
import { Job } from "../../types/Jobs";
import Loading from "../../components/loadingBox/Loading";
import { set } from "react-hook-form";


const FindJobs: React.FC = () => {
    const { state, dispatch } = useContext(Store)
    const { userInfo,hirerInfo ,jobs} = state
    const location = useLocation();
    const navigate = useNavigate();
    // const { data: jobs, isLoading, error } = useGetJobsQuery(token);
    function selectJob(job:Job){
      dispatch({ type: 'SELECT_JOBS', payload: job })
      navigate('/jobs/:id')
  }
  const [isLoading,setLoading] = useState(false)
  const [sort, setSort] = useState<string>("Newest");
  const [page, setPage] = useState<number>(1);
  const [numPage, setNumPage] = useState<number>(1);
  const [recordCount, setRecordCount] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);



  const [searchQuery, setSearchQuery] = useState<string>("");
  const [jobLocation, setJobLocation] = useState<string>("");
  const [filterJobTypes, setFilterJobTypes] = useState<string[]>([]);
  const [filterExp, setFilterExp] = useState<string[]>([]);
  const [expValue,setExpValue] = useState<string[]>([]);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { mutateAsync: fetchJobPosts } = usegetJobsMutation()
  const newUrl = {
    pageNum: page,
    query: searchQuery,
    cmploc: jobLocation,
    sort: sort,
    jtype:filterJobTypes,
    exp:filterExp,
  }




  const filterJobs = (val: string) => {
    if (filterJobTypes.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const fetchJobss = async () => {
    const token = userInfo?.token
    setLoading(true)
    const res = await fetchJobPosts({
      token,
      newUrl
    })
    console.log(res);
    console.log(res.data);
    
    if (res) {
      console.log(res);
      
      dispatch({ type: 'STORE_JOBS', payload: res.data });
      setLoading(false)
      console.log(res);
      
      setNumPage(res?.data.numOfPage);
      // setRecordsCount(res?.data.total)
      setPage(res?.data.page)
      setData(res?.data)
    }
  }

  const fetchJobPost = async () => {
    const token = hirerInfo?.token
    setLoading(true)
    const res = await fetchJobPosts({
      token,
      newUrl
    })
    console.log(res);
    if (res) {
      dispatch({ type: 'STORE_JOBS', payload: res.data });
      setLoading(false)
     
      setRecordCount(res.totalJobs)
      setNumPage(res?.numOfPage);
      // setRecordsCount(res?.data.total)
      setPage(res?.page)
      setData(res?.data)
    }
  }


  useEffect(() => {
    if(hirerInfo){
    setTimeout(async() => {
      setLoading(true)
      await fetchJobPost()
      setLoading(false)
      
    }, 1000);}
    else if(userInfo){
      setTimeout(async() => {
        setLoading(true)
        await fetchJobss()
        setLoading(false)
      }, 1000);}
    }
  , [page,sort,filterJobTypes,filterExp,searchQuery]);

  // useEffect(() => {
  //   if(userInfo){
  //   setTimeout(async() => {
  //     setLoading(true)
  //     await fetchJobss()
  //     setLoading(false)
  //   }, 1000);}
  // }, [page,sort,filterJobTypes,filterExp,searchQuery]);
  


  useEffect(() => {
    if (expValue.length > 0) {
      let newExpValue: number[] = [];

      expValue.forEach((el) => {
        const newE1 = el.split('-');

        newExpValue.push(Number(newE1[0]), Number(newE1[1]));
      });

      newExpValue.sort((a, b) => a - b);

      setFilterExp([
        `${newExpValue[0]}`,
        `${newExpValue[newExpValue.length - 1]}`,
      ]); // Updated to pass an array of strings
    }
  }, [expValue]);

  const Jobs=jobs?.filter(job => job?.recruiterId._id === hirerInfo?._id);

  const handleSearchSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const token = userInfo?.token
    try {
     let res =  await fetchJobPosts({token,newUrl})
     dispatch({ type: 'STORE_JOBS', payload: res.data });
     setNumPage(res?.data.numOfPage);
    //  setRecordsCount(res?.data.total)
     setPage(res?.data.page)
    } catch (error) {
      console.log(error);
      
    }}



  if (isLoading) {
    return <Loading />;
  }

  // if (error) {
  //   return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
  // }

  const filterExperience = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFilterExp((prev) =>
      checked ? [...prev, value] : prev.filter((exp) => exp !== value)
    );
    console.log(filterExp);
    
  };

  const handleShowMore  = async (e:React.SyntheticEvent)=>{
e.preventDefault()
setPage((prev)=>prev+1)
  }



  return (

    <div>
      <Header
        title="Find Your Dream Job with Ease"
        type="home"
        handleClick={(e) =>  handleSearchSubmit(e)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className="container mx-auto items-center flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]">
        <div className="hidden md:flex flex-col w-1/6 h-fit bg-white shadow-sm  float-left" style={{alignItems:"center"}}>
          <p className="text-lg font-semibold text-slate-600">Filter Search...</p>

          <div className="py-2">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BiBriefcaseAlt2 />
                Job Type
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {jobTypes.map((jtype, index) => (
                <div key={index} className="flex gap-2 text-sm md:text-base ">
                  <input
                    type="checkbox"
                    value={jtype}
                    checked={filterJobTypes.includes(jtype)}
                    className="w-4 h-4"
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="py-2 mt-4">
            <div className="flex justify-between mb-3">
              <p className="flex items-center gap-2 font-semibold">
                <BsStars />
                Experience
              </p>

              <button>
                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {experience.map((exp) => (
                <div key={exp.title} className="flex gap-3">
                  <input
                    type="checkbox"
                    value={exp.value}
                    checked={filterExp.includes(exp.value)}
                    className="w-4 h-4"
                    onChange={filterExperience}
                  />
                  <span>{exp.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full md:w-5/6 px-5 md:px-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm md:text-base">
              Showing: <span className="font-semibold">{recordCount}</span> Jobs Available
            </p>

            <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center border-neutral-50">
              <p className="text-sm md:text-base flex">Sort By:</p>

              <ListBox sort={sort} setSort={setSort} />
            </div>
          </div>

          {userInfo ? (jobs && jobs.length > 0 ? (
  <div className="w-full flex flex-wrap gap-4">
    {jobs.map((job, index) => (
      <JobCard job={job} dispatch={dispatch} key={index} />
    ))}
  </div>
) : (
  <MessageBox variant="info">No jobs found.</MessageBox>
)) : (
  Jobs && Jobs.length > 0 ? (
    <div className="w-full flex flex-wrap gap-4">
      {Jobs.map((job, index) => (
        <JobCard job={job} dispatch={dispatch} key={index} />
      ))}
    </div>
  ) : (
    <MessageBox variant="info">No jobs found.</MessageBox>
  ))
}
 
          

          {numPage > page && !isFetching && (
            <div className="w-full flex items-center justify-center pt-16">
              <CustomButton
                title="Load More"
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                onClick={handleShowMore}
              />
            </div>
          )}
        </div>
   
   
    </div>
    </div>
  );
};

export default FindJobs;




